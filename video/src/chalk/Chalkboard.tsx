import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import allure from './fonts/ems_allure.json';
import felix from './fonts/ems_felix.json';
import readability from './fonts/ems_readability.json';
import nixish from './fonts/ems_nixish.json';

type Font = {
  unitsPerEm: number;
  capHeight: number;
  glyphs: Record<string, {d: string; w: number}>;
};
const FONTS: Record<string, Font> = {
  allure,
  felix,
  readability,
  nixish,
} as Record<string, Font>;

// Glyphs the Hershey sets lack, drawn in the same 1000-unit, y-up space.
const EXTRA: Record<string, {d: string; w: number}> = {
  '×': {d: 'M 80 120 L 380 420 M 380 120 L 80 420', w: 460},
  '÷': {
    d: 'M 60 270 L 400 270 M 225 430 L 230 420 M 225 110 L 230 100',
    w: 460,
  },
  '≈': {
    d: 'M 60 320 Q 140 380 230 320 T 400 320 M 60 200 Q 140 260 230 200 T 400 200',
    w: 460,
  },
  '→': {d: 'M 40 270 L 520 270 M 420 350 L 520 270 L 420 190', w: 580},
  '·': {d: 'M 120 270 L 128 262', w: 250},
};

export const CHALK = '#ECEAE2';
export const CHALK_YELLOW = '#F3D35B';
export const CHALK_RED = '#EF7A6B';
export const CHALK_BLUE = '#8FC7E8';

type Stroke = {d: string; len: number};

const subpaths = (d: string): Stroke[] =>
  d
    .split(/(?=M)/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const nums = (s.match(/-?\d*\.?\d+/g) ?? []).map(Number);
      let len = 0;
      for (let i = 2; i + 1 < nums.length; i += 2) len += Math.hypot(nums[i] - nums[i - 2], nums[i + 1] - nums[i - 1]);
      return {d: s, len: Math.max(len, 20)};
    });

