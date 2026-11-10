import React from 'react';
import {RoundedBox} from '@react-three/drei';
import {fonts} from '../../theme';
import {BRASS, PAPER, useCanvasTexture} from '../../three/kit';
import data from './data.json';

export const digest = (input: string, algorithm = 'sha256') => {
  const row = data.find((r) => r.input === input && r.algorithm === algorithm);
  if (!row) throw new Error(`Missing verified digest: ${algorithm}(${input})`);
  return row.hex;
};

export const LabelC: React.FC<{lines: string[]; w: number; h: number; color?: string; bg?: string}> = ({lines, w, h, color = '#1A1E24', bg = PAPER}) => {
  const texture = useCanvasTexture(1536, Math.round(1536 * h / w), (c, W, H) => {
    c.fillStyle = bg;
    c.fillRect(0, 0, W, H);
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = color;
    let size = H / (lines.length + 0.7);
    c.font = `700 ${size}px ${fonts.mono}`;
    while (Math.max(...lines.map((l) => c.measureText(l).width)) > W * 0.88) {
      size -= 1;
      c.font = `700 ${size}px ${fonts.mono}`;
    }
    lines.forEach((line, i) => c.fillText(line, W / 2, H / 2 + (i - (lines.length - 1) / 2) * size * 1.15));
  }, [lines.join('|'), w, h, color, bg]);
  return <mesh><boxGeometry args={[w, h, 0.025]} />
    {[0, 1, 2, 3, 5].map((i) => <meshStandardMaterial key={i} attach={`material-${i}`} color={bg} roughness={0.8} />)}
    <meshStandardMaterial attach="material-4" map={texture} roughness={0.8} />
  </mesh>;
};

export const SaltChipC: React.FC<{salt: string}> = ({salt}) => <group>
  <RoundedBox args={[2.05, 0.55, 0.08]} radius={0.08} castShadow><meshStandardMaterial color={BRASS} metalness={0.6} roughness={0.3} /></RoundedBox>
  <group position={[0, 0, 0.05]}><LabelC lines={[salt]} w={1.9} h={0.44} bg="#E5BA70" /></group>
</group>;
