// Usage: node stills.mjs <compositionId> <outDir> [frame ...]
// Without frames, renders one still at ~70% through every shot (after its build-up) for review.
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import {mkdirSync, readFileSync, rmSync} from 'node:fs';
import path from 'node:path';

const [id, outDir, ...frameArgs] = process.argv.slice(2);
mkdirSync(outDir, {recursive: true});
const frames = frameArgs.length
  ? frameArgs.map((f) => ({frame: Number(f), name: `f${f}`}))
  : JSON.parse(readFileSync(`src/episodes/${id}.json`, 'utf8')).scenes.flatMap((s) => s.shots.map((sh, i) => ({frame: s.from + sh.from + Math.floor(sh.duration * 0.7), name: `${s.id}_${i}_${sh.visual}`})));
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
try {
  const composition = await selectComposition({serveUrl, id, inputProps: {}, chromiumOptions: {gl: 'angle'}});
  for (const f of frames) {
    await renderStill({composition, serveUrl, frame: f.frame, output: path.join(outDir, `${f.name}.jpeg`), imageFormat: 'jpeg', jpegQuality: 80, chromiumOptions: {gl: 'angle'}});
    console.log(f.name, f.frame);
  }
} finally {
  rmSync(serveUrl, {recursive: true, force: true});
}
