import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, enter} from './theme';
import {Transition} from './types';

export const TRANSITION_FRAMES = 18;

export const SceneTransition: React.FC<{type: Transition; children: React.ReactNode}> = ({type, children}) => {
  const frame = useCurrentFrame();
  const p = enter(frame, 0, TRANSITION_FRAMES);
  if (type === 'cut') return <AbsoluteFill>{children}</AbsoluteFill>;
  if (type === 'fade') return <AbsoluteFill style={{opacity: p}}>{children}</AbsoluteFill>;
  if (type === 'push') return <AbsoluteFill style={{opacity: p, transform: `translateX(${(1 - p) * 120}px)`}}>{children}</AbsoluteFill>;
  if (type === 'zoom') return <AbsoluteFill style={{opacity: p, transform: `scale(${1.14 - 0.14 * p})`}}>{children}</AbsoluteFill>;
  const x = interpolate(frame, [0, TRANSITION_FRAMES + 6], [0, 100], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{clipPath: `inset(0 ${100 - x}% 0 0)`}}>{children}</AbsoluteFill>
      {x < 100 ? <div style={{position: 'absolute', top: 0, bottom: 0, left: `${x}%`, width: 6, background: colors.amber, boxShadow: `0 0 30px ${colors.amber}`}} /> : null}
    </AbsoluteFill>
  );
};
