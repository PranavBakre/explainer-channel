import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Machine} from '../../three/sets/MachineSet';
import {Angle, ease, mix, PaperCard, PunchedCard, Studio} from '../../three/kit';
import {Block, Drawer, RecipeCard, Sign} from './props';

type Props = {duration: number; steps: number[]};

const Dial: React.FC<{value: string; turn: number}> = ({value, turn}) => <group position={[2.9, 1.7, 0.8]}>
  <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.85, 0.85, 0.2, 48]} /><meshStandardMaterial color="#C89B5A" metalness={0.75} roughness={0.3} /></mesh>
  <mesh position={[0, 0, 0.11]}><circleGeometry args={[0.75, 48]} /><meshStandardMaterial color="#EFE7D6" /></mesh>
  <group rotation={[0, 0, 0.6 - turn * 1.8]}><Block at={[0, 0.27, 0.15]} size={[0.07, 0.55, 0.03]} color="#A4412E" /></group>
  <Sign at={[0, -0.3, 0.2]} text={value} w={1.25} h={0.42} light />
  <Sign at={[0, -1.1, 0]} text="COST" w={1.7} h={0.43} />
</group>;

const Memory: React.FC<{frame: number; argon?: boolean}> = ({frame, argon}) => {
  const fill = ease(frame % 110, 0, 80);
  return <group position={[-3.2, 1.5, 0]}>
    <Block at={[0, 0, 0]} size={[2.1, 2.4, 1.3]} color="#394B4D" />
    {Array.from({length: 6}, (_, i) => <group key={i} position={[0, -0.9 + i * 0.36, fill * 0.45]}>
      <Block at={[0, 0, 0.7]} size={[1.8, 0.27, 0.1]} color={fill * 6 > i ? '#4C9B78' : '#182A2D'} />
      <Block at={[0, 0, 0.78]} size={[0.35, 0.05, 0.07]} color="#C89B5A" />
    </group>)}
    <Sign at={[0, 1.55, 0.7]} text={argon ? '19 MiB' : 'MEMORY'} w={2.25} h={0.55} />
  </group>;
};

export const DSlowMachine: React.FC<Props & {mode: 'cost' | 'memory' | 'argon' | 'rehash' | 'final'}> = ({duration, steps, mode}) => {
  const frame = useCurrentFrame();
  const dialAt = steps[1] ?? 50;
  const turn = mode === 'cost' || mode === 'rehash' ? ease(frame, dialAt, dialAt + 90) : 0;
  const argon = ['argon', 'rehash', 'final'].includes(mode);
  const cycle = mode === 'final' ? ease(frame, 110, duration - 30) : ease(frame % 140, 0, 110);
  const isCost = mode === 'cost';
  const costElapsed = Math.max(0, frame - dialAt);
  const gearFrame = isCost ? frame * 3 - (3 - 3 / 32) * (costElapsed > 90 ? costElapsed - 45 : costElapsed ** 2 / 180) : frame * 0.35;
  const label = isCost ? frame >= (steps[2] ?? 351) ? 'BCRYPT · 1999' : 'PASSWORD HASH' : argon ? 'ARGON2id' : 'SCRYPT · 2009';
  const angle: Angle = isCost ? {from: [1, 2.7, 8.4], to: [1, 2.5, 7.9], target: [1, 1.65, 0], fov: 34}
    : {from: [0, 3.2, mode === 'final' ? 15 : 11.5], to: [0, 2.9, mode === 'final' ? 14 : 11], target: [0, 1.65, 0], fov: 34};
  return <Studio color="#2E5663" duration={duration} angle={angle}>
    <Machine largeLabels frame={gearFrame} busy={0.35} heavy={1} label={label} status={argon ? 'SLOW HASH' : isCost ? 'TUNABLE' : 'MEMORY-HARD'} />
    <Dial value={isCost ? turn < 0.5 ? '5' : '10' : mode === 'rehash' ? turn < 0.5 ? 't=2' : 't=3' : argon ? 't=2' : '2¹⁴'} turn={turn} />
    {!isCost ? <Memory frame={mode === 'final' ? frame * 0.28 : frame} argon={argon} /> : null}
    {argon ? <Sign at={[0, 4.4, 0]} text={mode === 'rehash' && turn > 0.5 ? 'm=19456 · t=3 · p=1' : 'm=19456 · t=2 · p=1'} w={5.8} h={0.48} /> : null}
    {mode === 'argon' ? <Sign at={[0, 3.8, 0]} text={frame < 110 ? 'PASS 1 / 2' : 'PASS 2 / 2'} w={3.4} h={0.55} /> : null}
    {mode === 'final' ? <>
      <group position={[-5.25 + cycle * 3.5, 0.9, 1.4]} rotation={[0, cycle * 1.2, 0]} visible={cycle < 0.97}><PaperCard big="mango@123" w={2} h={1} /></group>
      <Sign at={[5.1, 3.9, 0]} text="salt: cE3JU6U6…" w={3.2} h={0.5} />
      <Sign at={[5.1, 3.3, 0]} text="ARGON2id HASH" w={3.2} h={0.5} />
      <group position={[5.1, 2, 0]}><PunchedCard hex="3ebf0c1b2c645d652cfc02c5c90e1afb6212dec923b3ce01a58e1848384b1853" title="" w={2} /></group>
    </> : null}
  </Studio>;
};

