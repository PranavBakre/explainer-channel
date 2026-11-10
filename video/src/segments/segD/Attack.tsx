import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {MachineSet} from '../../three/sets/MachineSet';
import {LightTableSet} from '../../three/sets/LightTableSet';
import {ease, mix, PaperCard, Studio} from '../../three/kit';
import {Block, SHA, Sign} from './props';
import guesses from './guesses.json';

type ShotProps = {duration: number; steps: number[]};

const SaltFeed: React.FC<{duration: number; fast?: boolean}> = ({duration, fast}) => {
  return <AbsoluteFill>
    <MachineSet angle="attack" largeLabels action="loop" input="mango@123" hex={SHA} salt="e05b13d8" duration={duration} guesses={fast ? Array.from({length: 16}, (_, i) => guesses[i % 4].input) : guesses.slice(0, 2).map((x) => x.input)} />
  </AbsoluteFill>;
};

export const DAttack: React.FC<ShotProps & {mode?: 'salt' | 'loop' | 'fast'}> = ({duration, mode = 'salt'}) => {
  if (mode !== 'loop') return <SaltFeed duration={duration} fast={mode === 'fast'} />;
  const machineFrames = Math.round(duration * 0.46);
  const compareFrames = Math.floor((duration - machineFrames) / 2);
  return <AbsoluteFill>
    <Sequence durationInFrames={machineFrames}><SaltFeed duration={machineFrames} /></Sequence>
    {[0, 1].map((i) => <Sequence key={i} from={machineFrames + i * compareFrames} durationInFrames={i === 1 ? duration - machineFrames - compareFrames : compareFrames}>
      <LightTableSet action="diff" duration={compareFrames} a={{label: 'STOLEN HASH', hex: SHA}} b={{label: guesses[i].input, hex: guesses[i].hex}} count="No match → next guess" />
    </Sequence>)}
  </AbsoluteFill>;
};

export const DHeap: React.FC<ShotProps> = ({duration, steps}) => {
  const frame = useCurrentFrame();
  const split = ease(frame, 25, 110);
  const feedAt = steps[1] ?? 267;
  const feed = ease(frame, feedAt + 15, feedAt + 100);
  return <Studio color="#4A4542" duration={duration} angle={{from: [0, 6.2, 14], to: [0, 5.7, 13.3], target: [0, 1.1, 0], fov: 35}}>
    <Block at={[-2.9, 0.35, 0]} size={[5.2, 0.6, 3.8]} />
    <Block at={[2.9, 0.35, 0]} size={[5.2, 0.6, 3.8]} />
    {Array.from({length: 100}, (_, i) => {
      const side = i < 50 ? -1 : 1;
      const k = i % 50;
      const column = k % 5;
      const row = Math.floor(k / 5) % 2;
      const level = Math.floor(k / 10);
      const x = side * 2.9 + (column - 2) * 0.86;
      const moving = side === -1 && k < 10 ? feed : 0;
      return <group key={i} position={[mix((column - 2) * 0.8, x, split) + moving * 2.9, 0.8 + level * 0.12 + (side === 1 ? (1 - split) * 0.6 : 0) + moving * 0.8, (row - 0.5) * 1.4 - moving * 3]} rotation={[-Math.PI / 2, 0, (i % 7 - 3) * 0.04]}>
        <Block at={[0, 0, 0]} size={[0.8, 1.1, 0.025]} color="#EFE7D6" />
      </group>;
    })}
    <Sign at={[-2.9, 0.4, 1.95]} text="~50% · NAMES / WORDS / PATTERNS" w={5} h={0.65} />
    <Sign at={[2.9, 0.4, 1.95]} text="~50% · OTHER CHOICES" w={5} h={0.65} />
    <Sign at={[0, frame >= feedAt ? 4.75 : 3.1, -0.5]} text={frame >= feedAt ? 'LIKELY GUESSES FIRST' : 'ROCKYOU · IMPERVA'} w={7} h={0.65} />
    {frame >= feedAt ? <group position={[0, 1.6, -2.7]}>
      <Block at={[0, 0, 0]} size={[3.2, 1.7, 0.5]} color="#B5703C" />
      <Block at={[0, 0, 0.27]} size={[2.5, 0.15, 0.05]} color="#11171A" />
      <Sign at={[0, 2.3, 0.3]} text="#1 · 290,731 accounts" w={4.2} h={0.5} />
      <group position={[0, mix(1.2, 0, feed), mix(0.3, 0.05, feed)]} rotation={[-feed * Math.PI / 2, 0, 0]} visible={feed < 0.98}><PaperCard big="123456" w={3.2} h={1.5} /></group>
    </group> : null}
  </Studio>;
};
