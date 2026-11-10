import React from 'react';
import {RoundedBox} from '@react-three/drei';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BRASS, ease, mix, Studio, V3} from '../../three/kit';
import {digest, LabelC} from './props';

type Field = 'sha256' | 'sha1' | 'salted';
const users = [['asha@mail.com', 'sunshine1'], ['ravi@mail.com', '123456'], ['meera@mail.com', 'qwerty'], ['dev@mail.com', 'iloveyou'], ['sam@mail.com', 'football'], ['you@mail.com', 'mango@123']];

const DrawerC: React.FC<{field: Field; position: V3}> = ({field, position}) => <group position={position}>
  <RoundedBox args={[3.8, 0.9, 3.8]} radius={0.06} position={[0, 0.95, 0]} castShadow receiveShadow><meshStandardMaterial color="#7A4E2E" roughness={0.55} /></RoundedBox>
  <mesh position={[0, 0.9, 1.92]}><boxGeometry args={[0.8, 0.16, 0.08]} /><meshStandardMaterial color={BRASS} metalness={0.85} roughness={0.25} /></mesh>
  <group position={[0, 1.22, 1.96]}><LabelC lines={['USERS']} w={1.8} h={0.36} /></group>
  {(field === 'salted' ? [['asha@mail.com', 'mango@123'], ['you@mail.com', 'mango@123']] : users).map(([email, pw], i, all) => {
    const isYou = email === 'you@mail.com';
    const salt = isYou ? 'e05b13d8' : '9f2c4a71';
    const hash = digest(field === 'salted' ? salt + pw : pw, field === 'sha1' ? 'sha1' : 'sha256');
    const lines = field === 'salted' ? [email, `salt: ${salt}`, `${hash.slice(0, 16)}…`] : [email, field === 'sha1' ? 'SHA-1 / UNSALTED' : 'SHA-256', `${hash.slice(0, 16)}…`];
    return <group key={email} position={[0, isYou ? 2.3 : 1.95, -1.2 + (i / (all.length - 1)) * 2.7]} rotation={[-0.06, 0, 0]}>
      <LabelC lines={lines} w={3.4} h={1.8} />
    </group>;
  })}
</group>;

export const UsersDrawerC: React.FC<{field: Field; copy?: boolean; duration: number; steps: number[]}> = ({field, copy = false, duration, steps}) => {
  const frame = useCurrentFrame() - (steps[0] ?? 0);
  const p = copy ? ease(frame, duration * 0.12, duration * 0.72) : 0;
  return <AbsoluteFill><Studio color="#4E3A36" angle={{from: copy ? [1.5, 4.9, 15.5] : [0.3, 3.8, 9.8], to: copy ? [1.8, 4.6, 14.4] : [0.15, 3.55, 9.0], target: [copy ? 1.9 : 0, 1.85, 0.6], fov: 35}} duration={duration}>
    <DrawerC field={field} position={[copy ? -1.2 : 0, 0, 0]} />
    {copy && p > 0 ? <DrawerC field={field} position={[mix(-1.2, 4.2, p), 0, mix(0, 0.6, p)]} /> : null}
  </Studio></AbsoluteFill>;
};
