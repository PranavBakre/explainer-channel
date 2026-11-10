import React from 'react';
import {fibre, Oak} from '../finish';
import {RoundedBox} from '@react-three/drei';
import {Scanned} from '../Scanned';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {fonts} from '../../theme';
import {Angle, clamp, ease, Glow, mix, mixV, PAPER, PaperCard, Plate, Studio, Tag, useCanvasTexture, V3} from '../kit';

export type Field = 'plain' | 'hidden' | 'hash' | 'salted' | 'cipher' | 'argon2id' | 'argon';

const ANGLES: Record<string, Angle> = {
  row: {from: [0.4, 2.3, 4.2], to: [0.2, 2.2, 3.6], target: [0, 1.75, 0.6]},
  wide: {from: [-3.2, 3.4, 5.3], to: [-2.9, 3.2, 4.9], target: [0, 1.45, 0.4]},
  drawer: {from: [-3.6, 4.2, 7.2], to: [-2.8, 3.8, 6.4], target: [0, 1.2, 0]},
  copy: {from: [1.5, 4.4, 9.5], to: [1.8, 4.0, 8.6], target: [1.6, 1.1, 0]},
  library: {from: [-3.5, 3.0, 13.5], to: [1.5, 2.9, 12], target: [0, 2.7, 0]},
  match: {from: [2.8, 2.6, 6.2], to: [2.4, 2.4, 5.4], target: [1.25, 2.1, 0]},
};

const FIELD_TEXT: Record<Field, (pw: string) => {text: string; color: string}> = {
  plain: (pw) => ({text: pw, color: '#B87400'}),
  hidden: () => ({text: '?', color: '#8A8F98'}),
  hash: () => ({text: '81c68634d1b2…', color: '#1A1E24'}),
  salted: () => ({text: 'e05b13d8 · 324ce3f9…', color: '#1A1E24'}),
  cipher: (pw) => ({text: `${CIPHER[pw].replace(/=+$/, '').slice(0, 12)}…`, color: '#1A1E24'}),
  argon2id: () => ({text: '$argon2id$v=19$…', color: '#1A1E24'}),
  argon: () => ({text: '$argon2id$v=19$m=19456,t=2,p=1$…', color: '#1A1E24'}),
};

const IndexCard: React.FC<{email: string; value: string; color: string}> = ({email, value, color}) => {
  const tex = useCanvasTexture(
    1024,
    640,
    (c, W, H) => {
      c.fillStyle = PAPER;
      c.fillRect(0, 0, W, H);
      c.fillStyle = '#C0463A';
      c.fillRect(0, 120, W, 6);
      for (let y = 230; y < H; y += 90) {
        c.fillStyle = 'rgba(80,120,170,0.35)';
        c.fillRect(0, y, W, 3);
      }
      c.fillStyle = '#7A6A52';
      c.font = `600 40px ${fonts.sans}`;
      c.fillText('EMAIL', 60, 200);
      c.fillText('PASSWORD', 60, 394);
      c.fillStyle = '#1A1E24';
      c.font = `500 64px ${fonts.sans}`;
      c.textBaseline = 'middle';
      c.fillText(email, 60, 275);
      c.fillStyle = color;
      let size = 84;
      c.font = `700 ${size}px ${fonts.mono}`;
      while (c.measureText(value).width > W - 120 && size > 30) {
        size -= 4;
        c.font = `700 ${size}px ${fonts.mono}`;
      }
      c.fillText(value, 60, 455);
    },
    [email, value, color],
  );
  return (
    <mesh castShadow>
      <boxGeometry args={[1.6, 1.0, 0.015]} />
      {[0, 1, 2, 3, 5].map((i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} color="#E6DCC8" roughness={0.9} bumpMap={fibre()} bumpScale={0.6} />
      ))}
      <meshStandardMaterial attach="material-4" map={tex} roughness={0.85} bumpMap={fibre()} bumpScale={0.6} />
    </mesh>
  );
};

