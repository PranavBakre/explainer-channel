import React from 'react';
import {AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {clamp, Tag} from '../three/kit';

// Licensed stock footage as a full shot, muted, with a slow push and optional on-object tags.
export const FootageShot: React.FC<{
  file: string;
  startFrom?: number;
  rate?: number;
  tags?: {x: number; y: number; text: string; at?: number; color?: string}[];
  duration: number;
}> = ({file, startFrom = 0, rate = 1, tags = [], duration}) => {
  const frame = useCurrentFrame();
  const t = frame / Math.max(1, duration);
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <OffthreadVideo
        src={staticFile(`assets/footage/${file}`)}
        startFrom={startFrom}
        playbackRate={rate}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.02 + 0.05 * t})`}}
      />
      {tags.map((tg, i) => (
        <Tag key={i} x={tg.x} y={tg.y} text={tg.text} color={tg.color} opacity={interpolate(t, [tg.at ?? 0.3, (tg.at ?? 0.3) + 0.08], [0, 1], clamp)} />
      ))}
    </AbsoluteFill>
  );
};
