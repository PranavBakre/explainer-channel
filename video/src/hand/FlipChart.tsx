import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {HandItems, Item} from './Handwriting';

type P = [number, number];

// CSS matrix3d that maps the unit-page rectangle (0,0)-(w,h) onto a quad in the frame.
const homography = (w: number, h: number, [p0, p1, p2, p3]: [P, P, P, P]) => {
  const [x0, y0] = p0;
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = p3;
  const dx1 = x1 - x3;
  const dx2 = x2 - x3;
  const dy1 = y1 - y3;
  const dy2 = y2 - y3;
  const sx = x0 - x1 + x3 - x2;
  const sy = y0 - y1 + y3 - y2;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / den;
  const hh = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1;
  const b = x2 - x0 + hh * x2;
  const d = y1 - y0 + g * y1;
  const e = y2 - y0 + hh * y2;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, x0, y0, 0, 1];
  return `matrix3d(${m.join(',')})`;
};

export const MARKER = '#1F2633';
export const MARKER_RED = '#B8322A';
export const MARKER_BLUE = '#2A55A0';

const PAGE_W = 1000;
const PAGE_H = 1000;
// Paper corners in the plate (top-left, top-right, bottom-left, bottom-right), measured on the 1920×1080 image.
const QUAD: [P, P, P, P] = [
  [884, 128],
  [1822, 114],
  [772, 1080],
  [1800, 1080],
];

// A flip chart in a real room: marker strokes drawn onto the photographed page, with a handheld camera.
export const FlipChart: React.FC<{items: Item[]; duration: number; seed?: string}> = ({items, duration, seed = 'flip'}) => {
  const frame = useCurrentFrame();
  const t = frame / Math.max(1, duration);
  const sway = (k: string, f: number, amp: number) => Math.sin(frame / f + random(k) * 6) * amp;
  const scale = interpolate(t, [0, 1], [1.02, 1.07]);
  const tx = sway(`${seed}x`, 47, 4) + sway(`${seed}x2`, 13, 0.8);
  const ty = sway(`${seed}y`, 59, 3) + sway(`${seed}y2`, 17, 0.7);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translate(${tx}px, ${ty}px) scale(${scale})`, transformOrigin: '62% 45%'}}>
        <Img src={staticFile('assets/plates/flipchart-room.png')} style={{width: 1920, height: 1080}} />
        <svg
          width={PAGE_W}
          height={PAGE_H}
          viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
          style={{position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: homography(PAGE_W, PAGE_H, QUAD), mixBlendMode: 'multiply', overflow: 'visible'}}
        >
          <defs>
            <filter id="marker" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur stdDeviation="0.45" result="soft" />
              <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="5" result="n" />
              <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.5 1.12" result="ink" />
              <feComposite in="soft" in2="ink" operator="in" />
            </filter>
          </defs>
          <g filter="url(#marker)" opacity={0.93}>
            <HandItems items={items} ink={MARKER} weight={4.2} maxRight={960} seed={seed} />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 55% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.28) 100%)'}} />
    </AbsoluteFill>
  );
};