const USERS = [
  ['asha@mail.com', 'sunshine1'],
  ['ravi@mail.com', '123456'],
  ['meera@mail.com', 'qwerty'],
  ['dev@mail.com', 'iloveyou'],
  ['sam@mail.com', 'football'],
  ['you@mail.com', 'mango@123'],
];

// Triple DES (EDE3, CBC, PKCS#7) of each stored password under one demo key: 0123456789ABCDEF… (24 bytes), IV zero.
export const CIPHER: Record<string, string> = {
  sunshine1: 'hstsZlb8v6ItsAQx8pDMCQ==',
  '123456': 'YvyLlffrXN8=',
  qwerty: 'px4kh3Q10Do=',
  iloveyou: 'cGwWPiVXhC7jj3em3WEoJw==',
  football: 'DHrScU34Jx8Z6UMom6dHlg==',
  'mango@123': '6FeRQifMiphtMzZfI0QUmw==',
};

const Drawer: React.FC<{field: Field; lift: number; position?: [number, number, number]; ghost?: boolean; ghostOpacity?: number}> = ({field, lift, position = [0, 0, 0], ghost, ghostOpacity = 0.85}) => (
  <group position={position}>
    <Scanned name="vintage_wooden_drawer_01" node="vintage_wooden_drawer_01_drawer02" fit={[2.0, 1.4, 3.4]} opacity={ghost ? ghostOpacity : 1} />
    {USERS.map(([email, pw], i) => {
      const f = FIELD_TEXT[field](pw);
      const isYou = email === 'you@mail.com';
      return (
        <group key={email} position={[0, 1.7 + (isYou ? lift : 0), -1.05 + i * 0.45]} rotation={[-0.12, 0, 0]}>
          <IndexCard email={email} value={f.text} color={f.color} />
        </group>
      );
    })}
  </group>
);

const LibraryWall: React.FC<{hit: number; columns?: number; rows?: number; hitIndex?: number}> = ({hit, columns = 9, rows = 5, hitIndex = 29}) => {
  const cols = columns;
  const labels = ['7c4a8d09', '5baa61e4', '7c222fb2', 'b1b3773a', 'ee8d8728', '3d4f2bf0', '6367c48d', 'ab87d24b', 'b7a875fc', 'af8978b1', '8d6e34f9', '775bb961', '2d27b62c', 'ed9d3d83', 'f14d5ba7'];
  return (
    <group>
      <RoundedBox args={[cols * 1.25 + 0.4, rows * 0.95 + 0.4, 1.6]} radius={0.05} position={[0, rows * 0.475 + 0.3, -0.85]} castShadow receiveShadow>
        <Oak repeat={[4, 2]} tint="#7E5636" />
      </RoundedBox>
      {Array.from({length: cols * rows}, (_, i) => {
        const cx = (i % cols) * 1.25 - ((cols - 1) * 1.25) / 2;
        const cy = Math.floor(i / cols) * 0.95 + 0.75;
        const isHit = i === hitIndex;
        const out = isHit ? hit : 0;
        return (
          <group key={i} position={[cx, cy, 0.02 + out * 0.9]}>
            <Scanned name="vintage_wooden_drawer_01" node="vintage_wooden_drawer_01_drawer02" fit={[1.12, 0.82, 1.9]} position={[0, -0.41, -0.88]} />
            <group position={[0, 0.24, 0.09]}>
              <Plate text={isHit ? 'f14d5ba7' : labels[i % labels.length]} w={0.8} h={0.2} bg={isHit && hit > 0.5 ? '#F3D3C8' : '#EFE7D6'} color={isHit && hit > 0.5 ? '#9C3B2E' : '#1A1E24'} />
            </group>
            {isHit && hit > 0.01 ? (
              <group position={[0, 0.35 + hit * 0.75, 0.3]} rotation={[-0.15, 0, 0]}>
                <PaperCard big="mango@123" label="password" w={1.3} h={0.8} />
              </group>
            ) : null}
            {isHit ? <Glow position={[0, 0, 0.4]} size={2.4 * hit} opacity={0.5 * hit} color="224,69,47" /> : null}
          </group>
        );
      })}
    </group>
  );
};

