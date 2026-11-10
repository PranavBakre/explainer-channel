import React, {useMemo} from 'react';
import {useGLTF} from '@react-three/drei';
import {staticFile} from 'remotion';
import * as THREE from 'three';
import {V3} from './kit';

export type Part = {pivot: V3; rotation?: V3; offset?: V3};

// A photoscanned Poly Haven model (CC0). `size` scales its largest side uniformly; `fit` stretches it into a box.
// Its base sits on y = 0, centred in x and z. `node` keeps one sub-object; `parts` hinge or slide named sub-objects
// about a pivot given in the model's own metres.
export const Scanned: React.FC<{
  name: string;
  size?: number;
  fit?: V3;
  node?: string;
  fitNode?: string;
  parts?: Record<string, Part>;
  position?: V3;
  rotation?: V3;
  scale?: number;
  opacity?: number;
}> = ({name, size, fit, node, fitNode, parts = {}, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, opacity = 1}) => {
  const {scene} = useGLTF(staticFile(`assets/models/${name}/${name}_1k.gltf`));
  const partNames = Object.keys(parts).join('|');
  const translucent = opacity < 1;
  const [obj, k, offset, pivots, mats] = useMemo(() => {
    const mats: THREE.Material[] = [];
    scene.updateMatrixWorld(true);
    let o: THREE.Object3D;
    if (node) {
      const src = scene.getObjectByName(node);
      if (!src) throw new Error(`${name}: no node ${node}`);
      const c = src.clone(true);
      src.matrixWorld.decompose(c.position, c.quaternion, c.scale);
      o = new THREE.Group().add(c);
    } else {
      o = scene.clone(true);
    }
    o.traverse((m) => {
      if ((m as THREE.Mesh).isMesh) {
        const mesh = m as THREE.Mesh;
        mesh.castShadow = !translucent;
        mesh.receiveShadow = true;
        if (translucent) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.transparent = true;
          mat.depthWrite = false;
          mesh.material = mat;
          mats.push(mat);
        }
      }
    });
    o.updateMatrixWorld(true);
    const ref = fitNode ? o.getObjectByName(fitNode) : o;
    if (!ref) throw new Error(`${name}: no node ${fitNode}`);
    const box = new THREE.Box3().setFromObject(ref);
    const dim = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    const s: V3 = fit ? [fit[0] / dim.x, fit[1] / dim.y, fit[2] / dim.z] : (() => {
      const u = (size ?? 1) / Math.max(dim.x, dim.y, dim.z);
      return [u, u, u];
    })();
    const piv: Record<string, THREE.Group> = {};
    for (const p of Object.keys(parts)) {
      const n = o.getObjectByName(p);
      if (!n || !n.parent) throw new Error(`${name}: no part ${p}`);
      const g = new THREE.Group();
      const local = n.parent.worldToLocal(new THREE.Vector3(...parts[p].pivot));
      g.position.copy(local);
      n.parent.add(g);
      n.position.sub(local);
      g.add(n);
      g.userData.base = local.clone();
      piv[p] = g;
    }
    return [o, s, [-c.x * s[0], -box.min.y * s[1], -c.z * s[2]] as V3, piv, mats];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, size, fit?.join(), node, fitNode, partNames, translucent]);
  for (const m of mats) m.opacity = opacity;
  for (const [p, g] of Object.entries(pivots)) {
    const {rotation: r = [0, 0, 0], offset: d = [0, 0, 0]} = parts[p];
    g.rotation.set(r[0], r[1], r[2]);
    g.position.copy(g.userData.base).add(new THREE.Vector3(...d));
  }
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={obj} scale={k} position={offset} />
    </group>
  );
};
