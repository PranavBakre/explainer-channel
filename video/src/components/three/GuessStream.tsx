import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';
import {colors, enter, fonts, rise} from '../../theme';
import {Label, ShotProps, stepAt} from '../base';

type Phase = {label: string; rate: string; perFrame: number; step: number; offset?: number; sub?: string};

const TRAVEL = 70;
const MAX = 900;
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Spawn frames are derived from the phase schedule alone, so any frame can be rendered independently.
const spawnFrames = (phases: {from: number; perFrame: number}[], until: number) => {
  const out: number[] = [];
  phases.forEach((p, k) => {
    const end = Math.min(phases[k + 1]?.from ?? until, until);
    if (p.perFrame <= 0 || !Number.isFinite(p.from)) return;
    for (let f = p.from; f < end; f += 1 / p.perFrame) out.push(f);
  });
  return out;
};

const Swarm: React.FC<{spawns: number[]; frame: number}> = ({spawns, frame}) => {
  const cards = useRef<THREE.InstancedMesh>(null);
  const prints = useRef<THREE.InstancedMesh>(null);
  const m = useMemo(() => new THREE.Object3D(), []);
  useLayoutEffect(() => {
    let a = 0;
    let b = 0;
    for (let i = spawns.length - 1; i >= 0; i--) {
      const age = frame - spawns[i];
      if (age < 0) continue;
      if (age > TRAVEL * 2) break;
      const ly = 0.9 + (rand(i, 1) - 0.5) * 3.2;
      const lz = (rand(i, 2) - 0.5) * 2.4;
      if (age < TRAVEL && a < MAX) {
        const t = age / TRAVEL;
        const funnel = 1 - t * t;
        m.position.set(-11 + 10.2 * t, 0.9 + (ly - 0.9) * funnel, lz * funnel);
        m.rotation.set(rand(i, 3) * 6 + t * 4, rand(i, 4) * 6 + t * 3, 0);
        m.scale.setScalar(1);
        m.updateMatrix();
        cards.current!.setMatrixAt(a++, m.matrix);
      } else if (age >= TRAVEL && b < MAX) {
        const t = (age - TRAVEL) / TRAVEL;
        const spread = Math.sqrt(t);
        m.position.set(0.8 + 10.5 * t, 0.9 + (ly - 0.9) * spread * 0.9, lz * spread * 0.9);
        m.rotation.set(0, 0, 0);
        m.scale.setScalar(1);
        m.updateMatrix();
        prints.current!.setMatrixAt(b++, m.matrix);
      }
    }
    cards.current!.count = a;
    prints.current!.count = b;
    cards.current!.instanceMatrix.needsUpdate = true;
    prints.current!.instanceMatrix.needsUpdate = true;
  }, [frame, spawns, m]);
  return (
    <>
      <instancedMesh ref={cards} args={[undefined, undefined, MAX]}>
        <boxGeometry args={[0.46, 0.3, 0.04]} />
        <meshStandardMaterial color={colors.amber} emissive={colors.amber} emissiveIntensity={0.25} flatShading />
      </instancedMesh>
      <instancedMesh ref={prints} args={[undefined, undefined, MAX]}>
        <boxGeometry args={[0.26, 0.26, 0.02]} />
        <meshStandardMaterial color={colors.slate} flatShading />
      </instancedMesh>
    </>
  );
};

const Machine: React.FC<{frame: number; heat: number}> = ({frame, heat}) => (
  <group position={[0, 0.9, 0]} rotation={[0.12, -0.35, 0]}>
    <mesh>
      <boxGeometry args={[2.2, 3.4, 2.6]} />
      <meshStandardMaterial color="#3A4656" roughness={0.55} metalness={0.2} flatShading />
    </mesh>
    <mesh position={[0, 0, 1.31]}>
      <boxGeometry args={[1.7, 0.18, 0.02]} />
      <meshStandardMaterial color={colors.amber} emissive={colors.amber} emissiveIntensity={0.4 + heat * 1.6} />
    </mesh>
    {[-0.9, 0, 0.9].map((y, k) => (
      <mesh key={k} position={[0, y - 0.05, 1.32]} rotation={[0, 0, frame * (0.05 + heat * 0.25) * (k % 2 ? -1 : 1)]}>
        <torusGeometry args={[0.28, 0.06, 6, 12]} />
        <meshStandardMaterial color={colors.slate} flatShading />
      </mesh>
    ))}
  </group>
);

// S12: guesses pour through one graphics card; density follows the benchmark rate of the active hash.
export const GuessStream: React.FC<ShotProps<{title: string; phases: Phase[]; note?: string}>> = ({title, phases, note, steps}) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const sched = useMemo(
    () => phases.map((p) => ({...p, from: stepAt(steps, p.step) + (p.offset ?? 0)})),
    [phases, steps],
  );
  const spawns = useMemo(() => spawnFrames(sched, durationInFrames), [sched, durationInFrames]);
  const active = [...sched].reverse().find((p) => frame >= p.from);
  const heat = active ? Math.min(1, active.perFrame / 4) : 0;
  const camX = interpolate(frame, [0, 240], [-1.2, 0.6], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} camera={{position: [camX, 2.4, 15], fov: 34}}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 8, 6]} intensity={1.6} />
        <directionalLight position={[-6, -2, -4]} intensity={0.5} color={colors.amber} />
        <Machine frame={frame} heat={heat} />
        <Swarm spawns={spawns} frame={frame} />
      </ThreeCanvas>
      <AbsoluteFill style={{padding: '90px 160px', alignItems: 'center', fontFamily: fonts.sans, color: colors.cream}}>
        <div style={{...rise(frame, stepAt(steps, 0)), fontFamily: fonts.mono, fontSize: 44, color: colors.amber}}>{title}</div>
      </AbsoluteFill>
      {sched.map((p, k) => {
        const next = sched[k + 1]?.from ?? Number.POSITIVE_INFINITY;
        const o = enter(frame, p.from) * (1 - enter(frame, next, 9));
        if (o <= 0) return null;
        return (
          <AbsoluteFill key={k} style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 175, opacity: o}}>
            <Label>{p.label}</Label>
            <div style={{fontFamily: fonts.serif, fontSize: 92, color: p.perFrame < 0.5 ? colors.teal : colors.red, lineHeight: 1.1}}>{p.rate}</div>
            {p.sub ? <div style={{fontFamily: fonts.sans, fontSize: 32, color: colors.cream, marginTop: 6}}>{p.sub}</div> : null}
          </AbsoluteFill>
        );
      })}
      {note ? (
        <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 160, opacity: enter(frame, stepAt(steps, 1) + 30)}}>
          <div style={{fontFamily: fonts.sans, fontSize: 26, color: colors.slate}}>{note}</div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
