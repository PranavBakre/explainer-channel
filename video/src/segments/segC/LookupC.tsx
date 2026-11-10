import React from 'react';
import {RoundedBox} from '@react-three/drei';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Machine} from '../../three/sets/MachineSet';
import {BRASS, ease, mix, PunchedCard, Studio, Tag} from '../../three/kit';
import {digest, LabelC} from './props';

const passwords = ['123456', 'password', 'qwerty', 'iloveyou', '111111', 'mango@123'];

const WallC: React.FC<{salt?: string; algorithm?: string; hit?: number; file?: number; position?: [number, number, number]; scale?: number}> = ({salt, algorithm = 'sha1', hit = 0, file = 0, position = [0, 0, 0], scale = 1}) => <group position={position} scale={scale}>
  <RoundedBox args={[7.9, 3.8, 1.4]} radius={0.08} position={[0, 2.1, -0.8]} castShadow receiveShadow><meshStandardMaterial color="#5E3B22" roughness={0.65} /></RoundedBox>
  <group position={[0, 4.22, 0]}><LabelC lines={[salt ? `salt: ${salt}` : algorithm === 'sha256' ? 'SHA-256 / UNSALTED' : 'SHA-1 / PRECOMPUTED']} w={5.4} h={0.76} /></group>
  {passwords.map((pw, i) => {
    const hash = digest((salt ?? '') + pw, salt ? 'sha256' : algorithm);
    const x = (i % 3 - 1) * 2.5, y = 3 - Math.floor(i / 3) * 1.65;
    const open = i === 5 ? hit : 0;
    return <group key={pw} position={[x, y, open * 1.0]}>
      <RoundedBox args={[2.35, 1.45, 0.25]} radius={0.04} castShadow><meshStandardMaterial color={open > 0.5 ? '#9C3B2E' : '#7A4E2E'} roughness={0.55} /></RoundedBox>
      <group position={[0, 0.15, 0.15]}><LabelC lines={[hash.slice(0, 8)]} w={2.17} h={0.68} /></group>
      <mesh position={[0, -0.39, 0.16]}><boxGeometry args={[0.6, 0.12, 0.07]} /><meshStandardMaterial color={BRASS} metalness={0.85} roughness={0.25} /></mesh>
      {open > 0.01 ? <group position={[0, mix(0, 1.0, open), 0.35]}><LabelC lines={[pw]} w={2.6} h={0.8} color="#A96B00" /></group> : null}
      {i === 5 && file > 0 && file < 1 ? <group position={[mix(-8, 0, file), mix(0.8, 0, file), mix(2, -0.15, file)]}><PunchedCard hex={hash} w={1.4} title="" /></group> : null}
    </group>;
  })}
</group>;

export const LookupC: React.FC<{action: 'file' | 'search' | 'salt'; duration: number; steps: number[]}> = ({action, duration, steps}) => {
  const frame = useCurrentFrame() - (steps[0] ?? 0);
  const t = frame / Math.max(1, duration - (steps[0] ?? 0));
  const salted = action === 'salt';
  const file = action === 'file' ? ease(t, 0.16, 0.6) : 0;
  const hit = action === 'search' ? ease(t, 0.6, 0.78) : 0;
  const multiply = salted ? ease(t, 0.38, 0.75) : 0;
  const scan = Math.min(5, Math.floor(salted ? (t / 0.36) * 6 : t * 9));
  const scanScale = salted ? 0.72 : 1;
  return <AbsoluteFill>
    <Studio color="#4E3A36" angle={{from: [0, 4.5, salted ? 16.5 : 14.5], to: [0.25, 4.0, salted ? 17.0 : 13.4], target: [action === 'file' ? -1.0 : 0, 2.2, 0], fov: 39}} duration={duration}>
      {action === 'file' ? <group position={[-5.2, 0, 0]} scale={0.8}>
        <Machine largeLabel frame={frame} busy={file < 0.95 ? 0.8 : 0.1} status="SHA-1" />
        <group position={[-3.7, 1.3, 1.0]}><LabelC lines={['mango@123']} w={2.0} h={0.8} color="#A96B00" /></group>
      </group> : null}
      <WallC hit={hit} file={file} algorithm={salted ? 'sha256' : 'sha1'} scale={salted ? 0.72 : 1} position={[action === 'file' ? 1.7 : 0, 0, 0]} />
      {action === 'search' || (salted && t < 0.36) ? <group scale={scanScale} position={[(scan % 3 - 1) * 2.5 * scanScale, (3 - Math.floor(scan / 3) * 1.65) * scanScale, 0.24 * scanScale]}>
        {[-1, 1].map((side) => <React.Fragment key={side}>
          <mesh position={[0, side * 0.75, 0]}><planeGeometry args={[2.4, 0.04]} /><meshBasicMaterial color="#E5BA70" /></mesh>
          <mesh position={[side * 1.2, 0, 0]}><planeGeometry args={[0.04, 1.5]} /><meshBasicMaterial color="#E5BA70" /></mesh>
        </React.Fragment>)}
      </group> : null}
      {salted ? <>
        <group position={[mix(0, -6.6, multiply), 0.15, mix(-1, -2.0, multiply)]} visible={multiply > 0.01}><WallC salt="9f2c4a71" scale={0.8} /></group>
        <group position={[mix(0, 6.6, multiply), 0.15, mix(-1, -2.0, multiply)]} visible={multiply > 0.01}><WallC salt="e05b13d8" scale={0.8} /></group>
        <group position={[0, 5.45, 0]}><LabelC lines={['fb9d0556…', t < 0.36 ? 'SEARCHING UNSALTED TABLE' : 'NO MATCH IN UNSALTED TABLE']} w={7.0} h={1.05} color="#9C3B2E" /></group>
      </> : null}
      {action === 'search' ? <group position={[-2.9, 5.15, 0]}><LabelC lines={['search: f14d5ba7…']} w={4.6} h={0.58} /></group> : null}
    </Studio>
    {salted ? <Tag x={960} y={130} size={40} text="One precomputed table per salt" opacity={multiply} /> : null}
  </AbsoluteFill>;
};
