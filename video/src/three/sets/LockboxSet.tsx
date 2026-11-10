import React from 'react';
import {Part, Scanned} from '../Scanned';
import {Brushed} from '../finish';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Angle, BRASS, clamp, ease, Glow, mix, PaperCard, Plate, Studio, Tag, useCanvasTexture} from '../kit';
import {fonts} from '../../theme';

const ANGLES: Record<string, Angle> = {
  box: {from: [-1.6, 3.2, 7.4], to: [-1.0, 2.9, 6.6], target: [0, 1.0, 0]},
  close: {from: [1.4, 2.2, 4.4], to: [1.0, 2.0, 3.8], target: [0, 1.0, 0.4]},
  wall: {from: [-4.5, 5.6, 12.5], to: [-2.5, 5.2, 11], target: [0, 0.6, -2.3]},
  hints: {from: [2.2, 4.8, 13.0], to: [1.9, 4.5, 12.2], target: [-0.3, 0.6, -2.3]},
  lid: {from: [-1.5, 5.9, 6.4], to: [-1.1, 5.5, 5.9], target: [0, 1.3, 0.1]},
  rise: {from: [-0.6, 3.0, 7.0], to: [-0.4, 2.8, 6.4], target: [0, 1.45, 0.1]},
  stamp: {from: [1.1, 3.5, 5.6], to: [0.9, 3.3, 5.2], target: [0, 0.85, 0.15]},
};

export const Key: React.FC<{position: [number, number, number]; rotation?: [number, number, number]; scale?: number}> = ({position, rotation = [0, 0, 0], scale = 1}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh castShadow>
      <torusGeometry args={[0.26, 0.07, 16, 32]} />
      <Brushed color={BRASS} roughness={0.22} />
    </mesh>
    <mesh position={[0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.05, 0.05, 1.0, 16]} />
      <Brushed color={BRASS} roughness={0.22} />
    </mesh>
    {[0.95, 1.12].map((x, i) => (
      <mesh key={i} position={[x, -0.1 - i * 0.03, 0]} castShadow>
        <boxGeometry args={[0.08, 0.16 + i * 0.06, 0.05]} />
        <Brushed color={BRASS} roughness={0.22} />
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
      let size = 92;
      c.font = `700 ${size}px ${fonts.mono}`;
      while (c.measureText(text).width > W - 60 && size > 32) {
        size -= 4;
        c.font = `700 ${size}px ${fonts.mono}`;
      }
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

const lid = (open: number): Part => ({pivot: [0, 0.3515, -0.1225], rotation: [(1 - open) * (Math.PI / 2) - open * 0.25, 0, 0]});

const Box: React.FC<{open: number; cipher?: string; card?: {text: string; rise: number; red?: boolean; size?: number}; position?: [number, number, number]; scale?: number; hint?: string; stamp?: string}> = ({
  open,
  cipher,
  card,
  position = [0, 0, 0],
  scale = 1,
  hint,
  stamp,
}) => (
  <group position={position} scale={scale}>
    <Scanned name="metal_tool_chest" fitNode="metal_tool_chest_chest" size={2.4} parts={{metal_tool_chest_lid: lid(open), metal_tool_chest_hinge_lid: lid(open)}} />
    <group position={[0, 1.23, -0.51]} rotation={[(1 - open) * (Math.PI / 2) - open * 0.25, 0, 0]}>
      {cipher ? (
        <group position={[0, 0.51, -0.28]} rotation={[Math.PI, 0, 0]}>
          <Cipher text={cipher} />
        </group>
      ) : null}
    </group>
    {card ? (
      <group position={[0, mix(0.7, 2.3, card.rise), 0.1]} rotation={[-0.2, 0, 0]}>
        <PaperCard big={card.text} label="password" bigColor={card.red ? '#C0392B' : '#B87400'} bigSize={card.size} />
      </group>
    ) : null}
    {hint ? (
      <group position={[0, 0.62, 0.6]}>
        <Plate text={hint} w={2.0} h={0.5} bg="#EFE7D6" color="#B23A2E" />
      </group>
    ) : null}
    {stamp ? (
      <group position={[0, 0.34, 0.585]}>
        <Plate text={stamp} w={1.5} h={0.3} bg="#241C13" color="#F2D9A8" />
      </group>
    ) : null}
  </group>
);

const WALL = ['123456', 'sunshine1', 'password', 'qwerty', 'iloveyou', 'adobe123', 'mango@123', 'football', 'princess'];

// Lockbox set: one encrypted box and its key, or a wall of boxes that one key opens.
export const LockboxSet: React.FC<{
  action: 'lock' | 'locked' | 'unlock' | 'wall' | 'hints';
  angle?: string;
  plain: string;
  cipher: string;
  hints?: string[];
  closed?: boolean;
  stamp?: string;
  tags?: {x: number; y: number; text: string; at?: number; color?: string}[];
  duration: number;
}> = ({action, angle, plain, cipher, hints = [], closed = false, stamp, tags = [], duration}) => {
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
            <Box open={open} cipher={open < 0.5 ? cipher : undefined} card={{text: plain, rise, red}} stamp={stamp} />
            {action !== 'lock' ? (
              <Key position={[mix(-3.2, -0.95, keyP), 1.05, mix(2.4, 0.75, keyP)]} rotation={[0, mix(-0.6, 0, keyP), 0]} scale={0.8} />
            ) : null}
          </>
        ) : (
          <>
            {Array.from({length: cols * rows}, (_, i) => {
              const x = (i % cols) * 2.0 - ((cols - 1) * 2.0) / 2;
              const row = Math.floor(i / cols);
              const at = 0.12 + i * 0.035;
              const o = action === 'hints' ? (closed ? 0 : 1) : ease(t, at, at + 0.06);
              const hintIdx = [1, 3, 4].indexOf(i);
              return (
                <Box
                  key={i}
                  position={[x + (row % 2) * 1.0, 0, -row * 2.3]}
                  scale={0.62}
                  open={o}
                  card={{text: WALL[i % WALL.length], rise: o * 0.85, red: true, size: 0.2}}
                  hint={action === 'hints' && hintIdx >= 0 ? hints[hintIdx] : undefined}
                />
              );
            })}
            {action === 'wall' ? (
              <Key position={[interpolate(t, [0.1, 0.75], [-6.5, 7.5], clamp), 3.3 + Math.sin(frame / 6) * 0.08, 1.4]} rotation={[0, 0, -0.3]} scale={1.1} />
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

export const EncryptionBox = Box;
