import React from 'react';
import {AbsoluteFill, Easing, interpolate, interpolateColors, useCurrentFrame} from 'remotion';
import {RoundedBox} from '@react-three/drei';
import {Oak, Painted} from '../../three/finish';
import {CatalogDrawer, LookupCabinet} from '../../three/sets/CatalogSet';
import {EncryptionBox, Key} from '../../three/sets/LockboxSet';
import {Machine} from '../../three/sets/MachineSet';
import {ComparisonTable} from '../../three/sets/LightTableSet';
import {clamp, ease, mix, PaperCard, Plate, PunchedCard, Studio, V3} from '../../three/kit';

const HASH = '324ce3f954f77c01e68347a9e85134bc81b2455b7a852fa022ea6c4b0efea9a8';

type Props = {steps: number[]; duration: number};

export const ERecap: React.FC<Props> = ({steps, duration}) => {
  const f = useCurrentFrame();
  const second = steps.length === 3 ? steps[1] : 226;
  const common = steps.length === 3 ? steps[2] : 535;
  const phase = f < 86 ? 0 : f < second ? 1 : f < second + 100 ? 2 : f < second + 205 ? 3 : 4;
  const stops = [0, 60, 115, second - 12, second + 38, second + 98, second + 145, second + 192, second + 220, common - 12, common + 45, duration];
  const motion = {...clamp, easing: Easing.inOut(Easing.cubic)};
  const x = interpolate(f, stops, [-10, -10, -5, -5, 3.2, 3.2, 8.8, 8.8, 5, 5, 3.8, 5], motion);
  const z = interpolate(f, stops, [11, 11, 10.5, 10.5, 13, 13, 13.5, 13.5, 12, 12, 12.7, 12.7], motion);
  const y = interpolate(f, stops, [1.6, 1.6, 1.5, 1.5, 1.6, 1.6, 0.9, 0.9, 1.8, 1.8, 1.8, 1.8], motion);
  const color = interpolateColors(f, stops, ['#4E3A36', '#4E3A36', '#4E3A36', '#4E3A36', '#2E5663', '#2E5663', '#2B4F5C', '#2B4F5C', '#2E5663', '#2E5663', '#2E5663', '#2E5663']);
  const target: V3 = [x, y, 0];
  const first = ease(f, common + 125, common + 210);
  const turn = ease(first, 0, 0.3);
  const feed = ease(first, 0.25, 1);
  const commonShot = f >= common;
  const salted = phase >= 3;
  return (
    <Studio color={color} unreflectedLabels angle={{from: [x + 0.4, 4.8, z], target, fov: 34}} duration={duration}>
      {[-10, -5, 5, 11].map((station) => <pointLight key={station} position={[station, 6, 4]} intensity={60} distance={13} color="#FFE2C0" />)}
      <group position={[-10, 0, 0]}>
        <CatalogDrawer field="plain" lift={0.4} />
      </group>
      <group position={[-5, 0, 0]}>
        <EncryptionBox open={ease(f, 100, 145)} cipher="Y5DCWKxs…" card={{text: 'mango@123', rise: ease(f, 135, 175), red: true}} />
        <Key position={[-0.35, 0.85, 1.05]} rotation={[ease(f, 105, 125) * Math.PI / 2, 0, 0]} scale={0.8} />
      </group>
      <group position={[1, 0, -1.5]} scale={0.65}>
        <LookupCabinet hit={ease(f, second + 20, second + 70)} columns={4} rows={3} hitIndex={5} />
      </group>
      <Machine position={[5, 0, 0]} frame={f * 0.25} busy={phase >= 2 ? 0.55 : 0} heavy={phase >= 4 ? 1 : 0} status={phase >= 4 ? 'ARGON2ID' : salted ? 'SHA-256 + SALT' : 'SHA-1'} />
      <group position={[9.2, 0, -1.3]} scale={0.7}>
        <ComparisonTable hex={HASH} slide={ease(f, second + 150, second + 205)} />
      </group>
      {phase === 3 ? (
        <group position={[12.4, 1.0, 1.2]}>
          <RoundedBox args={[2.8, 1.8, 0.3]} radius={0.07} position={[0, 0.2, 0]} castShadow><Painted color="#3A444C" /></RoundedBox>
          {[-0.72, 0.72].map((cx) => (
            <group key={cx} position={[cx, 0.35, 0.18]} rotation={[0, 0, f * 0.2]}>
              <mesh><torusGeometry args={[0.43, 0.05, 12, 32]} /><meshStandardMaterial color="#8A959E" metalness={0.8} /></mesh>
              {[0, 1, 2, 3, 4, 5].map((blade) => <mesh key={blade} rotation={[0, 0, blade * Math.PI / 3]}><boxGeometry args={[0.75, 0.1, 0.07]} /><meshStandardMaterial color="#47545E" /></mesh>)}
            </group>
          ))}
          <group position={[0, -0.45, 0.24]}><Plate text="GRAPHICS CARD" w={2.5} h={0.35} reflect={false} /></group>
        </group>
      ) : null}
      {salted && !commonShot ? (
        <group position={[2.3, 1.6, 1.0]}>
          <PaperCard big="mango@123" label="password" w={1.9} />
          <group position={[0, 0.65, 0.03]}><Plate text="e05b13d8" w={1.2} h={0.3} /></group>
        </group>
      ) : null}
      {commonShot ? (
        <>
          {['123456', 'password', 'qwerty'].map((pw, i) => (
            <group key={pw} position={[mix(1.4, 4.5, i === 0 ? feed : 0), mix(1.2, 1.15, i === 0 ? turn : 0) - i * 0.12, mix(1.3, 0.3, i === 0 ? turn : 0) - i * 0.3]} rotation={[mix(-0.12, -Math.PI / 2, i === 0 ? turn : 0), 0, 0]}>
              <PaperCard big={pw} label={i === 0 ? 'FIRST GUESS' : 'NEXT GUESSES'} w={1.9} />
            </group>
          ))}
          {first > 0.95 ? <group position={[5, 3.7, 0.2]}><Plate text="123456 · FIRST GUESS" w={3.5} h={0.5} /></group> : null}
        </>
      ) : null}
      {phase === 2 ? <group position={[3.0, 1.3, 0.9]}><PunchedCard hex="f14d5ba7f5892b8cb2549dea72287ee3692bb297" w={1.5} title="SHA-1" /></group> : null}
      {phase === 3 ? <group position={[7.3, 1.35, 0.9]}><PunchedCard hex={HASH} w={1.5} title="SALTED SHA-256" /></group> : null}
    </Studio>
  );
};

