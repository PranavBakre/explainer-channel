import React from 'react';
import {RoundedBox} from '@react-three/drei';
import {Oak} from '../../three/finish';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {hexBits} from '../../components/fingerprint';
import {ease, mix, PunchedCard, Studio, Tag} from '../../three/kit';
import {digest, LabelC, SaltChipC} from './props';

export const CompareC: React.FC<{mode: 'avalanche' | 'match' | 'salt'; steps: number[]; beatSteps?: number[]; duration: number}> = ({mode, steps: suppliedSteps, beatSteps, duration}) => {
  const frame = useCurrentFrame();
  const steps = beatSteps ?? suppliedSteps;
  const avalanche = mode === 'avalanche';
  const a = digest(avalanche ? 'hunter2' : mode === 'salt' ? '9f2c4a71mango@123' : 'mango@123');
  const b = digest(avalanche ? 'hunter3' : mode === 'salt' ? 'e05b13d8mango@123' : 'mango@123');
  const bitsA = hexBits(a), bitsB = hexBits(b);
  const diff = bitsA.map((bit, i) => bit !== bitsB[i]);
  const overlayAt = avalanche ? (steps[1] ?? 124) + 70 : mode === 'match' ? 12 : 24;
  const slide = ease(frame, overlayAt, overlayAt + (mode === 'match' ? 25 : 42));
  const revealAt = avalanche ? (steps[2] ?? 363) : mode === 'match' ? duration * 0.5 : 74;
  const reveal = ease(frame, revealAt, revealAt + (mode === 'match' ? 14 : 20));
  const top = avalanche ? ease(frame, steps[3] ?? 531, (steps[3] ?? 531) + 35) : ease(frame, duration * 0.6, duration * 0.85);
  return <AbsoluteFill>
    <Studio color="#2B4F5C" angle={{from: [0.25 - 0.5 * frame / Math.max(1, duration), mix(5.9, 8.2, top), mix(7.4, 2.5, top) - 0.4 * frame / Math.max(1, duration)], target: [0, 0.7, 0.25], fov: 43}} duration={duration}>
      <RoundedBox args={[7.4, 0.5, 4.0]} radius={0.08} position={[0, 0.25, 0]} castShadow receiveShadow><Oak repeat={[3, 1]} tint="#8A6446" /></RoundedBox>
      <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[7.0, 3.6]} /><meshStandardMaterial color="#FFF6E2" emissive="#FFF1D0" emissiveIntensity={0.45} /></mesh>
      <group position={[mix(-1.65, 0, slide), 0.54, -0.05]} rotation={[-Math.PI / 2, 0, 0]}><PunchedCard titleScale={1.7} hex={a} w={2.75} title={avalanche ? 'hunter2' : mode === 'salt' ? '9f2c4a71 / mango@123' : 'STORED'} /></group>
      <group position={[mix(1.65, 0, slide), 0.57, -0.05]} rotation={[-Math.PI / 2, 0, 0]}><PunchedCard titleScale={1.7} hex={b} w={2.75} title={reveal > 0.5 ? mode === 'match' ? 'MATCH' : 'CHANGED BITS' : avalanche ? 'hunter3' : mode === 'salt' ? 'e05b13d8 / mango@123' : 'TYPED → HASHED'} mark={reveal > 0.5 && mode !== 'match' ? diff : undefined} tint={reveal > 0.5 && mode === 'match' ? '#DDF5E8' : undefined} /></group>
      <group position={[-1.65, 0.56, 1.7]} rotation={[-Math.PI / 2, 0, 0]}>
        {mode === 'salt' ? <SaltChipC salt="9f2c4a71" /> : <LabelC lines={[avalanche ? 'hunter2' : 'stored hash']} w={2.5} h={0.45} />}
      </group>
      <group position={[1.65, 0.56, 1.7]} rotation={[-Math.PI / 2, 0, 0]}>
        {mode === 'salt' ? <SaltChipC salt="e05b13d8" /> : <LabelC lines={[avalanche ? 'hunter3' : 'login hash']} w={2.5} h={0.45} />}
      </group>
      {mode === 'salt' ? [a, b].map((hex, i) => <group key={hex} position={[i ? 1.65 : -1.65, 0.56, -1.75]} rotation={[-Math.PI / 2, 0, 0]}>
        <LabelC lines={[`${hex.slice(0, 8)}…`]} w={2.5} h={0.45} />
      </group>) : null}
    </Studio>
    <Tag x={960} y={125} size={54} text={mode === 'match' ? 'Match' : `${diff.filter(Boolean).length} of 256 bits changed`} color={mode === 'match' ? '#3DDC97' : '#FF5A4E'} opacity={reveal} />
    {mode === 'salt' ? <Tag x={960} y={175} size={32} text="Same password · different salts" /> : null}
  </AbsoluteFill>;
};
