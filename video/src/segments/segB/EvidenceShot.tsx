import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../../three/kit';
import {fonts} from '../../theme';

const ENTER = 10;
const PUSH = 0.03;

type Band = [number, number, number, number];

// DocShot's page-then-crop, with three changes: the crop change sits on a frame (a single-beat shot has no
// `steps` to key it to), the crop is displayed only inside `band` so a sliver of the next paragraph does not
// show, and the whole crop is shown wider so the quoted rule stays legible.
export const EvidenceShot: React.FC<{
  page: string;
  quote?: string;
  quoteBand?: Band;
  source: string;
  quoteSource?: string;
  note?: string;
  focus?: [number, number];
  at?: number;
  steps: number[];
  duration: number;
}> = ({page, quote, quoteBand, source, quoteSource, note, focus = [0, 0], at, duration}) => {
  const frame = useCurrentFrame();
  const qAt = quote ? Math.round(at ?? duration * 0.42) : Infinity;
  const q = quote ? ease(frame, qAt, qAt + ENTER) : 0;
  const push = 1 + PUSH * (frame / Math.max(1, duration));
  const band = quoteBand ?? [0, 0, 0, 0];
  const [bw, bh, by0, by1] = band;
  const crop = bh > 0;
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
              padding: 26,
              width: 1820,
              maxWidth: '92%',
              display: 'flex',
            }}
          >
            {crop ? (
              <div style={{width: 1768, maxWidth: '100%', aspectRatio: `${bw} / ${by1 - by0}`, overflow: 'hidden'}}>
                <Img
                  src={staticFile(`assets/shots/${quote}`)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: `50% ${(by0 / Math.max(1, bh - (by1 - by0))) * 100}%`,
                  }}
                />
              </div>
            ) : (
              <Img src={staticFile(`assets/shots/${quote}`)} style={{maxWidth: 1768, maxHeight: 728, objectFit: 'contain'}} />
            )}
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
          background: 'rgba(11,15,20,0.94)',
          color: '#F2EDE4',
          fontFamily: fonts.sans,
          fontSize: 26,
          fontWeight: 500,
          opacity: interpolate(frame, [8, 20], [0, 1], clamp),
        }}
      >
        {q > 0.5 && quoteSource ? quoteSource : source}
      </div>
      {note ? (
        <div
          style={{
            position: 'absolute',
            right: 96,
            bottom: 64,
            padding: '10px 18px',
            borderRadius: 8,
            background: 'rgba(11,15,20,0.94)',
            color: '#F2EDE4',
            fontFamily: fonts.sans,
            fontSize: 26,
            fontWeight: 500,
            opacity: q,
          }}
        >
          {note}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
