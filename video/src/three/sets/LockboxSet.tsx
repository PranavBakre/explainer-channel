import React from 'react';
import {RoundedBox} from '@react-three/drei';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Angle, BRASS, clamp, ease, Glow, mix, PaperCard, Plate, Studio, Tag, useCanvasTexture} from '../kit';
import {fonts} from '../../theme';

const ANGLES: Record<string, Angle> = {
  box: {from: [-1.6, 3.2, 7.4], to: [-1.0, 2.9, 6.6], target: [0, 1.0, 0]},
  close: {from: [1.4, 2.2, 4.4], to: [1.0, 2.0, 3.8], target: [0, 1.0, 0.4]},
  wall: {from: [-4.5, 5.6, 12.5], to: [-2.5, 5.2, 11], target: [0, 0.6, -2.3]},
  hints: {from: [3.4, 4.2, 10.5], to: [2.8, 3.9, 9.5], target: [0.6, 0.6, -2.3]},
};

export const Key: React.FC<{position: [number, number, number]; rotation?: [number, number, number]; scale?: number}> = ({position, rotation = [0, 0, 0], scale = 1}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh castShadow>
      <torusGeometry args={[0.26, 0.07, 16, 32]} />
      <meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.22} />
    </mesh>
    <mesh position={[0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.05, 0.05, 1.0, 16]} />
      <meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.22} />
    </mesh>
    {[0.95, 1.12].map((x, i) => (
      <mesh key={i} position={[x, -0.1 - i * 0.03, 0]} castShadow>
        <boxGeometry args={[0.08, 0.16 + i * 0.06, 0.05]} />
        <meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.22} />
      </mesh>
    ))}
  </group>
);

const Cipher: React.FC<{text: string}> = ({text}) => {
  const tex = useCanvasTexture(
    1024,
    200,
    (c, W, H) => {
      c.fillStyle = '#1B2027';
      c.fillRect(0, 0, W, H);
      c.fillStyle = '#9AA4B2';
      c.font = `700 92px ${fonts.mono}`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(text, W / 2, H / 2 + 4);
    },
    [text],
  );
  return (
    <mesh>
      <planeGeometry args={[1.9, 0.37]} />
      <meshStandardMaterial map={tex} roughness={0.4} />
    </mesh>
  );
};

