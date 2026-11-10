import React, {useLayoutEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {ContactShadows, Environment, Lightformer, MeshReflectorMaterial} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';
import {fonts} from '../theme';
import {hexBits} from '../components/fingerprint';

export type V3 = [number, number, number];
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixV = (a: V3, b: V3, t: number): V3 => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];

export const PAPER = '#EFE7D6';
export const INK = '#1A1E24';
export const COPPER = '#B5703C';
export const BRASS = '#C89B5A';

// Text and patterns are painted on canvases with the page's loaded web fonts, so WebGL needs no async font loading.
export const useCanvasTexture = (w: number, h: number, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, deps: unknown[]) =>
  useMemo(() => {
    const cv = document.createElement('canvas');
    cv.width = w;
    cv.height = h;
    draw(cv.getContext('2d')!, w, h);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

export const CameraRig: React.FC<{pos: V3; target: V3; fov?: number; unreflectedLabels?: boolean}> = ({pos, target, fov, unreflectedLabels = false}) => {
  const camera = useThree((st) => st.camera) as THREE.PerspectiveCamera;
  useLayoutEffect(() => {
    camera.position.set(...pos);
    if (fov) camera.fov = fov;
    camera.lookAt(...target);
    camera.layers.set(0);
    if (unreflectedLabels) camera.layers.enable(1);
    camera.updateProjectionMatrix();
  }, [camera, pos, target, fov, unreflectedLabels]);
  return null;
};

export type Angle = {from: V3; to?: V3; target: V3; fov?: number};

// A lit coloured studio: backdrop, reflective floor, soft key + rim, environment for reflections.
export const Studio: React.FC<{
  color: string;
  floor?: string;
  unreflectedLabels?: boolean;
  angle: Angle;
  look?: {pos: V3; target: V3};
  children: React.ReactNode;
  keyColor?: string;
  shadows?: boolean;
  duration: number;
}> = ({color, floor, unreflectedLabels = false, angle, look, children, keyColor = '#FFE2C0', shadows = true, duration}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const t = interpolate(frame, [0, Math.max(1, duration)], [0, 1], clamp);
  const pos = look?.pos ?? mixV(angle.from, angle.to ?? angle.from, t);
  const back = useMemo(() => new THREE.Color(color).offsetHSL(0, -0.05, 0.12).getStyle(), [color]);
  return (
    <AbsoluteFill style={{background: color}}>
      <ThreeCanvas width={width} height={height} shadows camera={{position: pos, fov: angle.fov ?? 32}}>
        <CameraRig pos={pos} target={look?.target ?? angle.target} fov={angle.fov ?? 32} unreflectedLabels={unreflectedLabels} />
        <color attach="background" args={[color]} />
        <fog attach="fog" args={[color, 18, 40]} />
        <mesh position={[0, 7, -10]} receiveShadow>
          <planeGeometry args={[80, 20]} />
          <meshStandardMaterial color={back} roughness={0.95} />
        </mesh>
        <ambientLight intensity={0.6} />
        <spotLight position={[-5, 9, 7]} angle={0.5} penumbra={0.8} intensity={280} color={keyColor} castShadow={shadows} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} />
        <spotLight position={[6, 5, -5]} angle={0.6} penumbra={1} intensity={110} color="#9FD0E6" />
        <spotLight position={[0, 10, -3]} angle={0.9} penumbra={1} intensity={80} color="#CFE7F0" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 4]} scale={[8, 2, 1]} color="#FFE9CF" />
          <Lightformer form="rect" intensity={1.5} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#9FC7EA" />
          <Lightformer form="ring" intensity={2} position={[5, 3, -3]} scale={2} color="#FFB224" />
        </Environment>
        {children}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <MeshReflectorMaterial resolution={1024} mixBlur={1.2} mixStrength={14} blur={[400, 120]} roughness={0.85} depthScale={1} color={floor ?? back} metalness={0.3} mirror={0.35} />
        </mesh>
        <ContactShadows position={[0, 0.005, 0]} opacity={0.55} scale={20} blur={2.4} far={5} frames={1} />
      </ThreeCanvas>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.42) 100%)'}} />
    </AbsoluteFill>
  );
};

// Additive radial sprite in place of bloom (post-processing renders blank under Remotion capture).
export const Glow: React.FC<{position: V3; size: number; opacity: number; color?: string}> = ({position, size, opacity, color = '255,178,36'}) => {
  const tex = useCanvasTexture(
    256,
    256,
    (c) => {
      const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, 'rgba(255,240,210,1)');
      g.addColorStop(0.25, `rgba(${color},0.55)`);
      g.addColorStop(1, `rgba(${color},0)`);
      c.fillStyle = g;
      c.fillRect(0, 0, 256, 256);
    },
    [color],
  );
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial map={tex} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
    </sprite>
  );
};

const paperSides = (tex: THREE.Texture, edge = '#E6DCC8') => (
  <>
    {[0, 1, 2, 3, 5].map((i) => (
      <meshStandardMaterial key={i} attach={`material-${i}`} color={edge} roughness={0.9} />
    ))}
    <meshStandardMaterial attach="material-4" map={tex} roughness={0.85} />
  </>
);

