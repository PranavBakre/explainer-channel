import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../theme';

export type ShotProps<P> = P & {steps: number[]};

export const stepAt = (steps: number[], k: number) => steps[k] ?? Number.POSITIVE_INFINITY;

export const currentStep = (steps: number[], frame: number) => {
  let s = 0;
  steps.forEach((f, i) => {
    if (frame >= f) s = i;
  });
  return s;
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const seed = Math.floor(frame / 2);
  return (
    <AbsoluteFill style={{backgroundColor: colors.ink}}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.line} 1.4px, transparent 1.6px)`,
          backgroundSize: '40px 40px',
          opacity: 0.55,
        }}
      />
      <AbsoluteFill
        style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)'}}
      />
      <svg width={width} height={height} style={{position: 'absolute', opacity: 0.07, mixBlendMode: 'screen'}}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(random(seed) * 1000)} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Stage: React.FC<{children: React.ReactNode; align?: 'center' | 'top'}> = ({children, align = 'center'}) => (
  <AbsoluteFill
    style={{
      padding: '96px 160px 170px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      alignItems: 'center',
      fontFamily: fonts.sans,
      color: colors.cream,
    }}
  >
    {children}
  </AbsoluteFill>
);

const HEX = '0123456789abcdef';

export const Scramble: React.FC<{text: string; start: number; color?: string; size?: number; perChar?: number}> = ({
  text,
  start,
  color = colors.cream,
  size = 34,
  perChar = 0.6,
}) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  if (t < 0) return <span style={{fontFamily: fonts.mono, fontSize: size, opacity: 0}}>{text}</span>;
  const out = text
    .split('')
    .map((ch, i) => {
      if (t >= 12 + i * perChar) return ch;
      return HEX[Math.floor(random(`${i}-${frame}`) * 16)];
    })
    .join('');
  return <span style={{fontFamily: fonts.mono, fontSize: size, color, letterSpacing: 0.5, wordBreak: 'break-all'}}>{out}</span>;
};

export const Label: React.FC<{children: React.ReactNode; color?: string; style?: React.CSSProperties}> = ({
  children,
  color = colors.slate,
  style,
}) => (
  <div
    style={{
      fontFamily: fonts.sans,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color,
      ...style,
    }}
  >
    {children}
  </div>
);