// Card-catalogue set: a drawer of user rows, a stolen copy, or a wall of precomputed lookups.
export type CatalogState = {step: number; field: Field; pos?: V3; posTo?: V3; target?: V3; targetTo?: V3};

export const CatalogSet: React.FC<{
  action: 'row' | 'drawer' | 'copy' | 'library';
  angle?: string;
  field?: Field;
  fieldTo?: Field;
  states?: CatalogState[];
  steps?: number[];
  rise?: number;
  copyLift?: number;
  copyTo?: V3;
  copyOpacity?: number;
  color?: string;
  tags?: {x: number; y: number; text: string; at?: number; atStep?: number; color?: string}[];
  duration: number;
}> = ({action, angle, field = 'plain', fieldTo, states = [], steps = [], rise = 0, copyLift = 0, copyTo = [3.6, 0, 0.8], copyOpacity = 0.85, color = '#4E3A36', tags = [], duration}) => {
  const frame = useCurrentFrame();
  const t = frame / Math.max(1, duration);
  const stateAt = (s: CatalogState) => steps[s.step] ?? 0;
  const state = states.length ? states.reduce((a, s) => (stateAt(s) <= frame ? s : a), states[0]) : null;
  const swap = fieldTo ? t > 0.5 : false;
  const f = state ? state.field : swap ? fieldTo! : field;
  const lift = action === 'row' && rise ? rise * ease(frame, steps[0] ?? 0, (steps[0] ?? 0) + 24) : action === 'row' ? 0.35 : 0;
  const steal = action === 'copy' ? ease(t, 0.15, 0.7) : 0;
  const hit = action === 'library' ? ease(t, 0.55, 0.75) : 0;
  const ang = ANGLES[angle ?? (action === 'library' ? 'library' : action === 'copy' ? 'copy' : action === 'row' ? 'row' : 'drawer')];
  // Each state owns a slow move from its own framing to its `…To` framing; the 24 frames after a step blend from the previous state.
  const camAt = (i: number, at: number) => {
    const s = states[i];
    const until = i + 1 < states.length ? stateAt(states[i + 1]) : duration;
    const k = Math.min(1, Math.max(0, (at - stateAt(s)) / Math.max(1, until - stateAt(s))));
    return {pos: mixV(s.pos ?? ang.from, s.posTo ?? s.pos ?? ang.from, k), target: mixV(s.target ?? ang.target, s.targetTo ?? s.target ?? ang.target, k)};
  };
  const look = (() => {
    if (!state) return undefined;
    const i = states.indexOf(state);
    const at = stateAt(state);
    const to = camAt(i, frame);
    if (i === 0) return to;
    const from = camAt(i - 1, at);
    const k = ease(frame, at, at + 24);
    return {pos: mixV(from.pos, to.pos, k), target: mixV(from.target, to.target, k)};
  })();
  return (
    <AbsoluteFill>
      <Studio color={color} angle={ang} look={look} duration={duration}>
        {action === 'library' ? (
          <LibraryWall hit={hit} />
        ) : (
          <>
            <Drawer field={f} lift={lift} />
            {action === 'copy' && steal > 0 ? (
              <group position={[mix(2.3, copyTo[0], steal), copyLift + mix(0, copyTo[1], steal), mix(0, copyTo[2], steal)]} scale={ease(steal, 0, 0.3) || 0.001}>
                <Drawer field={f} lift={0} ghost ghostOpacity={copyOpacity} />
              </group>
            ) : null}
          </>
        )}
      </Studio>
      {tags.map((tg, i) => {
        const at = tg.atStep === undefined ? tg.at ?? 0.3 : (steps[tg.atStep] ?? 0) / Math.max(1, duration);
        return <Tag key={i} x={tg.x} y={tg.y} text={tg.text} color={tg.color} opacity={interpolate(t, [at, at + 0.08], [0, 1], clamp)} />;
      })}
    </AbsoluteFill>
  );
};

export const CatalogDrawer = Drawer;
export const LookupCabinet = LibraryWall;
