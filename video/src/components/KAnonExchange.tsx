import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, enter, fonts} from '../theme';
import {Label, ShotProps, stepAt} from './base';
import {Drawn} from './drawn';
import {Fingerprint} from './fingerprint';

const PHONE = {x: 250, y: 190, w: 420, h: 640};
const SERVER = {x: 1290, y: 250, w: 380, h: 520};
const HEX = '0123456789ABCDEF';
const fakeSuffix = (i: number) =>
  Array.from({length: 7}, (_, k) => HEX[Math.floor((Math.abs(Math.sin(i * 91.7 + k * 13.3)) * 1e4) % 16)]).join('');

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// S17: the device sends a five-character prefix; illustrative endings come back; the comparison happens on the device.
export const KAnonExchange: React.FC<ShotProps<{password: string; hash: string; service: string}>> = ({password, hash, service, steps}) => {
  const frame = useCurrentFrame();
  const s0 = stepAt(steps, 0);
  const s1 = stepAt(steps, 1);
  const s2 = stepAt(steps, 2);
  const prefix = hash.slice(0, 5);
  const fly = interpolate(frame - s1, [70, 120], [0, 1], {...clamp, easing: (t) => t * t * (3 - 2 * t)});
  const chips = 12;
  const scan = interpolate(frame - s2, [150, 300], [0, chips], clamp);
  return (
    <AbsoluteFill style={{fontFamily: fonts.sans, color: colors.cream}}>
      <Drawn shape={{kind: 'rect', ...PHONE}} start={s0} dur={24} seed={3} width={4} />
      <Drawn shape={{kind: 'rect', ...SERVER}} start={s0 + 10} dur={24} seed={9} width={4} />
      <Drawn shape={{kind: 'line', x1: SERVER.x + 30, y1: SERVER.y + 120, x2: SERVER.x + SERVER.w - 30, y2: SERVER.y + 120}} start={s0 + 30} seed={11} color={colors.slate} />
      <div style={{position: 'absolute', left: PHONE.x, top: PHONE.y - 56, width: PHONE.w, textAlign: 'center', opacity: enter(frame, s0 + 10)}}>
        <Label>your device</Label>
      </div>
      <div style={{position: 'absolute', left: SERVER.x, top: SERVER.y + 40, width: SERVER.w, textAlign: 'center', opacity: enter(frame, s0 + 25), fontSize: 30, fontWeight: 700}}>
        {service}
      </div>
      <div style={{position: 'absolute', left: PHONE.x, top: PHONE.y + 50, width: PHONE.w, textAlign: 'center', opacity: enter(frame, s0 + 15)}}>
        <span style={{fontFamily: fonts.mono, fontSize: 46, color: colors.amber, border: `2px solid ${colors.amber}`, borderRadius: 10, padding: '8px 18px'}}>{password}</span>
      </div>
      {/* the password itself never crosses: a drawn arrow that gets struck out */}
      <Drawn shape={{kind: 'arrow', x1: 720, y1: 330, x2: 1220, y2: 330}} start={s0 + 40} seed={5} color={colors.slate} />
      <Drawn shape={{kind: 'line', x1: 920, y1: 290, x2: 1020, y2: 370}} start={s0 + 70} dur={10} seed={6} color={colors.red} width={6} />
      <Drawn shape={{kind: 'line', x1: 1020, y1: 290, x2: 920, y2: 370}} start={s0 + 78} dur={10} seed={8} color={colors.red} width={6} />
      <div style={{position: 'absolute', left: 720, top: 240, width: 500, textAlign: 'center', fontSize: 26, color: colors.slate, opacity: enter(frame, s0 + 50)}}>
        not the password, not the full hash
      </div>
      <div style={{position: 'absolute', left: PHONE.x + 40, top: PHONE.y + 150, opacity: enter(frame, s1)}}>
        <Label>SHA-1</Label>
        <div style={{marginTop: 12}}>
          <Fingerprint hex={hash} cols={16} cell={18} reveal={interpolate(frame - s1, [10, 50], [0, 1], clamp)} on={colors.cream} />
        </div>
        <div style={{marginTop: 18, fontFamily: fonts.mono, fontSize: 22, color: colors.slate, width: 340, wordBreak: 'break-all'}}>
          <span style={{color: colors.amber, opacity: 1 - fly}}>{prefix}</span>
          {hash.slice(5)}
        </div>
      </div>
      {/* prefix in flight */}
      <div
        style={{
          position: 'absolute',
          left: interpolate(fly, [0, 1], [PHONE.x + 40, SERVER.x + 110]),
          top: interpolate(fly, [0, 1], [PHONE.y + 470, SERVER.y + 150]) - Math.sin(fly * Math.PI) * 140,
          opacity: frame >= s1 + 60 ? 1 : 0,
          fontFamily: fonts.mono,
          fontSize: 48,
          fontWeight: 700,
          color: colors.ink,
          background: colors.amber,
          borderRadius: 10,
          padding: '6px 16px',
        }}
      >
        {prefix}
      </div>
      {/* endings stream back and stack on the device */}
      {Array.from({length: chips}, (_, i) => {
        const t = interpolate(frame - s2 - i * 5, [0, 40], [0, 1], {...clamp, easing: (x) => 1 - (1 - x) ** 3});
        if (t <= 0) return null;
        const col = i % 3;
        const row = Math.floor(i / 3);
        const tx = PHONE.x + 30 + col * 125;
        const ty = PHONE.y + 480 + row * 34;
        const sx = SERVER.x + 60 + (i % 4) * 70;
        const sy = SERVER.y + 220 + (i % 6) * 40;
        const lit = Math.floor(scan) === i;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: interpolate(t, [0, 1], [sx, tx]),
              top: interpolate(t, [0, 1], [sy, ty]),
              fontFamily: fonts.mono,
              fontSize: 22,
              color: lit ? colors.ink : colors.cream,
              background: lit ? colors.teal : colors.panel,
              border: `1px solid ${colors.line}`,
              borderRadius: 6,
              padding: '2px 8px',
            }}
          >
            …{fakeSuffix(i)}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: PHONE.x, top: PHONE.y + PHONE.h + 24, width: PHONE.w, textAlign: 'center', opacity: enter(frame, s2 + 150)}}>
        <span style={{fontSize: 28, color: colors.teal}}>compared here, on your device</span>
        <div style={{fontSize: 18, color: colors.slate, marginTop: 6}}>endings shown are illustrative</div>
      </div>
    </AbsoluteFill>
  );
};