const Box: React.FC<{open: number; cipher?: string; card?: {text: string; rise: number; red?: boolean}; position?: [number, number, number]; scale?: number; hint?: string}> = ({
  open,
  cipher,
  card,
  position = [0, 0, 0],
  scale = 1,
  hint,
}) => (
  <group position={position} scale={scale}>
    <RoundedBox args={[2.4, 1.3, 1.6]} radius={0.08} position={[0, 0.65, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#5D6670" metalness={0.75} roughness={0.35} />
    </RoundedBox>
    <group position={[0, 1.3, -0.8]} rotation={[-open * 1.9, 0, 0]}>
      <RoundedBox args={[2.45, 0.16, 1.65]} radius={0.06} position={[0, 0.08, 0.82]} castShadow>
        <meshStandardMaterial color="#6B7580" metalness={0.75} roughness={0.32} />
      </RoundedBox>
      {cipher ? (
        <group position={[0, 0.17, 0.82]} rotation={[-Math.PI / 2, 0, 0]}>
          <Cipher text={cipher} />
        </group>
      ) : null}
    </group>
    <mesh position={[0, 0.85, 0.81]}>
      <boxGeometry args={[0.42, 0.52, 0.03]} />
      <meshStandardMaterial color={BRASS} metalness={0.85} roughness={0.25} />
    </mesh>
    <mesh position={[0, 0.85, 0.83]}>
      <boxGeometry args={[0.07, 0.22, 0.02]} />
      <meshStandardMaterial color="#111" />
    </mesh>
    {card ? (
      <group position={[0, mix(0.7, 2.3, card.rise), 0.1]} rotation={[-0.2, 0, 0]}>
        <PaperCard big={card.text} label="password" bigColor={card.red ? '#C0392B' : '#B87400'} />
      </group>
    ) : null}
    {hint ? (
      <group position={[0.9, 0.55, 0.86]} rotation={[0, 0, 0.12]}>
        <Plate text={hint} w={1.15} h={0.32} bg="#EFE7D6" color="#B23A2E" />
      </group>
    ) : null}
  </group>
);

// Lockbox set: one encrypted box and its key, or a wall of boxes that one key opens.
export const LockboxSet: React.FC<{
  action: 'lock' | 'locked' | 'unlock' | 'wall' | 'hints';
  angle?: string;
  plain: string;
  cipher: string;
  hints?: string[];
  tags?: {x: number; y: number; text: string; at?: number; color?: string}[];
  duration: number;
}> = ({action, angle, plain, cipher, hints = [], tags = [], duration}) => {
  const frame = useCurrentFrame();
  const t = frame / Math.max(1, duration);
  const ang = ANGLES[angle ?? (action === 'wall' ? 'wall' : action === 'hints' ? 'hints' : 'box')];
  let open = 0;
  let rise = 0;
  let red = false;
  let keyP = 0;
  if (action === 'lock') {
    open = 1 - ease(t, 0.35, 0.6);
    rise = 1 - ease(t, 0.05, 0.35);
  }
  if (action === 'unlock') {
    keyP = ease(t, 0.05, 0.4);
    open = ease(t, 0.45, 0.65);
    rise = ease(t, 0.55, 0.8);
    red = true;
  }
  const single = action === 'lock' || action === 'locked' || action === 'unlock';
  const cols = 6;
  const rows = 3;
  return (
    <AbsoluteFill>
      <Studio color="#4E3A36" angle={ang} duration={duration}>
        {single ? (
          <>
            <Box open={open} cipher={open < 0.5 ? cipher : undefined} card={{text: plain, rise, red}} />
            {action !== 'lock' ? (
              <Key position={[mix(-3.2, -0.35, keyP), 0.85, mix(2.4, 1.05, keyP)]} rotation={[action === 'unlock' ? interpolate(t, [0.38, 0.46], [0, Math.PI / 2], clamp) : 0, mix(-0.6, 0, keyP), 0]} scale={0.8} />
            ) : null}
          </>
        ) : (
          <>
            {Array.from({length: cols * rows}, (_, i) => {
              const x = (i % cols) * 2.0 - ((cols - 1) * 2.0) / 2;
              const row = Math.floor(i / cols);
              const at = 0.12 + i * 0.035;
              const o = action === 'hints' ? 1 : ease(t, at, at + 0.06);
              const hintIdx = [1, 3, 4].indexOf(i);
              return (
                <Box
                  key={i}
                  position={[x + (row % 2) * 1.0, 0, -row * 2.3]}
                  scale={0.62}
                  open={o * 0.6}
                  card={{text: '••••••', rise: o * 0.5, red: true}}
                  hint={action === 'hints' && hintIdx >= 0 ? hints[hintIdx] : undefined}
                />
              );
            })}
            {action === 'wall' ? (
              <Key position={[interpolate(t, [0.1, 0.75], [-6.5, 5.5], clamp), 2.2 + Math.sin(frame / 6) * 0.08, 1.4]} rotation={[0, 0, -0.3]} scale={1.1} />
            ) : null}
            <Glow position={[0, 1.6, -1.5]} size={8} opacity={action === 'wall' ? 0.12 * t : 0.1} color="224,69,47" />
          </>
        )}
      </Studio>
      {tags.map((tg, i) => (
        <Tag key={i} x={tg.x} y={tg.y} text={tg.text} color={tg.color} opacity={interpolate(t, [tg.at ?? 0.3, (tg.at ?? 0.3) + 0.08], [0, 1], clamp)} />
      ))}
    </AbsoluteFill>
  );
};
