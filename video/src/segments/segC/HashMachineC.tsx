import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Machine} from '../../three/sets/MachineSet';
import {ease, mix, PunchedCard, Studio, Tag} from '../../three/kit';
import {digest, LabelC, SaltChipC} from './props';

type Action = 'reveal' | 'fixed' | 'punch' | 'reverse' | 'login' | 'repeat' | 'clip' | 'salt';

export const HashMachineC: React.FC<{action: Action; steps: number[]; duration: number}> = ({action, steps, duration}) => {
  const frame = useCurrentFrame() - (steps[0] ?? 0);
  const t = frame / Math.max(1, duration - (steps[0] ?? 0));
  const fixed = action === 'fixed';
  const repeat = action === 'repeat';
  const reverse = action === 'reverse';
  const salted = action === 'salt' || action === 'clip';
  const inputs = fixed ? ['a', 'mango@123', 'Any text becomes a fixed-length fingerprint.'] : repeat ? ['mango@123', 'mango@123'] : ['mango@123'];
  const cycle = Math.min(inputs.length - 1, Math.floor(t * inputs.length));
  const local = t * inputs.length - cycle;
  const feeding = ['fixed', 'login', 'repeat', 'salt'].includes(action);
  const feed = feeding ? ease(local, 0.08, 0.35) : action === 'punch' ? ease(t, 0.01, 0.09) : 0;
  const out = action === 'reveal' || action === 'clip' ? 0 : feeding ? ease(local, 0.42, 0.62) : reverse ? 1 - ease(t, 0.08, 0.34) * 0.55 + ease(t, 0.38, 0.48) * 0.55 : ease(t, 0.08, 0.26);
  const attack = reverse && t > 0.48;
  const attackFeed = ease(t, 0.5, 0.68);
  const salt = '9f2c4a71';
  const hex = digest(salted ? salt + 'mango@123' : inputs[cycle], repeat ? 'sha1' : 'sha256');
  const busy = feeding && local > 0.3 && local < 0.6 ? 1 : reverse && t < 0.48 ? 0.5 : 0.1;
  const inputX = reverse ? mix(-3.85, -1.85, attackFeed) : mix(repeat ? -4.2 : -3.85, repeat ? -2.45 : -1.85, feed);
  return <AbsoluteFill>
    <Studio color="#2E5663" angle={{from: [0, 3.6, 13.6], to: [0.15, 3.2, 12.8], target: [0, 1.6, 0], fov: 36}} duration={duration}>
      <Machine largeLabel position={fixed || repeat ? [-0.6, 0, 0] : [0, 0, 0]} frame={frame} busy={busy} status={reverse && !attack ? 'TRY A GUESS' : repeat ? 'SHA-1' : 'SHA-256'} lamp={reverse && !attack ? '#E0452F' : '#FFB224'} />
      {fixed ? inputs.map((value, i) => <group key={value} position={[-4.2, [3.25, 2.4, 1.05][i], 0.5]}>
        <LabelC lines={i === 2 ? ['Any text becomes', 'a fixed-length', 'fingerprint.'] : [value]} w={2.65} h={i === 2 ? 1.45 : 0.6} color="#A96B00" />
      </group>) : null}
      {!fixed && (!reverse || attack) && (reverse ? attackFeed < 0.98 : feed < 0.98) ? <group position={[inputX, 1.4, 0.5]} scale={[Math.max(0.01, 1 - (reverse ? attackFeed : feed) * 0.85), 1, 1]}>
        <LabelC lines={[inputs[cycle]]} w={2.65} h={0.9} color="#A96B00" />
        {salted ? <group position={[0, mix(1.05, 0.65, ease(t, 0.05, 0.7)), 0.06]}><SaltChipC salt={salt} /></group> : null}
      </group> : null}
      {inputs.map((value, i) => {
        const completed = feeding && i < cycle;
        if (!fixed && !completed && (i !== cycle || out <= 0)) return null;
        const p = fixed ? ease(frame, 12 + i * 15, 28 + i * 15) : completed ? 1 : out;
        if (p <= 0.01) return null;
        const x = mix(fixed ? 1.1 : 1.65, fixed ? 2.35 + i * 1.8 : repeat ? 2.85 + i * 2.35 : 3.85, p);
        return <group key={i} position={[x, 1.6, 0.65]} rotation={[0, mix(-Math.PI / 2, -0.08, p), 0]}>
          <PunchedCard titleScale={fixed ? 3.4 : repeat ? 2.5 : 2.2} hex={fixed || completed ? digest(value, repeat ? 'sha1' : 'sha256') : hex} w={fixed ? 1.55 : repeat ? 2.05 : 2.35} title={fixed ? '256 BITS' : repeat ? 'SHA-1' : 'SHA-256 / 256 BITS'} />
        </group>;
      })}
      {action === 'punch' && t > 0.28 ? <group position={[3.85, 3.65, 0.7]}><LabelC lines={hex.match(/.{16}/g)!} w={4.3} h={1.1} /></group> : null}
      {fixed ? <group position={[3.75, 3.5, 0.7]}><LabelC lines={['256 BITS EACH']} w={3.2} h={0.55} /></group> : null}
    </Studio>
    {reverse ? <Tag x={960} y={140} size={46} text={t < 0.48 ? 'No practical reverse operation' : 'Guess → hash → compare'} /> : null}
    {salted ? <Tag x={580} y={155} size={32} text="Illustrative salt · 32 bits" color="#F2D9A8" /> : null}
  </AbsoluteFill>;
};
