import React from 'react';
import {RoundedBox} from '@react-three/drei';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Angle, clamp, COPPER, ease, Glow, mix, PaperCard, Plate, PunchedCard, Studio, Tag, V3} from '../kit';

type Action = 'reveal' | 'feed' | 'punch' | 'done' | 'reverse' | 'loop' | 'slow';

const ANGLES: Record<string, Angle> = {
  wide: {from: [-2.6, 2.2, 13], to: [-1.4, 2.0, 11.6], target: [0.3, 1.5, 0]},
  front: {from: [0, 1.7, 9.6], to: [0, 1.6, 8.8], target: [0, 1.5, 0]},
  slot: {from: [-6.2, 1.6, 5.6], to: [-5.6, 1.5, 5.0], target: [-1.6, 1.2, 0.3]},
  output: {from: [5.6, 1.5, 6.4], to: [5.0, 1.4, 5.6], target: [2.4, 1.1, 0.4]},
  low: {from: [1.8, 0.7, 8.4], to: [1.2, 0.8, 7.6], target: [0, 1.9, 0]},
  top: {from: [0.5, 7.5, 7.5], to: [0.3, 7.0, 6.6], target: [0, 1.2, 0]},
};

export const Machine: React.FC<{frame: number; busy: number; label?: string; status?: string; lamp?: string; heavy?: number; position?: V3; largeLabel?: boolean}> = ({
  frame,
  busy,
  label = 'HASH MACHINE',
  status = 'SHA-256',
  lamp = '#FFB224',
  heavy = 0,
  position = [0, 0, 0],
  largeLabel = false,
}) => {
  const shake = busy * Math.sin(frame * 1.7) * 0.012;
  return (
    <group position={[position[0] + shake, position[1], position[2]]}>
      <RoundedBox args={[3.2, 2.6, 2.2]} radius={0.22} smoothness={6} position={[0, 1.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={COPPER} metalness={0.45} roughness={0.5} />
      </RoundedBox>
      {[-1, 1].map((sgn) => (
        <mesh key={sgn} position={[sgn * 1.78, 1.35, 0.2]} rotation={[0, sgn * 0.5, 0]} castShadow>
          <boxGeometry args={[0.06, 2.1, 1.2]} />
          <meshStandardMaterial color="#5A4636" metalness={0.6} roughness={0.45} />
        </mesh>
      ))}
      {/* input slot on the left face, output slot on the right */}
      <mesh position={[-1.61, 1.15, 0.3]}>
        <boxGeometry args={[0.04, 0.12, 1.3]} />
        <meshStandardMaterial color="#0B0D10" />
      </mesh>
      <mesh position={[1.61, 1.0, 0.3]}>
        <boxGeometry args={[0.04, 0.12, 1.3]} />
        <meshStandardMaterial color="#0B0D10" />
      </mesh>
      <group position={[0, 0, 1.11]}>
        <group position={[0, 2.3, 0.01]}>
          <Plate text={label} w={largeLabel ? 2.8 : 1.7} h={largeLabel ? 0.65 : 0.26} />
        </group>
        <RoundedBox args={[2.4, 0.75, 0.08]} radius={0.06} position={[0, 1.55, 0]}>
          <meshStandardMaterial color="#12161C" metalness={0.2} roughness={0.15} />
        </RoundedBox>
        <group position={[0, 1.55, 0.05]}>
          <Plate text={status} w={2.2} h={largeLabel ? 0.65 : 0.5} glow={busy * 1.2} />
        </group>
        <mesh position={[0, 0.8, 0.02]}>
          <boxGeometry args={[2.2, 0.06, 0.04]} />
          <meshStandardMaterial color="#1A1E24" />
        </mesh>
        <mesh position={[0, 0.35, 0.05]} rotation={[Math.PI / 2, frame * 0.05 * busy, 0]}>
          <cylinderGeometry args={[0.18, 0.2, 0.12, 24]} />
          <meshStandardMaterial color="#2A3038" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      {heavy > 0 ? (
        <group position={[0.95, 0.55, 1.2]}>
          {[0, 1].map((k) => {
            const r = k ? 0.32 : 0.5;
            const rot = (k ? -1.56 : 1) * frame * 0.02;
            return (
              <group key={k} position={[k ? -0.78 : 0, k ? 0.18 : 0, 0.05 * k]} rotation={[0, 0, rot]}>
                <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                  <cylinderGeometry args={[r, r, 0.12, 32]} />
                  <meshStandardMaterial color="#8C6B3E" metalness={0.8} roughness={0.3} />
                </mesh>
                {Array.from({length: k ? 9 : 14}, (_, i) => {
                  const a2 = (i / (k ? 9 : 14)) * Math.PI * 2;
                  return (
                    <mesh key={i} position={[Math.cos(a2) * (r + 0.06), Math.sin(a2) * (r + 0.06), 0]} rotation={[0, 0, a2]}>
                      <boxGeometry args={[0.14, 0.1, 0.12]} />
                      <meshStandardMaterial color="#8C6B3E" metalness={0.8} roughness={0.3} />
                    </mesh>
                  );
                })}
                <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
                  <meshStandardMaterial color="#2A3038" metalness={0.8} roughness={0.3} />
                </mesh>
              </group>
            );
          })}
        </group>
      ) : null}
      <mesh position={[0, 2.75, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.22, 24]} />
        <meshStandardMaterial color="#8A6A3A" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.05, 0]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color="#FFE7B0" emissive={lamp} emissiveIntensity={0.4 + busy * 6} toneMapped={false} />
      </mesh>
      <Glow position={[0, 3.05, 0.05]} size={1.4 + busy * 1.8} opacity={0.2 + busy * 0.8} color={lamp === '#FFB224' ? '255,178,36' : lamp === '#E0452F' ? '224,69,47' : '61,220,151'} />
      <pointLight position={[0, 3.1, 0.3]} color={lamp} intensity={busy * 6} distance={4} />
    </group>
  );
};

const Feed: React.FC<{p: number; input: string; y?: number}> = ({p, input, y = 1.15}) =>
  p >= 1 ? null : (
    <group position={[mix(-4.4, -1.75, p), y, 0.3]} rotation={[0, mix(0.4, Math.PI / 2, p), 0]}>
      <group scale={[interpolate(p, [0.8, 1], [1, 0.001], clamp), 1, 1]}>
        <PaperCard big={input} label="password" />
      </group>
    </group>
  );

const Out: React.FC<{p: number; hex: string; z?: number}> = ({p, hex, z = 0.5}) =>
  p <= 0.01 ? null : (
    <group position={[mix(1.6, 3.5, p), 0.95 + p * 0.3, z]} rotation={[0, mix(-Math.PI / 2, -0.4, p), 0]}>
      <PunchedCard hex={hex} />
    </group>
  );

// The hash machine set. `action` animates across the shot; `angle` picks one of the named camera set-ups.
export const MachineSet: React.FC<{
  action: Action;
  angle?: string;
  input: string;
  hex: string;
  status?: string;
  label?: string;
  tags?: {x: number; y: number; text: string; at?: number; color?: string}[];
  guesses?: string[];
  duration: number;
}> = ({action, angle = 'wide', input, hex, status, label, tags = [], guesses = [], duration}) => {
  const frame = useCurrentFrame();
  const t = frame / Math.max(1, duration);
  let busy = 0;
  let feed = 1;
  let out = 0;
  let lamp = '#FFB224';
  let heavy = 0;
  let st = status ?? 'SHA-256';
  if (action === 'reveal') busy = 0.1;
  if (action === 'feed') {
    feed = ease(t, 0.08, 0.6);
    busy = interpolate(t, [0.55, 0.7], [0, 1], clamp);
  }
  if (action === 'punch') {
    busy = interpolate(t, [0, 0.1, 0.55, 0.7], [1, 1, 1, 0.15], clamp);
    out = ease(t, 0.15, 0.6);
  }
  if (action === 'done') out = 1;
  if (action === 'reverse') {
    out = 1 - ease(t, 0.1, 0.45) * 0.55;
    lamp = '#E0452F';
    busy = interpolate(t, [0.4, 0.5], [0, 1], clamp);
    st = 'NO WAY BACK';
  }
  if (action === 'slow') {
    heavy = 1;
    busy = 0.55 + 0.45 * Math.sin(frame / 22);
  }
  const loopCards = action === 'loop' ? guesses : [];
  const per = duration / Math.max(1, loopCards.length);
  return (
    <AbsoluteFill>
      <Studio color="#2E5663" angle={ANGLES[angle] ?? ANGLES.wide} duration={duration}>
        <Machine frame={frame} busy={action === 'loop' ? 0.6 + 0.4 * Math.sin(frame / 4) : busy} lamp={lamp} status={st} label={label} heavy={heavy} />
        {action === 'feed' ? <Feed p={feed} input={input} /> : null}
        {action === 'reveal' ? (
          <group position={[-4.2, 1.15 + Math.sin(frame / 18) * 0.04, 0.3]} rotation={[0, 0.4, 0]}>
            <PaperCard big={input} label="password" />
          </group>
        ) : null}
        {action === 'punch' || action === 'done' || action === 'reverse' ? <Out p={out} hex={hex} /> : null}
        {loopCards.map((g, i) => {
          const local = (frame - i * per) / per;
          if (local < 0 || local > 1.4) return null;
          return <Feed key={i} p={ease(local, 0, 0.8)} input={g} y={1.15 + (i % 2) * 0.05} />;
        })}
      </Studio>
      {tags.map((tg, i) => (
        <Tag key={i} x={tg.x} y={tg.y} text={tg.text} color={tg.color} opacity={interpolate(t, [tg.at ?? 0.3, (tg.at ?? 0.3) + 0.08], [0, 1], clamp)} />
      ))}
    </AbsoluteFill>
  );
};
