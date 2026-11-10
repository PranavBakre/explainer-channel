import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from './components/base';
import {registry} from './registry';
import gallery from './gallery.json';

export const GALLERY_SHOT = 150;
type Item = {visual: string; props: Record<string, unknown>; duration?: number};
const items = gallery as Item[];
const starts = items.map((_, i) => items.slice(0, i).reduce((a, g) => a + (g.duration ?? GALLERY_SHOT), 0));
export const GALLERY_LENGTH = items.reduce((a, g) => a + (g.duration ?? GALLERY_SHOT), 0);

// Dev-only: each test shot in sequence, so one stills run reviews many sets.
export const Gallery: React.FC = () => (
  <AbsoluteFill>
    <Background />
    {items.map((g, i) => {
      const V = registry[g.visual];
      const d = g.duration ?? GALLERY_SHOT;
      return (
        <Sequence key={i} from={starts[i]} durationInFrames={d}>
          <V {...g.props} steps={(g.props.steps as number[] | undefined) ?? [0, 40, 80, 110]} duration={d} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
