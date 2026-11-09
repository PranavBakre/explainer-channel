import React, {useMemo} from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
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

const HandText: React.FC<{
  item: Extract<Item, {t: 'text'}>;
  font: Font;
  fps: number;
  frame: number;
  idx: number;
  ink: string;
  weight: number;
}> = ({item, font, fps, frame, idx, ink, weight}) => {
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
          <Strokes key={i} strokes={g.strokes} progress={Math.min(1, local)} color={item.color ?? ink} width={(weight + size * 0.03) / s} transform={`translate(${g.x} ${g.dy}) rotate(${g.rot})`} />
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
    const len = Math.hypot(x - px, y - py);
    const [nx, ny] = [-(y - py) / len, (x - px) / len];
    // A hand bows a long stroke slightly and drifts a little off the line.
    const bow = (random(`${seed}-b${i}`) - 0.5) * len * 0.018;
    const n = Math.max(2, Math.round(len / 25));
    for (let j = 1; j <= n; j++) {
      const f = j / n;
      const off = j === n ? 0 : Math.sin(Math.PI * f) * bow + (random(`${seed}-${i}-${j}`) - 0.5) * 1.2;
      out.push(`L ${px + (x - px) * f + nx * off} ${py + (y - py) * f + ny * off}`);
    }
  });
  return out.join(' ');
};

const drawProgress = (frame: number, fps: number, at: number, dur = 0.6) =>
  interpolate(frame, [at * fps, (at + dur) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// Items written by hand at their `at` second, in the coordinate space of the parent <svg>.
export const HandItems: React.FC<{items: Item[]; font?: string; seed?: string; ink: string; weight: number; maxRight: number}> = ({
  items,
  font = 'readability',
  seed = 'hand',
  ink,
  weight,
  maxRight,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const F = FONTS[font] ?? FONTS.readability;
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
      if (left + w > maxRight) {
        size *= (maxRight - left) / w;
        w = maxRight - left;
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
  }, [items, F, maxRight]);
  return (
    <g>
      {placed.map((it, i) => {
        const color = 'color' in it && it.color ? it.color : ink;
        if (it.t === 'text') return <HandText key={i} item={it} font={F} fps={fps} frame={frame} idx={i} ink={ink} weight={weight} />;
        if (it.t === 'line') {
          const d = wobble(it.pts, `${seed}-l${i}`);
          return <Strokes key={i} strokes={[{d, len: 1}]} progress={drawProgress(frame, fps, it.at, it.dur)} color={color} width={it.width ?? weight} />;
        }
        if (it.t === 'circle') {
          const n = 40;
          const a0 = random(`${seed}-c${i}`) * Math.PI * 2;
          const pts: [number, number][] = Array.from({length: n + 4}, (_, k) => {
            const a = a0 + (k / n) * Math.PI * 2;
            const r = 1 + (random(`${seed}-c${i}-${k}`) - 0.5) * 0.05 + (k / n) * 0.06;
            return [(it.cx ?? 0) + Math.cos(a) * (it.rx ?? 0) * r, (it.cy ?? 0) + Math.sin(a) * (it.ry ?? 0) * r];
          });
          return <Strokes key={i} strokes={[{d: wobble(pts, `${seed}-cw${i}`), len: 1}]} progress={drawProgress(frame, fps, it.at, it.dur ?? 0.7)} color={color} width={weight} />;
        }
        if (it.t === 'arrow') {
          const [x1, y1] = it.from;
          const [x2, y2] = it.to;
          const bend = it.bend ?? 0;
          const mx = (x1 + x2) / 2 - (y2 - y1) * bend;
          const my = (y1 + y2) / 2 + (x2 - x1) * bend;
          const ang = Math.atan2(y2 - my, x2 - mx);
          const h = 22;
          const head = `M ${x2 - Math.cos(ang - 0.45) * h} ${y2 - Math.sin(ang - 0.45) * h} L ${x2} ${y2} L ${x2 - Math.cos(ang + 0.45) * h} ${y2 - Math.sin(ang + 0.45) * h}`;
          const p = drawProgress(frame, fps, it.at, it.dur ?? 0.6);
          return (
            <g key={i}>
              <Strokes strokes={[{d: `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`, len: 1}]} progress={Math.min(1, p / 0.8)} color={color} width={weight} />
              <Strokes
                strokes={[{d: head, len: 1}]}
                progress={interpolate(p, [0.8, 1], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                color={color}
                width={weight}
              />
            </g>
          );
        }
        return null;
      })}
    </g>
  );
};