export const DRecipe: React.FC<Props & {upgraded?: boolean; refile?: boolean}> = ({duration, upgraded, refile}) => {
  const frame = useCurrentFrame();
  const active = frame < 135 ? -1 : frame < 255 ? 0 : frame < 295 ? 1 : 2;
  return <Studio color="#4E3A36" duration={duration} angle={{from: [0, 3, 10.7], to: [0, 2.9, 10.2], target: [0, 2.2, 0], fov: 34}}>
    <Drawer><group position={[0, refile ? mix(3.45, 2.55, ease(frame, 8, duration - 15)) : 2.95, 0.6]}><RecipeCard active={active} upgraded={upgraded} /></group></Drawer>
  </Studio>;
};

export const DPepper: React.FC<Props> = ({duration}) => {
  const frame = useCurrentFrame();
  const steal = ease(frame, duration * 0.45, duration * 0.83);
  return <Studio color="#4E3A36" duration={duration} angle={{from: [0, 4.6, 16], to: [0, 4.2, 15], target: [0, 1.5, 0], fov: 34}}>
    <group position={[-1.8, 0, 0]} scale={0.65}><Drawer labelScale={1.4}><group position={[0, 2.8, 0]}><PaperCard big="$argon2id$…" w={6.4} h={2.8} /></group></Drawer></group>
    {steal > 0.001 ? <group position={[-1.8 + steal * 4.7, 0, steal * 0.6]} scale={0.65}><Drawer labelScale={1.4}><group position={[0, 2.8, 0]}><PaperCard big="$argon2id$…" w={6.4} h={2.8} /></group></Drawer></group> : null}
    <group position={[-5.2, 1.45, 0.1]}>
      <Block at={[0, 0, 0]} size={[2, 2.8, 1.7]} color="#243C40" />
      <Block at={[0, 0, 0.89]} size={[1.7, 2.45, 0.12]} color="#36575B" />
      <mesh position={[0.35, -0.35, 1]}><torusGeometry args={[0.25, 0.045, 8, 24]} /><meshStandardMaterial color="#C89B5A" metalness={0.8} /></mesh>
      <Sign at={[0, 0.75, 1]} text="PEPPER" w={1.7} h={0.5} />
    </group>
    <Sign at={[-3.8, 3.6, 0]} text="SECRET VAULT · OUTSIDE THE DATABASE" w={6.5} h={0.5} />
  </Studio>;
};

export const DRehash: React.FC<Props> = ({duration}) => <AbsoluteFill>
  <Sequence durationInFrames={150}><DSlowMachine duration={150} steps={[0]} mode="rehash" /></Sequence>
  <Sequence from={150}><DRecipe duration={duration - 150} steps={[0]} upgraded refile /></Sequence>
</AbsoluteFill>;
