import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from './components/base';
import {colors, fonts} from './theme';

export const Thumbnail: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <AbsoluteFill style={{padding: '70px 80px', justifyContent: 'center', gap: 56}}>
      <div style={{fontFamily: fonts.serif, fontSize: 150, lineHeight: 0.95, color: colors.cream}}>
        They can't
        <br />
        <span style={{color: colors.teal}}>read it.</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          background: colors.panel,
          border: `2px solid ${colors.line}`,
          borderRadius: 14,
          padding: '26px 34px',
          width: 1120,
        }}
      >
        <span style={{fontFamily: fonts.sans, fontWeight: 500, fontSize: 34, color: colors.slate}}>you@mail.com</span>
        <span style={{fontFamily: fonts.mono, fontWeight: 700, fontSize: 40, color: colors.amber, whiteSpace: 'nowrap', overflow: 'hidden'}}>
          $argon2id$Pr8MGyxkXWUs/ALFyQ4a
        </span>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
