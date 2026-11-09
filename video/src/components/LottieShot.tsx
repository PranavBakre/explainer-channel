import React, {useEffect, useState} from 'react';
import {Lottie, LottieAnimationData} from '@remotion/lottie';
import {AbsoluteFill, cancelRender, continueRender, delayRender, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Tag} from '../three/kit';

// A LottieFiles animation as a full shot: one animation, large, on a soft studio backdrop, with on-object tags.
export const LottieShot: React.FC<{
  file: string;
  bg?: string;
  scale?: number;
  x?: number;
  y?: number;
  speed?: number;
  tags?: {x: number; y: number; text: string; at?: number; color?: string}[];
  duration: number;
}> = ({file, bg = '#E9E2D4', scale = 0.8, x = 0, y = 0, speed = 1, tags = [], duration}) => {
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender(`lottie ${file}`));
  const [data, setData] = useState<LottieAnimationData | null>(null);
  useEffect(() => {
    fetch(staticFile(`assets/lottie/${file}.json`))
      .then((r) => r.json())
      .then((j) => {
        setData(j);
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [file, handle]);
  const t = frame / Math.max(1, duration);
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 42%, ${bg} 0%, ${bg} 45%, #C9C0AE 100%)`}}>
      {data ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 1080 * scale, height: 1080 * scale, transform: `translate(${x}px, ${y}px)`}}>
            <Lottie animationData={data} playbackRate={speed} loop style={{width: '100%', height: '100%'}} />
          </div>
        </AbsoluteFill>
      ) : null}
      {tags.map((tg, i) => (
        <Tag key={i} x={tg.x} y={tg.y} text={tg.text} color={tg.color ?? '#2A2A2A'} opacity={interpolate(t, [tg.at ?? 0.3, (tg.at ?? 0.3) + 0.08], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
      ))}
    </AbsoluteFill>
  );
};