// Draws strokes in order, each revealed along its length, at a constant chalk speed.
const Strokes: React.FC<{
  strokes: Stroke[];
  progress: number;
  color: string;
  width: number;
  transform?: string;
}> = ({strokes, progress, color, width, transform}) => {
  const total = strokes.reduce((a, s) => a + s.len, 0);
  let acc = 0;
  return (
    <g transform={transform}>
      {strokes.map((s, i) => {
        const start = acc / total;
        acc += s.len;
        const end = acc / total;
        const p = interpolate(progress, [start, end], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        if (p <= 0) return null;
        return <path key={i} d={s.d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      })}
    </g>
  );
};

export type Item =
  | {
      t: 'text';
      text: string;
      x?: number;
      y?: number;
      dy?: number;
      gap?: number;
      size?: number;
      at: number;
      cps?: number;
      color?: string;
      align?: 'left' | 'center' | 'right';
      tilt?: number;
    }
  | {
      t: 'line';
      pts: [number, number][];
      at: number;
      dur?: number;
      color?: string;
      width?: number;
    }
  | {
      t: 'circle';
      around?: number;
      cx?: number;
      cy?: number;
      rx?: number;
      ry?: number;
      at: number;
      dur?: number;
      color?: string;
    }
  | {
      t: 'arrow';
      from: [number, number];
      to: [number, number];
      at: number;
      dur?: number;
      color?: string;
      bend?: number;
    }
  | {
      t: 'erase';
      x: number;
      y: number;
      w: number;
      h: number;
      at: number;
      dur?: number;
    };

const textStrokes = (font: Font, text: string, seed: string) => {
  let x = 0;
  const out: {strokes: Stroke[]; x: number; dy: number; rot: number}[] = [];
  [...text].forEach((ch, i) => {
    const g = EXTRA[ch] ?? font.glyphs[ch] ?? font.glyphs['?'];
    // Hand wobble: each letter sits a little off the baseline and off-angle.
    out.push({
      strokes: subpaths(g.d),
      x,
      dy: (random(`${seed}-y-${i}`) - 0.5) * 34,
      rot: (random(`${seed}-r-${i}`) - 0.5) * 4,
    });
    x += g.w;
  });
  return {glyphs: out, width: x};
};

const ChalkText: React.FC<{
  item: Extract<Item, {t: 'text'}>;
  font: Font;
  fps: number;
  frame: number;
  idx: number;
}> = ({item, font, fps, frame, idx}) => {
  const {glyphs, width} = useMemo(() => textStrokes(font, item.text, `${idx}-${item.text}`), [font, item.text, idx]);
  const size = item.size ?? 64;
  const s = size / font.capHeight;
  const chars = glyphs.filter((g) => g.strokes.length).length;
  const dur = (chars / (item.cps ?? 9)) * fps;
  const p = interpolate(frame, [item.at * fps, item.at * fps + dur], [0, chars], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ox = item.align === 'center' ? -width / 2 : item.align === 'right' ? -width : 0;
  let k = 0;
  return (
    <g transform={`translate(${item.x ?? 0} ${item.y ?? 0}) rotate(${item.tilt ?? 0}) scale(${s} ${-s}) translate(${ox} 0)`}>
      {glyphs.map((g, i) => {
        if (!g.strokes.length) return null;
        const local = p - k++;
        if (local <= 0) return null;
        return (
          <Strokes key={i} strokes={g.strokes} progress={Math.min(1, local)} color={item.color ?? CHALK} width={(3 + size * 0.075) / s} transform={`translate(${g.x} ${g.dy}) rotate(${g.rot})`} />
        );
      })}
    </g>
  );
};

const wobble = (pts: [number, number][], seed: string): string => {
  const out: string[] = [];
  pts.forEach(([x, y], i) => {
    if (i === 0) return out.push(`M ${x} ${y}`);
    const [px, py] = pts[i - 1];
    const n = Math.max(2, Math.round(Math.hypot(x - px, y - py) / 40));
    for (let j = 1; j <= n; j++) {
      const f = j / n;
      const jit = j === n ? 0 : (random(`${seed}-${i}-${j}`) - 0.5) * 3;
      out.push(`L ${px + (x - px) * f + jit} ${py + (y - py) * f + jit}`);
    }
  });
  return out.join(' ');
};

const drawProgress = (frame: number, fps: number, at: number, dur = 0.6) =>
  interpolate(frame, [at * fps, (at + dur) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Smudges: React.FC<{seed: string}> = ({seed}) => (
  <g filter="url(#smudge)" opacity={0.5}>
    {Array.from({length: 9}, (_, i) => {
      const x = random(`${seed}x${i}`) * 1920;
      const y = 120 + random(`${seed}y${i}`) * 820;
      const w = 260 + random(`${seed}w${i}`) * 520;
      return (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={w / 2}
          ry={40 + random(`${seed}h${i}`) * 70}
          transform={`rotate(${(random(`${seed}r${i}`) - 0.5) * 24} ${x} ${y})`}
          fill="#D9DDD6"
          opacity={0.035 + random(`${seed}o${i}`) * 0.04}
        />
      );
    })}
  </g>
);

// A slate chalkboard in a wooden frame; `items` are drawn at their `at` second, in chalk.
export const Chalkboard: React.FC<{
  items: Item[];
  font?: string;
  seed?: string;
}> = ({items, font = 'allure', seed = 'board'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const F = FONTS[font] ?? FONTS.allure;
  const placed = useMemo(() => {
    let prev: {y: number; right: number} | null = null;
    const boxes: Record<number, {left: number; w: number; y: number; size: number}> = {};
    const texts = items.map((it, i): Item => {
      if (it.t !== 'text') return it;
      let size = it.size ?? 64;
      let w = (textStrokes(F, it.text, '').width * size) / F.capHeight;
      const x = it.x ?? (prev ? prev.right + (it.gap ?? 0.3) * size : 0);
      const base = it.y ?? prev?.y ?? 0;
      let left = it.align === 'center' ? x - w / 2 : it.align === 'right' ? x - w : x;
      if (left + w > 1820) {
        size *= (1820 - left) / w;
        w = 1820 - left;
      }
      left = it.align === 'center' ? x - w / 2 : it.align === 'right' ? x - w : x;
      prev = {y: base, right: left + w};
      boxes[i] = {left, w, y: base + (it.dy ?? 0), size};
      return {...it, x, y: base + (it.dy ?? 0), size};
    });
    return texts.map((it): Item => {
      if (it.t !== 'circle' || it.around === undefined) return it;
      const b = boxes[it.around];
      return {...it, cx: b.left + b.w / 2, cy: b.y - b.size * 0.45, rx: b.w / 2 + b.size * 0.45, ry: b.size * 0.85};
    });
  }, [items, F]);
  return (
    <AbsoluteFill style={{background: '#5A3B22'}}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        <defs>
          <filter id="chalk" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.45" result="holes" />
            <feComposite in="SourceGraphic" in2="holes" operator="in" result="grain" />
            <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="2" seed="7" result="w" />
            <feDisplacementMap in="grain" in2="w" scale="2.2" result="line" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.22 0" result="dust" />
            <feMerge>
              <feMergeNode in="dust" />
              <feMergeNode in="line" />
            </feMerge>
          </filter>
          <filter id="chalk-dust" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <filter id="smudge" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="38" />
          </filter>
          <filter id="slate">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="11" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.9  0 0 0 0 0.86  0 0 0 0.09 0" />
          </filter>
          <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7A5233" />
            <stop offset="0.5" stopColor="#5E3D24" />
            <stop offset="1" stopColor="#3E2715" />
          </linearGradient>
          <radialGradient id="light" cx="0.45" cy="0.35" r="0.8">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.07" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.35" />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1920} height={1080} fill="url(#wood)" />
        <rect x={34} y={30} width={1852} height={986} fill="#22302B" />
        <rect x={34} y={30} width={1852} height={986} filter="url(#slate)" />
        <Smudges seed={seed} />
        <g filter="url(#chalk)">
          {placed.map((it, i) => {
            const color = 'color' in it && it.color ? it.color : CHALK;
            if (it.t === 'text') return <ChalkText key={i} item={it} font={F} fps={fps} frame={frame} idx={i} />;
            if (it.t === 'line') {
              const d = wobble(it.pts, `${seed}-l${i}`);
              return <Strokes key={i} strokes={[{d, len: 1}]} progress={drawProgress(frame, fps, it.at, it.dur)} color={color} width={it.width ?? 6} />;
            }
            if (it.t === 'circle') {
              const n = 40;
              const a0 = random(`${seed}-c${i}`) * Math.PI * 2;
              const pts: [number, number][] = Array.from({length: n + 4}, (_, k) => {
                const a = a0 + (k / n) * Math.PI * 2;
                const r = 1 + (random(`${seed}-c${i}-${k}`) - 0.5) * 0.05 + (k / n) * 0.06;
                return [(it.cx ?? 0) + Math.cos(a) * (it.rx ?? 0) * r, (it.cy ?? 0) + Math.sin(a) * (it.ry ?? 0) * r];
              });
              return <Strokes key={i} strokes={[{d: wobble(pts, `${seed}-cw${i}`), len: 1}]} progress={drawProgress(frame, fps, it.at, it.dur ?? 0.7)} color={color} width={6} />;
            }
            if (it.t === 'arrow') {
              const [x1, y1] = it.from;
              const [x2, y2] = it.to;
              const bend = it.bend ?? 0;
              const mx = (x1 + x2) / 2 - (y2 - y1) * bend;
              const my = (y1 + y2) / 2 + (x2 - x1) * bend;
              const ang = Math.atan2(y2 - my, x2 - mx);
              const h = 26;
              const head = `M ${x2 - Math.cos(ang - 0.45) * h} ${y2 - Math.sin(ang - 0.45) * h} L ${x2} ${y2} L ${x2 - Math.cos(ang + 0.45) * h} ${y2 - Math.sin(ang + 0.45) * h}`;
              const p = drawProgress(frame, fps, it.at, it.dur ?? 0.6);
              return (
                <g key={i}>
                  <Strokes strokes={[{d: `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`, len: 1}]} progress={Math.min(1, p / 0.8)} color={color} width={6} />
                  <Strokes
                    strokes={[{d: head, len: 1}]}
                    progress={interpolate(p, [0.8, 1], [0, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    })}
                    color={color}
                    width={6}
                  />
                </g>
              );
            }
            return null;
          })}
        </g>
        {items.map((it, i) => {
          if (it.t !== 'erase') return null;
          const p = drawProgress(frame, fps, it.at, it.dur ?? 0.8);
          if (p <= 0) return null;
          return (
            <g key={`e${i}`}>
              <rect x={it.x} y={it.y} width={it.w * p} height={it.h} fill="#22302B" />
              <rect x={it.x} y={it.y} width={it.w * p} height={it.h} filter="url(#slate)" />
              <rect x={it.x} y={it.y} width={it.w * p} height={it.h} fill="#D9DDD6" opacity={0.06} filter="url(#chalk-dust)" />
            </g>
          );
        })}
        <rect x={34} y={30} width={1852} height={986} fill="url(#light)" />
        <rect x={0} y={1016} width={1920} height={64} fill="url(#wood)" />
        <rect x={20} y={1010} width={1880} height={14} fill="#7E5838" />
        <rect x={1420} y={996} width={110} height={16} rx={7} fill="#EDEBE4" opacity={0.92} />
        <rect x={1560} y={1000} width={60} height={14} rx={6} fill={CHALK_YELLOW} opacity={0.9} />
        <ellipse cx={1500} cy={1012} rx={140} ry={5} fill="#E8E6DF" opacity={0.25} filter="url(#chalk-dust)" />
      </svg>
    </AbsoluteFill>
  );
};
