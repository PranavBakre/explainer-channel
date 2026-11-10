import React, {useMemo} from 'react';
import {useTexture} from '@react-three/drei';
import {staticFile} from 'remotion';
import * as THREE from 'three';

// Surface finishes: scanned oak veneer (Poly Haven, CC0) and seeded procedural maps, so every frame renders identically.

const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const cache = new Map<string, THREE.CanvasTexture>();
const canvasMap = (key: string, size: number, draw: (c: CanvasRenderingContext2D, s: number, r: () => number) => void, repeat = 1) => {
  const hit = cache.get(key);
  if (hit) return hit;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  draw(cv.getContext('2d')!, size, rng(key.length * 7919 + size));
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 8;
  cache.set(key, t);
  return t;
};

const brushed = () =>
  canvasMap('brushed', 1024, (c, s, r) => {
    c.fillStyle = '#808080';
    c.fillRect(0, 0, s, s);
    for (let i = 0; i < 9000; i++) {
      const y = r() * s;
      const v = 96 + r() * 70;
      c.strokeStyle = `rgba(${v},${v},${v},${0.18 + r() * 0.25})`;
      c.lineWidth = 0.4 + r() * 1.2;
      c.beginPath();
      const x = r() * s;
      c.moveTo(x - 200 - r() * 400, y);
      c.lineTo(x + 200 + r() * 400, y + (r() - 0.5) * 2);
      c.stroke();
    }
    for (let i = 0; i < 70; i++) {
      c.strokeStyle = `rgba(200,200,200,${0.15 + r() * 0.2})`;
      c.lineWidth = 0.6;
      c.beginPath();
      const x = r() * s;
      const y = r() * s;
      c.moveTo(x, y);
      c.lineTo(x + (r() - 0.5) * 120, y + (r() - 0.5) * 60);
      c.stroke();
    }
  });

export const fibre = () =>
  canvasMap('fibre', 1024, (c, s, r) => {
    c.fillStyle = '#808080';
    c.fillRect(0, 0, s, s);
    for (let i = 0; i < 14000; i++) {
      const v = 100 + r() * 60;
      c.strokeStyle = `rgba(${v},${v},${v},0.35)`;
      c.lineWidth = 0.5;
      const x = r() * s;
      const y = r() * s;
      const a = r() * Math.PI;
      const l = 2 + r() * 9;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
      c.stroke();
    }
  });

// Brushed metal: copper, brass, steel. Grain runs along the object's x axis.
export const Brushed: React.FC<{color: string; roughness?: number; metalness?: number; bump?: number; attach?: string}> = ({color, roughness = 0.34, metalness = 1, bump = 0.35, attach}) => {
  const m = brushed();
  return <meshPhysicalMaterial attach={attach} color={color} metalness={metalness} roughness={roughness} roughnessMap={m} bumpMap={m} bumpScale={bump} anisotropy={0.6} />;
};

// Dark glass for displays and slots.
export const Glass: React.FC<{color?: string; attach?: string}> = ({color = '#0E1116', attach}) => (
  <meshPhysicalMaterial attach={attach} color={color} metalness={0.2} roughness={0.08} clearcoat={1} clearcoatRoughness={0.04} />
);

const useScanMaps = (name: string, repeat: [number, number]) => {
  const [map, normalMap, roughnessMap] = useTexture([
    staticFile(`assets/textures/${name}-diff.jpg`),
    staticFile(`assets/textures/${name}-nor.jpg`),
    staticFile(`assets/textures/${name}-rough.jpg`),
  ]);
  return useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    return [map, normalMap, roughnessMap].map((t) => {
      const c = t.clone();
      c.wrapS = c.wrapT = THREE.RepeatWrapping;
      c.repeat.set(repeat[0], repeat[1]);
      c.anisotropy = 8;
      c.needsUpdate = true;
      return c;
    });
  }, [map, normalMap, roughnessMap, repeat[0], repeat[1]]);
};

// Lacquered oak veneer; `repeat` scales the grain to the object's size in metres.
export const Oak: React.FC<{repeat?: [number, number]; tint?: string; attach?: string; transparent?: boolean; opacity?: number}> = ({repeat = [1, 1], tint = '#B98A5E', attach, transparent, opacity}) => {
  const maps = useScanMaps('oak_veneer_01', repeat);
  return (
    <meshPhysicalMaterial
      attach={attach}
      color={tint}
      map={maps[0]}
      normalMap={maps[1]}
      normalScale={new THREE.Vector2(0.8, 0.8)}
      roughnessMap={maps[2]}
      roughness={0.75}
      clearcoat={0.45}
      clearcoatRoughness={0.3}
      transparent={transparent}
      opacity={opacity}
    />
  );
};

// Worn enamel over sheet metal: scanned scuffs, dents and roughness (Poly Haven green_metal_rust, desaturated) under our paint colour.
export const Painted: React.FC<{color: string; repeat?: [number, number]; attach?: string}> = ({color, repeat = [1, 1], attach}) => {
  const maps = useScanMaps('painted_metal', repeat);
  return (
    <meshPhysicalMaterial attach={attach} color={color} map={maps[0]} normalMap={maps[1]} roughnessMap={maps[2]} roughness={0.9} metalness={0.15} clearcoat={0.3} clearcoatRoughness={0.35} />
  );
};
