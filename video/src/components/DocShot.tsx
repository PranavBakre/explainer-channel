import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../three/kit';
import {fonts} from '../theme';

// A real source on screen: the page capture with a slow push, then its highlighted passage lifted onto a card.
export const DocShot: React.FC<{
  page: string;
  quote?: string;
  quoteStep?: number;
  source: string;
  focus?: [number, number];
  steps: number[];
  duration: number;
}> = ({page, quote, quoteStep = 1, source, focus = [0.5, 0.35], steps, duration}) => {
  const frame = useCurrentFrame();
  const qAt = quote ? (steps[quoteStep] ?? Math.round(duration * 0.4)) : Infinity;
  const q = quote ? ease(frame, qAt, qAt + 18) : 0;
  const push = 1.04 + 0.08 * (frame / Math.max(1, duration));
  return (
    <AbsoluteFill style={{backgroundColor: '#E9E5DD'}}>
      <AbsoluteFill style={{filter: `blur(${q * 6}px) brightness(${1 - q * 0.35})`}}>
        <Img
          src={staticFile(`assets/shots/${page}`)}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${push})`, transformOrigin: `${focus[0] * 100}% ${focus[1] * 100}%`}}
        />
      </AbsoluteFill>
      {quote ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div
            style={{
              opacity: q,
              transform: `translateY(${(1 - q) * 40}px) scale(${0.96 + q * 0.04})`,
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
              padding: 36,
              maxWidth: 1500,
              maxHeight: 820,
              display: 'flex',
            }}
          >
            <Img src={staticFile(`assets/shots/${quote}`)} style={{maxWidth: 1428, maxHeight: 748, objectFit: 'contain'}} />
          </div>
        </AbsoluteFill>
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: 96,
          bottom: 64,
          padding: '10px 18px',
          borderRadius: 8,
          background: 'rgba(11,15,20,0.82)',
          color: '#F2EDE4',
          fontFamily: fonts.sans,
          fontSize: 26,
          fontWeight: 500,
          opacity: interpolate(frame, [8, 20], [0, 1], clamp),
        }}
      >
        {source}
      </div>
    </AbsoluteFill>
  );
};
