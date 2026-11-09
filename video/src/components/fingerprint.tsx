import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, enter, fonts, rise} from '../theme';
import {Label, ShotProps, Stage, stepAt} from './base';

export const hexBits = (hex: string) =>
  hex
    .toLowerCase()
    .split('')
    .flatMap((c) => parseInt(c, 16).toString(2).padStart(4, '0').split('').map(Number));

// A hash drawn as its real bits: one cell per bit, lit when 1. `reveal` 0→1 sweeps cells in reading order.
export const Fingerprint: React.FC<{
  hex: string;
  cols?: number;
  cell?: number;
  on?: string;
  reveal?: number;
  mark?: boolean[];
  markColor?: string;
  markAmount?: number;
}> = ({hex, cols = 16, cell = 24, on = colors.cream, reveal = 1, mark, markColor = colors.red, markAmount = 0}) => {
  const bits = hexBits(hex);
  const gap = Math.max(2, Math.round(cell * 0.14));
  const rows = Math.ceil(bits.length / cols);
  const shown = Math.floor(reveal * bits.length);
  return (
    <svg width={cols * (cell + gap)} height={rows * (cell + gap)}>
      {bits.map((b, i) => {
        if (i >= shown) return null;
        const x = (i % cols) * (cell + gap);
        const y = Math.floor(i / cols) * (cell + gap);
        const marked = mark?.[i] && markAmount > 0;
        const fill = marked ? markColor : b ? on : colors.line;
        const opacity = marked ? 0.35 + 0.65 * markAmount : b ? 0.92 : 0.55;
        return <rect key={i} x={x} y={y} width={cell} height={cell} rx={cell * 0.18} fill={fill} opacity={opacity} />;
      })}
    </svg>
  );
};

const Input: React.FC<{text: string; diffAt?: number}> = ({text, diffAt}) => (
  <div style={{fontFamily: fonts.mono, fontSize: 60, color: colors.amber, letterSpacing: 2}}>
    {text.split('').map((c, i) => (
      <span key={i} style={i === diffAt ? {color: colors.ink, background: colors.amber, borderRadius: 8, padding: '0 6px'} : undefined}>
        {c}
      </span>
    ))}
  </div>
);

// S07: two near-identical inputs → two unrelated grids → their XOR, counted.
export const Avalanche: React.FC<ShotProps<{a: string; b: string; hexA: string; hexB: string; diffAt: number; caption?: string}>> = ({
  a,
  b,
  hexA,
  hexB,
  diffAt,
  caption,
  steps,
}) => {
  const frame = useCurrentFrame();
  const s0 = stepAt(steps, 0);
  const s1 = stepAt(steps, 1);
  const s2 = stepAt(steps, 2);
  const s3 = stepAt(steps, 3);
  const A = hexBits(hexA);
  const B = hexBits(hexB);
  const diff = A.map((x, i) => x !== B[i]);
  const total = diff.filter(Boolean).length;
  const sweep = (start: number) => interpolate(frame - start, [0, 45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const markIn = interpolate(frame - s1, [10, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const markAmount = markIn * (1 - interpolate(frame - s2, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const xorIn = enter(frame, s2, 20);
  const counted = Math.round(interpolate(frame - s2, [10, 70], [0, total], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const cell = 22;
  const col = (label: React.ReactNode, grid: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, ...style}}>
      <div style={{height: 80, display: 'flex', alignItems: 'center'}}>{label}</div>
      {grid}
    </div>
  );
  return (
    <Stage>
      <div style={{display: 'flex', gap: 90, alignItems: 'flex-start'}}>
        {col(<div style={rise(frame, s0)}><Input text={a} diffAt={diffAt} /></div>, <Fingerprint hex={hexA} cell={cell} reveal={sweep(s0 + 8)} mark={diff} markAmount={markAmount} />)}
        {col(
          <div style={{opacity: xorIn, textAlign: 'center'}}>
            <div style={{fontFamily: fonts.serif, fontSize: 96, color: colors.red, lineHeight: 1}}>{counted}</div>
            <Label>of 256 bits differ</Label>
          </div>,
          <div style={{opacity: xorIn, transform: `scale(${0.9 + 0.1 * xorIn})`}}>
            <Fingerprint hex={diff.map((d) => (d ? '1' : '0')).join('').match(/.{4}/g)!.map((n) => parseInt(n, 2).toString(16)).join('')} cell={cell} on={colors.red} reveal={1} />
          </div>,
        )}
        {col(<div style={rise(frame, s0 + 12)}><Input text={b} diffAt={diffAt} /></div>, <Fingerprint hex={hexB} cell={cell} reveal={sweep(s0 + 20)} mark={diff} markAmount={markAmount} />)}
      </div>
      {caption ? (
        <div style={{...rise(frame, s3), fontFamily: fonts.serif, fontSize: 56, marginTop: 56, color: colors.cream}}>{caption}</div>
      ) : null}
    </Stage>
  );
};
