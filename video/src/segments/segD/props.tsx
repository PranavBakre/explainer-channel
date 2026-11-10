import React from 'react';
import {RoundedBox} from '@react-three/drei';
import {Brushed, Oak, Painted} from '../../three/finish';
import {BRASS, PAPER, Plate, useCanvasTexture, V3} from '../../three/kit';
import {fonts} from '../../theme';

export const SHA = '324ce3f954f77c01e68347a9e85134bc81b2455b7a852fa022ea6c4b0efea9a8';
export const ARGON = '$argon2id$v=19$m=19456,t=2,p=1$cE3JU6U6szy6uvAh96bkyw$Pr8MGyxkXWUs/ALFyQ4a+2IS3skjs84BpY4YSDhLGFM';
export const SPACE = 36 ** 8;
export const RATES = [164100000000, 50638700000, 21975500000, 184000, 7126];

export const Block: React.FC<{at: V3; size: V3; color?: string}> = ({at, size, color = '#493628'}) => (
  <RoundedBox position={at} args={size} radius={0.04} smoothness={2} castShadow receiveShadow>
    <Painted color={color} repeat={[Math.max(1, Math.round(Math.max(size[0], size[2]) / 3)), Math.max(1, Math.round(size[1] / 3))]} />
  </RoundedBox>
);

export const Sign: React.FC<{at: V3; text: string; w?: number; h?: number; light?: boolean; textShift?: number}> = ({at, text, w = 3, h = 0.45, light, textShift}) => (
  <group position={at}><Plate text={text} w={w} h={h} textShift={textShift} bg={light ? PAPER : '#1B292D'} color={light ? '#1A1E24' : '#F2D9A8'} /></group>
);

export const Bench: React.FC<{children: React.ReactNode}> = ({children}) => <>
  <RoundedBox position={[0, 0.8, 0]} args={[10.8, 0.25, 3.8]} radius={0.04} smoothness={2} castShadow receiveShadow><Oak repeat={[4, 1]} tint="#7E5636" /></RoundedBox>
  {[-4.6, 4.6].map((x) => <Block key={x} at={[x, 0.4, 0]} size={[0.22, 0.8, 2.8]} color="#222B30" />)}
  {children}
</>;

export const GPU: React.FC<{frame: number; at?: V3}> = ({frame, at = [-3.1, 1.9, 0]}) => <group position={at}>
  <Block at={[0, 0, 0]} size={[3.9, 1.65, 0.55]} color="#252F33" />
  <Block at={[0, -0.88, 0]} size={[3.8, 0.12, 0.2]} color="#2F5F49" />
  {[-1.25, 0, 1.25].map((x) => <group key={x} position={[x, 0, 0.32]}>
    <mesh><torusGeometry args={[0.53, 0.045, 8, 32]} /><meshStandardMaterial color={BRASS} metalness={0.7} roughness={0.35} /></mesh>
    <group rotation={[0, 0, frame * 0.08]}>{Array.from({length: 9}, (_, i) => <group key={i} rotation={[0, 0, i * Math.PI * 2 / 9]}>
      <Block at={[0.22, 0, 0]} size={[0.42, 0.11, 0.06]} color="#67757A" />
    </group>)}</group>
    <mesh position={[0, 0, 0.05]}><circleGeometry args={[0.14, 24]} /><meshStandardMaterial color="#10191B" /></mesh>
  </group>)}
  <Sign at={[0, 1.12, 0.1]} text="RTX 4090" w={3.3} h={0.5} />
</group>;

const DrumDigit: React.FC<{digit: string}> = ({digit}) => {
  const tex = useCanvasTexture(128, 312, (c, W, H) => {
    c.fillStyle = PAPER; c.fillRect(0, 0, W, H);
    c.fillStyle = '#1A1E24'; c.font = `700 160px ${fonts.mono}`;
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(digit, W / 2, H / 2 + 10);
  }, [digit]);
  React.useEffect(() => () => tex.dispose(), [tex]);
  return <mesh position={[0, 0, 0.33]}><planeGeometry args={[0.25, 0.61]} /><meshStandardMaterial map={tex} roughness={0.85} /></mesh>;
};

export const Counter: React.FC<{value: string; title: string; at?: V3; mechanical?: boolean}> = ({value, title, at = [2.2, 2.15, 0], mechanical}) => <group position={at}>
  <Block at={[0, 0, 0]} size={[5.1, 1.35, 0.45]} color="#202A2E" />
  {[-1.9, 1.9].map((x) => <Block key={x} at={[x, -0.95, 0]} size={[0.3, 0.55, 0.6]} color="#202A2E" />)}
  <Sign at={[0, 0.38, 0.24]} text={title} w={4.8} h={0.4} />
  {mechanical ? value.padStart(17, '0').split('').map((digit, i) => <group key={i} position={[(i - 8) * 0.275, -0.22, 0.24]}>
    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.32, 0.32, 0.25, 20]} /><meshStandardMaterial color="#EFE7D6" /></mesh>
    <DrumDigit digit={digit} />
  </group>) : <Sign at={[0, -0.22, 0.24]} text={value} w={4.8} h={0.62} light />}
</group>;

