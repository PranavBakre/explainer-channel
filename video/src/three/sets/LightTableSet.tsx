import React, {useMemo} from 'react';
import {RoundedBox} from '@react-three/drei';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {hexBits} from '../../components/fingerprint';
import {Angle, clamp, ease, Glow, mix, PaperCard, PunchedCard, Studio, Tag} from '../kit';

const ANGLES: Record<string, Angle> = {
  wide: {from: [0, 4.4, 6.4], to: [0, 4.1, 5.8], target: [0, 0.6, 0.2]},
  close: {from: [0.6, 3.6, 4.6], to: [0.3, 3.3, 4.0], target: [0, 0.75, 0]},
  top: {from: [0, 7.4, 2.2], to: [0, 6.8, 1.8], target: [0, 0.75, 0]},
};

// Two punched cards on a backlit table: shown apart, then laid over each other.
export const LightTableSet: React.FC<{
  action: 'pair' | 'diff' | 'match';
  angle?: string;
  a: {label: string; hex: string; input?: string};
  b: {label: string; hex: string; input?: string};
  count?: string;
  duration: number;
}> = ({action, angle = 'wide', a, b, count, duration}) => {
  const frame = useCurrentFrame();
  const t = frame / Math.max(1, duration);
  const diff = useMemo(() => {
    const A = hexBits(a.hex);
    const B = hexBits(b.hex);
    return A.map((x, i) => x !== B[i]);
  }, [a.hex, b.hex]);
  const slide = action === 'pair' ? 0 : ease(t, 0.05, 0.4);
  const reveal = action === 'pair' ? 0 : interpolate(t, [0.4, 0.5], [0, 1], clamp);
  const lampColor = action === 'match' ? '61,220,151' : '224,69,47';
  return (
    <AbsoluteFill>
      <Studio color="#2B4F5C" angle={ANGLES[angle] ?? ANGLES.wide} duration={duration}>
        <RoundedBox args={[6.4, 0.5, 3.6]} radius={0.08} position={[0, 0.25, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#5A4636" metalness={0.3} roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.9, 3.1]} />
          <meshStandardMaterial color="#FFF6E2" emissive="#FFF1D0" emissiveIntensity={0.45} />
        </mesh>
        <group position={[mix(-1.55, 0, slide), 0.53, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <PunchedCard hex={a.hex} w={2.4} title={a.label} />
        </group>
        <group position={[mix(1.55, 0, slide), 0.56 + slide * 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {reveal > 0.5 ? (
            <PunchedCard hex={b.hex} w={2.4} title={action === 'match' ? 'MATCH' : 'DIFFERENCE'} mark={action === 'diff' ? diff : undefined} tint={action === 'match' ? '#DDF5E8' : undefined} />
          ) : (
            <PunchedCard hex={b.hex} w={2.4} title={b.label} />
          )}
        </group>
        {a.input ? (
          <group position={[-1.55, 0.6, 2.4]} rotation={[-Math.PI / 2.6, 0, 0]} visible={slide < 0.05}>
            <PaperCard big={a.input} w={1.3} h={0.6} />
          </group>
        ) : null}
        {b.input ? (
          <group position={[1.55, 0.6, 2.4]} rotation={[-Math.PI / 2.6, 0, 0]} visible={slide < 0.05}>
            <PaperCard big={b.input} w={1.3} h={0.6} />
          </group>
        ) : null}
        <Glow position={[0, 2.4, -1.6]} size={3 * reveal} opacity={0.18 * reveal} color={lampColor} />
      </Studio>
      {count ? <Tag x={960} y={110} text={count} size={64} color={action === 'match' ? '#3DDC97' : '#FF5A4E'} opacity={reveal} /> : null}
    </AbsoluteFill>
  );
};

export const ComparisonTable: React.FC<{hex: string; slide: number}> = ({hex, slide}) => (
  <group>
    <RoundedBox args={[6.4, 0.5, 3.6]} radius={0.08} position={[0, 0.25, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#5A4636" metalness={0.3} roughness={0.6} />
    </RoundedBox>
    <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5.9, 3.1]} />
      <meshStandardMaterial color="#FFF6E2" emissive="#FFF1D0" emissiveIntensity={0.45} />
    </mesh>
    <group position={[mix(-1.55, 0, slide), 0.53, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <PunchedCard hex={hex} w={2.4} title="STORED HASH" />
    </group>
    <group position={[mix(1.55, 0, slide), 0.56, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <PunchedCard hex={hex} w={2.4} title={slide > 0.95 ? 'MATCH' : 'LOGIN HASH'} tint={slide > 0.95 ? '#DDF5E8' : undefined} />
    </group>
  </group>
);