export const EDrawerClose: React.FC<Props> = ({steps, duration}) => {
  const f = useCurrentFrame();
  const last = steps.length === 2 ? steps[1] : 268;
  const close = ease(f, last + 60, duration - 80);
  return (
    <AbsoluteFill>
      <Studio color="#4E3A36" angle={{from: [0.8, 4.7, 12.0], to: [0.5, 4.0, 11.4], target: [0, 1.8, 0.8], fov: 34}} duration={duration}>
        <group position={[0, 0, mix(1.4, -2.3, close)]}>
          <CatalogDrawer field="argon2id" lift={0.25} />
          <group position={[0, mix(3.5, 1.3, close), 1.1]} rotation={[-0.12, 0, 0]}>
            <PaperCard big="Argon2id" label="SALTED · HASHED · SLOW" w={2.6} h={1.9} />
          </group>
          <group position={[0, 0.62, 1.78]}><Plate text="USERS" w={0.95} h={0.35} /></group>
        </group>
        {[-1, 1].map((side) => <mesh key={side} position={[side * 1.4, 1.4, -1.7]} castShadow><boxGeometry args={[0.3, 2.8, 4]} /><Oak repeat={[2, 1]} tint="#7E5636" /></mesh>)}
        <mesh position={[0, 2.75, -1.7]} castShadow><boxGeometry args={[3.1, 0.25, 4]} /><Oak repeat={[2, 1]} tint="#7E5636" /></mesh>
        <mesh position={[0, 1.4, -3.7]}><boxGeometry args={[3.1, 2.8, 0.2]} /><Oak repeat={[2, 1]} tint="#7E5636" /></mesh>
      </Studio>
      <AbsoluteFill style={{background: '#080C0C', opacity: 0.82 * ease(f, duration - 75, duration - 1)}} />
    </AbsoluteFill>
  );
};
