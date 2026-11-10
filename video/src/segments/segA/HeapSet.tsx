import React, {useLayoutEffect, useMemo, useRef} from 'react';
import * as THREE from 'three';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {fonts} from '../../theme';
import {Angle, clamp, ease, Glow, Studio, Tag, useCanvasTexture} from '../../three/kit';

const ANGLES: Record<string, Angle> = {
  wide: {from: [2.0, 2.9, 4.1], to: [1.55, 2.55, 3.5], target: [-0.1, 0.3, 0]},
};

const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const R = 0.92;
const HEIGHT = 0.62;
const CX = -1.05;
const CZ = 0;

// Index cards lying flat, each carrying the same password, piled to the count.
const Pile: React.FC<{tex: THREE.Texture; total: number; duration: number}> = ({tex, total, duration}) => {
  const frame = useCurrentFrame();
  const ref = useRef<THREE.InstancedMesh>(null);
  const cards = useMemo(() => {
    const r = rng(7);
    return Array.from({length: total}, () => {
      const a = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * R;
      const h = (1 - (rad / R) ** 2) * HEIGHT * (0.7 + r() * 0.4);
      return {x: CX + Math.cos(a) * rad, z: CZ + Math.sin(a) * rad, h, yaw: r() * Math.PI * 2, tilt: (r() - 0.5) * 0.2};
    });
  }, [total]);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    const build = Math.min(46, duration * 0.5);
    cards.forEach((c, i) => {
      const k = ease(frame, (c.h / HEIGHT) * build, (c.h / HEIGHT) * build + 20);
      o.position.set(c.x, 0.026 + (c.h - 0.02) * k, c.z);
      o.rotation.set(c.tilt, c.yaw, c.tilt * 0.6);
      o.updateMatrix();
      ref.current!.setMatrixAt(i, o.matrix);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [cards, frame, duration]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, total]} castShadow receiveShadow>
      <boxGeometry args={[0.27, 0.012, 0.34]} />
      {[0, 1, 3, 4, 5].map((i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} color="#E6DCC8" roughness={0.9} />
      ))}
      <meshStandardMaterial attach="material-2" map={tex} roughness={0.92} />
    </instancedMesh>
  );
};

// A heap of one password against a single account: reuse as physical mass.
export const HeapSet: React.FC<{big: string; count: number; perCard: number; duration: number; steps?: number[]}> = ({
  big,
  count,
  perCard,
  duration,
}) => {
  const frame = useCurrentFrame();
  const total = Math.max(1, Math.round(count / perCard));
  const tex = useCanvasTexture(
    256,
    320,
    (c, W, H) => {
      c.fillStyle = '#EFE7D6';
      c.fillRect(0, 0, W, H);
      c.strokeStyle = 'rgba(120,100,70,0.35)';
      c.lineWidth = 4;
      c.strokeRect(10, 10, W - 20, H - 20);
      c.fillStyle = '#B87400';
      let size = 74;
      c.font = `700 ${size}px ${fonts.mono}`;
      while (c.measureText(big).width > W - 60 && size > 12) {
        size -= 2;
        c.font = `700 ${size}px ${fonts.mono}`;
      }
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(big, W / 2, H / 2);
    },
    [big],
  );
  const inK = ease(frame, 10, 34);
  return (
    <AbsoluteFill>
      <Studio color="#2E3A3E" angle={ANGLES.wide} duration={duration}>
        <mesh position={[0.1, -0.07, -0.2]} receiveShadow castShadow>
          <boxGeometry args={[7.0, 0.18, 4.4]} />
          <meshStandardMaterial color="#3A4448" roughness={0.72} metalness={0.08} />
        </mesh>
        <Pile tex={tex} total={total} duration={duration} />
        <group position={[1.45, 0.19, -0.25]} rotation={[0, 0.3, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.27, 0.34, 0.012]} />
            {[0, 1, 2, 3, 5].map((i) => (
              <meshStandardMaterial key={i} attach={`material-${i}`} color="#E6DCC8" roughness={0.9} />
            ))}
            <meshStandardMaterial attach="material-4" map={tex} roughness={0.92} />
          </mesh>
        </group>
        <Glow position={[1.45, 0.35, -0.25]} size={1.5} opacity={0.22 * inK} color="255,238,200" />
      </Studio>
      <Tag x={680} y={130} text={`${count.toLocaleString('en-US')} accounts`} size={44} opacity={inK} />
      <Tag x={1595} y={540} text="1 account" size={44} opacity={interpolate(inK, [0.4, 1], [0, 1], clamp)} />
    </AbsoluteFill>
  );
};
