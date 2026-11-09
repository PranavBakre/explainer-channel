import React, {useLayoutEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {ContactShadows, Environment, Lightformer, MeshReflectorMaterial, RoundedBox} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';
import {colors, fonts} from '../theme';
import {hexBits} from '../components/fingerprint';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});

// Text and patterns are painted on canvases with the page's already-loaded web fonts, so no async font loading in WebGL.
const useCanvasTexture = (w: number, h: number, draw: (c: CanvasRenderingContext2D) => void, deps: unknown[]) =>
  useMemo(() => {
    const cv = document.createElement('canvas');
    cv.width = w;
    cv.height = h;
    draw(cv.getContext('2d')!);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

const PasswordCard: React.FC<{text: string}> = ({text}) => {
  const tex = useCanvasTexture(
    1024,
    640,
    (c) => {
      c.fillStyle = '#EFE7D6';
      c.fillRect(0, 0, 1024, 640);
      c.strokeStyle = '#C9BBA0';
      c.lineWidth = 6;
      c.strokeRect(30, 30, 964, 580);
      c.fillStyle = '#7A6A52';
      c.font = `600 44px ${fonts.sans}`;
      c.fillText('PASSWORD', 80, 130);
      c.fillStyle = '#B87400';
      c.font = `700 150px ${fonts.mono}`;
      c.fillText(text, 80, 380);
    },
    [text],
  );
  return (
    <mesh castShadow>
      <boxGeometry args={[1.6, 1.0, 0.02]} />
      <meshStandardMaterial attach="material-0" color="#E6DCC8" />
      <meshStandardMaterial attach="material-1" color="#E6DCC8" />
      <meshStandardMaterial attach="material-2" color="#E6DCC8" />
      <meshStandardMaterial attach="material-3" color="#E6DCC8" />
      <meshStandardMaterial attach="material-4" map={tex} roughness={0.85} />
      <meshStandardMaterial attach="material-5" color="#E6DCC8" />
    </mesh>
  );
};

const PunchedCard: React.FC<{hex: string; reveal: number}> = ({hex, reveal}) => {
  const bits = useMemo(() => hexBits(hex), [hex]);
  const tex = useCanvasTexture(
    1024,
    1024,
    (c) => {
      c.fillStyle = '#EFE7D6';
      c.fillRect(0, 0, 1024, 1024);
      c.fillStyle = '#7A6A52';
      c.font = `600 40px ${fonts.sans}`;
      c.fillText('FINGERPRINT · 256 BITS', 70, 90);
      const cell = 52;
      bits.forEach((b, i) => {
        const x = 96 + (i % 16) * cell;
        const y = 140 + Math.floor(i / 16) * cell;
        c.beginPath();
        c.arc(x + 20, y + 20, 17, 0, Math.PI * 2);
        c.fillStyle = b ? '#1A1E24' : 'rgba(122,106,82,0.18)';
        c.fill();
      });
    },
    [hex],
  );
  const s = 0.4 + 0.6 * reveal;
  return (
    <mesh castShadow scale={[1, s, 1]}>
      <boxGeometry args={[1.5, 1.5, 0.02]} />
      <meshStandardMaterial attach="material-0" color="#E6DCC8" />
      <meshStandardMaterial attach="material-1" color="#E6DCC8" />
      <meshStandardMaterial attach="material-2" color="#E6DCC8" />
      <meshStandardMaterial attach="material-3" color="#E6DCC8" />
      <meshStandardMaterial attach="material-4" map={tex} roughness={0.85} />
      <meshStandardMaterial attach="material-5" color="#E6DCC8" />
    </mesh>
  );
};

const Plate: React.FC<{text: string; w: number; h: number; glow?: number}> = ({text, w, h, glow = 0}) => {
  const tex = useCanvasTexture(
    1024,
    Math.round((1024 * h) / w),
    (c) => {
      const H = c.canvas.height;
      c.fillStyle = '#2B2116';
      c.fillRect(0, 0, 1024, H);
      c.strokeStyle = '#C89B5A';
      c.lineWidth = 10;
      c.strokeRect(12, 12, 1000, H - 24);
      c.fillStyle = '#F2D9A8';
      c.font = `700 ${Math.round(H * 0.5)}px ${fonts.sans}`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(text, 512, H / 2 + 4);
    },
    [text, w, h],
  );
  return (
    <mesh>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.15 + glow} roughness={0.5} />
    </mesh>
  );
};

const Machine: React.FC<{frame: number; busy: number}> = ({frame, busy}) => {
  const shake = busy * Math.sin(frame * 1.7) * 0.01;
  return (
    <group position={[shake, 0, 0]}>
      <RoundedBox args={[3.2, 2.6, 2.2]} radius={0.22} smoothness={6} position={[0, 1.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#B5703C" metalness={0.45} roughness={0.5} />
      </RoundedBox>
      {/* side fins */}
      {[-1, 1].map((sgn) => (
        <mesh key={sgn} position={[sgn * 1.78, 1.35, 0.2]} rotation={[0, sgn * 0.5, 0]} castShadow>
          <boxGeometry args={[0.06, 2.1, 1.2]} />
          <meshStandardMaterial color="#5A4636" metalness={0.6} roughness={0.45} />
        </mesh>
      ))}
      {/* front face: name plate, window, input slot, dial */}
      <group position={[0, 0, 1.11]}>
        <group position={[0, 2.3, 0.01]}>
          <Plate text="HASH MACHINE" w={1.7} h={0.26} />
        </group>
        <RoundedBox args={[2.4, 0.75, 0.08]} radius={0.06} position={[0, 1.55, 0]}>
          <meshStandardMaterial color="#12161C" metalness={0.2} roughness={0.15} />
        </RoundedBox>
        <group position={[0, 1.55, 0.05]}>
          <Plate text={busy > 0.05 ? 'WORKING…' : 'SHA-256'} w={2.2} h={0.5} glow={busy * 1.5} />
        </group>
        <mesh position={[0, 0.8, 0.02]}>
          <boxGeometry args={[2.2, 0.06, 0.04]} />
          <meshStandardMaterial color="#1A1E24" />
        </mesh>
        <mesh position={[0, 0.35, 0.05]} rotation={[Math.PI / 2, 0, frame * 0.02 * busy]}>
          <cylinderGeometry args={[0.18, 0.2, 0.12, 24]} />
          <meshStandardMaterial color="#2A3038" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      {/* bulb */}
      <mesh position={[0, 2.75, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.22, 24]} />
        <meshStandardMaterial color="#8A6A3A" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.05, 0]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color="#FFE7B0" emissive="#FFB224" emissiveIntensity={0.4 + busy * 6} toneMapped={false} />
      </mesh>
      <Glow position={[0, 3.05, 0.05]} size={1.6 + busy * 1.6} opacity={0.25 + busy * 0.75} />
      <pointLight position={[0, 3.1, 0.3]} color="#FFB224" intensity={busy * 6} distance={4} />
    </group>
  );
};

// Prototype: the S06 hash machine as a lit physical set.
export const HashMachineSet: React.FC<{input: string; hex: string}> = ({input, hex}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const feed = ease(frame, 40, 100);
  const busy = interpolate(frame, [95, 110, 160, 175], [0, 1, 1, 0], clamp);
  const out = ease(frame, 165, 235);
  const cam = ease(frame, 0, 300);
  const camPos: [number, number, number] = [interpolate(cam, [0, 1], [-2.6, 0.9]), interpolate(cam, [0, 1], [2.1, 1.7]), interpolate(cam, [0, 1], [12.5, 10.2])];
  return (
    <AbsoluteFill style={{background: '#2E5663'}}>
      <ThreeCanvas width={width} height={height} shadows camera={{position: camPos, fov: 32}} >
        <CameraRig pos={camPos} target={[0.3, 1.45, 0]} />
        <color attach="background" args={['#2E5663']} />
        <fog attach="fog" args={['#2E5663', 16, 34]} />
        <mesh position={[0, 6, -9]} receiveShadow>
          <planeGeometry args={[60, 16]} />
          <meshStandardMaterial color="#4A8292" roughness={0.95} />
        </mesh>
        <spotLight position={[0, 9, -2]} angle={0.9} penumbra={1} intensity={90} color="#BFE3EE" target-position={[0, 3, -9]} />
        <ambientLight intensity={0.6} />
        <spotLight position={[-5, 8, 6]} angle={0.45} penumbra={0.8} intensity={260} color="#FFE2C0" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} />
        <spotLight position={[6, 4, -5]} angle={0.5} penumbra={1} intensity={120} color="#7FB8E6" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 4]} scale={[8, 2, 1]} color="#FFE9CF" />
          <Lightformer form="rect" intensity={1.5} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#9FC7EA" />
          <Lightformer form="ring" intensity={2} position={[5, 3, -3]} scale={2} color="#FFB224" />
        </Environment>
        <Machine frame={frame} busy={busy} />
        <group position={[interpolate(feed, [0, 1], [-4.2, -1.75]), 1.05 + Math.sin(frame / 18) * 0.03 * (1 - feed), 0.4]} rotation={[0, interpolate(feed, [0, 1], [0.5, Math.PI / 2]), 0]}>
          <group scale={[interpolate(feed, [0.8, 1], [1, 0.001], clamp), 1, 1]}>
            <PasswordCard text={input} />
          </group>
        </group>
        <group position={[interpolate(out, [0, 1], [1.6, 3.4]), 0.9 + out * 0.25, 0.5]} rotation={[0, interpolate(out, [0, 1], [-Math.PI / 2, -0.45]), 0]} visible={out > 0.01}>
          <PunchedCard hex={hex} reveal={out} />
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <MeshReflectorMaterial resolution={1024} mixBlur={1.2} mixStrength={18} blur={[400, 120]} roughness={0.85} depthScale={1} color="#3A6A78" metalness={0.3} mirror={0.35} />
        </mesh>
        <ContactShadows position={[0, 0.005, 0]} opacity={0.6} scale={12} blur={2.4} far={4} frames={1} />
      </ThreeCanvas>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.4) 100%)'}} />
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 170}}>
        <div style={{fontFamily: fonts.serif, fontSize: 64, color: colors.cream, opacity: interpolate(frame, [240, 260], [0, 1], clamp), textShadow: '0 4px 30px rgba(0,0,0,0.6)'}}>
          Same input, same fingerprint. No way back.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Additive radial sprite: stands in for bloom, which renders blank under Remotion's headless capture.
const Glow: React.FC<{position: [number, number, number]; size: number; opacity: number}> = ({position, size, opacity}) => {
  const tex = useCanvasTexture(
    256,
    256,
    (c) => {
      const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, 'rgba(255,214,140,1)');
      g.addColorStop(0.25, 'rgba(255,178,36,0.55)');
      g.addColorStop(1, 'rgba(255,178,36,0)');
      c.fillStyle = g;
      c.fillRect(0, 0, 256, 256);
    },
    [],
  );
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial map={tex} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
    </sprite>
  );
};

export const CameraRig: React.FC<{pos: [number, number, number]; target: [number, number, number]}> = ({pos, target}) => {
  const camera = useThree((st) => st.camera);
  useLayoutEffect(() => {
    camera.position.set(...pos);
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
  }, [camera, pos, target]);
  return null;
};
