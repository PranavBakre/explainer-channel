import React, {useMemo} from 'react';
import rough from 'roughjs';
import type {Options} from 'roughjs/bin/core';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

const gen = rough.generator();

type Shape =
  | {kind: 'rect'; x: number; y: number; w: number; h: number}
  | {kind: 'ellipse'; x: number; y: number; w: number; h: number}
  | {kind: 'line'; x1: number; y1: number; x2: number; y2: number}
  | {kind: 'arrow'; x1: number; y1: number; x2: number; y2: number}
  | {kind: 'path'; d: string};

const drawable = (s: Shape, o: Options) => {
  switch (s.kind) {
    case 'rect':
      return [gen.rectangle(s.x, s.y, s.w, s.h, o)];
    case 'ellipse':
      return [gen.ellipse(s.x, s.y, s.w, s.h, o)];
    case 'line':
      return [gen.line(s.x1, s.y1, s.x2, s.y2, o)];
    case 'path':
      return [gen.path(s.d, o)];
    case 'arrow': {
      const a = Math.atan2(s.y2 - s.y1, s.x2 - s.x1);
      const head = 26;
      const p = (da: number) => [s.x2 - head * Math.cos(a + da), s.y2 - head * Math.sin(a + da)] as const;
      const [lx, ly] = p(0.45);
      const [rx, ry] = p(-0.45);
      return [gen.line(s.x1, s.y1, s.x2, s.y2, o), gen.linearPath([[lx, ly], [s.x2, s.y2], [rx, ry]], o)];
    }
  }
};

// Hand-drawn stroke that draws itself from `start` over `dur` frames; seed keeps the wobble stable across frames.
export const Drawn: React.FC<{
  shape: Shape;
  start: number;
  dur?: number;
  color?: string;
  width?: number;
  seed?: number;
  roughness?: number;
}> = ({shape, start, dur = 18, color = colors.cream, width = 3, seed = 7, roughness = 1.4}) => {
  const frame = useCurrentFrame();
  const paths = useMemo(
    () => drawable(shape, {seed, roughness, stroke: color, strokeWidth: width, bowing: 1.2}).flatMap((d) => gen.toPaths(d)),
    [shape, seed, roughness, color, width],
  );
  const p = interpolate(frame - start, [0, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (p <= 0) return null;
  return (
    <svg style={{position: 'absolute', inset: 0, overflow: 'visible'}} width={1920} height={1080}>
      {paths.map((pi, i) => (
        <path
          key={i}
          d={pi.d}
          stroke={pi.stroke}
          strokeWidth={pi.strokeWidth}
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - p}
        />
      ))}
    </svg>
  );
};