// A paper index card; `lines` are drawn top to bottom, the `big` line in mono.
export const PaperCard: React.FC<{
  w?: number;
  h?: number;
  label?: string;
  big: string;
  bigColor?: string;
  sub?: string;
  paper?: string;
}> = ({w = 1.6, h = 1.0, label, big, bigColor = '#B87400', sub, paper = PAPER}) => {
  const tex = useCanvasTexture(
    1024,
    Math.round((1024 * h) / w),
    (c, W, H) => {
      c.fillStyle = paper;
      c.fillRect(0, 0, W, H);
      c.strokeStyle = 'rgba(120,100,70,0.35)';
      c.lineWidth = 5;
      c.strokeRect(24, 24, W - 48, H - 48);
      if (label) {
        c.fillStyle = '#7A6A52';
        c.font = `600 ${Math.round(H * 0.075)}px ${fonts.sans}`;
        c.fillText(label.toUpperCase(), 70, H * 0.2);
      }
      c.fillStyle = bigColor;
      let size = Math.round(H * 0.24);
      c.font = `700 ${size}px ${fonts.mono}`;
      while (c.measureText(big).width > W - 140 && size > 20) {
        size -= 4;
        c.font = `700 ${size}px ${fonts.mono}`;
      }
      c.fillText(big, 70, H * 0.58);
      if (sub) {
        c.fillStyle = '#7A6A52';
        c.font = `500 ${Math.round(H * 0.07)}px ${fonts.sans}`;
        c.fillText(sub, 70, H * 0.82);
      }
    },
    [w, h, label, big, bigColor, sub, paper],
  );
  return (
    <mesh castShadow>
      <boxGeometry args={[w, h, 0.02]} />
      {paperSides(tex)}
    </mesh>
  );
};

// A punched card carrying the real bits of a hash: a hole for every 1.
export const PunchedCard: React.FC<{hex: string; w?: number; title?: string; titleScale?: number; cols?: number; mark?: boolean[]; markColor?: string; tint?: string}> = ({
  hex,
  w = 1.5,
  title = 'FINGERPRINT',
  titleScale = 1,
  cols = 16,
  mark,
  markColor = '#E0452F',
  tint,
}) => {
  const bits = useMemo(() => hexBits(hex), [hex]);
  const rows = Math.ceil(bits.length / cols);
  const h = w * ((rows * 52 + 170) / (cols * 52 + 140));
  const tex = useCanvasTexture(
    1024,
    Math.round((1024 * h) / w),
    (c, W, H) => {
      c.fillStyle = tint ?? PAPER;
      c.fillRect(0, 0, W, H);
      c.fillStyle = '#7A6A52';
      c.font = `600 ${Math.round(W * 0.038 * titleScale)}px ${fonts.sans}`;
      c.fillText(title, W * 0.07, titleScale === 1 ? H * 0.085 : Math.max(H * 0.085, W * 0.038 * titleScale * 0.95));
      const cell = (W * 0.86) / cols;
      const top = H * 0.13;
      bits.forEach((b, i) => {
        const x = W * 0.07 + (i % cols) * cell;
        const y = top + Math.floor(i / cols) * cell;
        c.beginPath();
        c.arc(x + cell / 2, y + cell / 2, cell * 0.33, 0, Math.PI * 2);
        c.fillStyle = mark?.[i] ? markColor : b ? INK : 'rgba(122,106,82,0.16)';
        c.fill();
      });
    },
    [hex, w, title, titleScale, cols, mark?.join(''), markColor, tint],
  );
  return (
    <mesh castShadow>
      <boxGeometry args={[w, h, 0.02]} />
      {paperSides(tex)}
    </mesh>
  );
};

// Dark brass-edged name plate; unreflected plates use layer 1, enabled by Studio.unreflectedLabels.
export const Plate: React.FC<{text: string; w: number; h: number; glow?: number; color?: string; bg?: string; textShift?: number; reflect?: boolean}> = ({
  text,
  w,
  h,
  glow = 0,
  color = '#F2D9A8',
  bg = '#2B2116',
  textShift = 0,
  reflect = true,
}) => {
  const tex = useCanvasTexture(
    1024,
    Math.max(64, Math.round((1024 * h) / w)),
    (c, W, H) => {
      c.fillStyle = bg;
      c.fillRect(0, 0, W, H);
      c.strokeStyle = BRASS;
      c.lineWidth = 10;
      c.strokeRect(12, 12, W - 24, H - 24);
      c.fillStyle = color;
      let size = Math.round(H * 0.5);
      c.font = `700 ${size}px ${fonts.sans}`;
      while (c.measureText(text).width > W - 80 && size > 12) {
        size -= 2;
        c.font = `700 ${size}px ${fonts.sans}`;
      }
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(text, W / 2, H / 2 + 4 + H * textShift);
    },
    [text, w, h, color, bg, textShift],
  );
  return (
    <mesh layers-mask={reflect ? 1 : 2}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.15 + glow} roughness={0.5} />
    </mesh>
  );
};

// Small HTML label floating over the 3D frame, in the reference's "label on the object" style.
export const Tag: React.FC<{x: number; y: number; text: string; color?: string; size?: number; opacity?: number}> = ({x, y, text, color = '#F2EDE4', size = 40, opacity = 1}) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        fontFamily: fonts.serif,
        fontSize: size,
        color,
        opacity,
        textShadow: '0 3px 24px rgba(0,0,0,0.65)',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