export const Stopwatch: React.FC<{reading: string; algorithm: string; needle: number}> = ({reading, algorithm, needle}) => <group position={[2.4, 2.4, 0.35]}>
  <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.25, 1.25, 0.22, 64]} /><Brushed color={BRASS} roughness={0.3} /></mesh>
  <mesh position={[0, 0, 0.13]}><circleGeometry args={[1.13, 64]} /><meshStandardMaterial color={PAPER} /></mesh>
  {Array.from({length: 12}, (_, i) => <group key={i} rotation={[0, 0, i * Math.PI / 6]}><Block at={[0, 0.98, 0.15]} size={[0.035, 0.14, 0.02]} color="#303B40" /></group>)}
  <group rotation={[0, 0, -needle]}><Block at={[0, 0.37, 0.18]} size={[0.045, 0.74, 0.03]} color="#A4412E" /></group>
  <Block at={[0, 1.4, 0]} size={[0.42, 0.2, 0.2]} color={BRASS} />
  <Sign at={[0, -0.29, 0.22]} text={reading} w={1.9} h={0.56} light />
  <Block at={[0, -1.36, -0.03]} size={[1, 0.23, 0.7]} color="#493628" />
  <Sign at={[-0.14, -1.66, 1.6]} text={algorithm} w={3.3} h={0.46} />
</group>;

export const Calendar: React.FC<{reading: string; algorithm: string; flip?: number}> = ({reading, algorithm, flip = 0}) => <group position={[2.35, 2.1, 0.4]}>
  <Block at={[0, 0, -0.16]} size={[4.6, 2.15, 0.22]} color="#B56C3D" />
  <Sign at={[0, 0.63, 0]} text={algorithm} w={4.35} h={0.5} />
  <Sign at={[0, -0.15, 0]} text={reading} w={4.35} h={0.95} light />
  {flip > 0 ? <group position={[0, 1, 0.08]} rotation={[-Math.PI * flip, 0, 0]}>
    <Block at={[0, -1.05, 0]} size={[4.4, 2.1, 0.025]} color={PAPER} />
    <Sign at={[0, -0.37, 0.02]} text={algorithm} w={4.35} h={0.5} />
    <Sign at={[0, -1.15, 0.02]} text={reading} w={4.35} h={0.95} light />
  </group> : null}
  <Block at={[0, -1.08, -0.3]} size={[3.5, 0.18, 1.1]} color="#493628" />
  <Sign at={[0, -1.35, 1.55]} text="FULL 36⁸ SEARCH · 1 GPU" w={4.6} h={0.42} />
  {[-1.6, -0.8, 0, 0.8, 1.6].map((x) => <mesh key={x} position={[x, 1.02, 0]}><torusGeometry args={[0.15, 0.04, 8, 16]} /><meshStandardMaterial color={BRASS} metalness={0.8} /></mesh>)}
</group>;

export const Drawer: React.FC<{at?: V3; children?: React.ReactNode; labelScale?: number}> = ({at = [0, 0, 0], children, labelScale = 1}) => <group position={at}>
  <RoundedBox position={[0, 0.65, 0]} args={[6.8, 1.2, 2.1]} radius={0.04} smoothness={2} castShadow receiveShadow><Oak repeat={[3, 1]} tint="#A9774E" /></RoundedBox>
  <Sign at={[0, 0.6, 1.07]} text="grocery_app.users" textShift={-0.06} w={4.6 * labelScale} h={0.55 * labelScale} />
  {children}
</group>;

export const RecipeCard: React.FC<{active?: number; w?: number; upgraded?: boolean}> = ({active = -1, w = 6.4, upgraded = false}) => {
  const stored = upgraded ? '$argon2id$v=19$m=19456,t=3,p=1$cE3JU6U6szy6uvAh96bkyw$Geb8qETA4qvN49njY2IlxdUBXvyo542DwrErph8hHCI' : ARGON;
  const fields = stored.split('$');
  const rows = [fields.slice(0, 4).join('$'), '$' + fields[4], '$' + fields[5]];
  const tex = useCanvasTexture(2048, 900, (c, W, H) => {
    c.fillStyle = PAPER; c.fillRect(0, 0, W, H);
    c.fillStyle = '#1A1E24'; c.font = `500 76px ${fonts.sans}`; c.fillText('you@mail.com', 90, 130);
    c.strokeStyle = '#B56C3D'; c.lineWidth = 4; c.beginPath(); c.moveTo(70, 180); c.lineTo(W - 70, 180); c.stroke();
    rows.forEach((row, i) => {
      const y = 330 + i * 220;
      if (active === i) {c.fillStyle = '#E0B85C'; c.fillRect(65, y - 62, W - 130, 100);}
      c.fillStyle = '#1A1E24'; c.font = `700 62px ${fonts.mono}`; c.fillText(row, 90, y);
      c.fillStyle = '#665544'; c.font = `500 52px ${fonts.sans}`; c.fillText(['algorithm + settings', 'salt', 'hash'][i], 90, y + 70);
    });
  }, [active, upgraded]);
  return <mesh castShadow><boxGeometry args={[w, w * 900 / 2048, 0.04]} />
    {[0, 1, 2, 3, 5].map((i) => <meshStandardMaterial key={i} attach={`material-${i}`} color={PAPER} />)}
    <meshStandardMaterial attach="material-4" map={tex} roughness={0.85} />
  </mesh>;
};
