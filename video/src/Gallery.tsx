import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from './components/base';
import {registry} from './registry';
import gallery from './gallery.json';

export const GALLERY_SHOT = 150;
type Item = {visual: string; props: Record<string, unknown>};

// Dev-only: each test shot in sequence, so one stills run reviews many sets.
export const Gallery: React.FC = () => (
  <AbsoluteFill>
    <Background />
    {(gallery as Item[]).map((g, i) => {
      const V = registry[g.visual];
      return (
        <Sequence key={i} from={i * GALLERY_SHOT} durationInFrames={GALLERY_SHOT}>
          <V {...g.props} steps={[0, 40, 80, 110]} duration={GALLERY_SHOT} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
