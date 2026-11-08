// Usage: bun tools/build-episode.ts <episode-dir> <id>
// Merges storyboard.json with voice/lines/manifest.json into video/src/episodes/<id>.json,
// copies narration audio into video/public/<id>/, and writes captions.srt + chapters.txt.
import {copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

type Beat = {id: string; vo: string};
type Shot = {visual: string; props: Record<string, unknown>; beats: Beat[]; sfx?: ('tick' | 'hit' | 'whoosh')[]; sfxBeat?: number[]};
type Scene = {id: string; act: number; title?: string; transitionIn: string; shots: Shot[]};
type Storyboard = {fps: number; width: number; height: number; voice: string; scenes: Scene[]; musicVolume?: number};
type ManifestLine = {id: string; seconds: number; file: string};

const [epDir, id] = process.argv.slice(2);
const root = resolve(import.meta.dir, '..');
const sb: Storyboard = JSON.parse(readFileSync(join(epDir, 'storyboard.json'), 'utf8'));
const manifest: ManifestLine[] = JSON.parse(readFileSync(join(epDir, 'voice/lines/manifest.json'), 'utf8'));
const byId = new Map(manifest.map((m) => [m.id, m]));

const PAUSE_BEAT = 0.45;
const PAUSE_SCENE = 0.7;
const PAUSE_ACT = 1.2;
const LEAD_IN = 0.6;

const fps = sb.fps;
const pubDir = join(root, 'video/public', id);
mkdirSync(pubDir, {recursive: true});

let t = Math.round(LEAD_IN * fps);
const audio: {file: string; from: number}[] = [];
const srt: string[] = [];
const chapters: string[] = [];
const scenes = sb.scenes.map((scene, si) => {
  const sceneFrom = t;
  const next = sb.scenes[si + 1];
  const tail = !next ? 2.5 : next.act !== scene.act ? PAUSE_ACT : PAUSE_SCENE;
  if (scene.title) chapters.push(`${fmtChapter(sceneFrom / fps)} ${scene.title}`);
  const shots = scene.shots.map((shot, shi) => {
    const shotFrom = t;
    const steps: number[] = [];
    shot.beats.forEach((beat, bi) => {
      const m = byId.get(beat.id);
      if (!m) throw new Error(`No audio for ${beat.id}`);
      steps.push(t - shotFrom);
      audio.push({file: m.file, from: t});
      copyFileSync(join(epDir, 'voice/lines', m.file), join(pubDir, m.file));
      srt.push(`${srt.length + 1}\n${fmtSrt(t / fps)} --> ${fmtSrt(t / fps + m.seconds)}\n${beat.vo}\n`);
      const lastBeat = shi === scene.shots.length - 1 && bi === shot.beats.length - 1;
      t += Math.round((m.seconds + (lastBeat ? tail : PAUSE_BEAT)) * fps);
    });
    const sfx = (shot.sfx ?? []).map((kind, k) => ({kind, at: steps[shot.sfxBeat?.[k] ?? 0] ?? 0}));
    return {visual: shot.visual, props: shot.props, from: shotFrom - sceneFrom, duration: t - shotFrom, steps, sfx};
  });
  return {id: scene.id, act: scene.act, transitionIn: scene.transitionIn, from: sceneFrom, duration: t - sceneFrom, shots};
});

const music = existsSync(join(pubDir, 'pad.wav')) ? {file: 'pad.wav', volume: sb.musicVolume ?? 0.12} : undefined;
const built = {id, fps, width: sb.width, height: sb.height, durationInFrames: t, scenes, audio, music};
writeFileSync(join(root, 'video/src/episodes', `${id}.json`), JSON.stringify(built, null, 1));
writeFileSync(join(epDir, 'out', 'captions.srt'), srt.join('\n'));
writeFileSync(join(epDir, 'out', 'chapters.txt'), chapters.join('\n') + '\n');
console.log(`${id}: ${scenes.length} scenes, ${audio.length} lines, ${(t / fps / 60).toFixed(2)} min (${t} frames)`);

function fmtSrt(s: number) {
  const ms = Math.round(s * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60, r = ms % 1000;
  return `${pad(h)}:${pad(m)}:${pad(sec)},${String(r).padStart(3, '0')}`;
}
function fmtChapter(s: number) {
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m}:${pad(sec)}`;
}
function pad(n: number) {
  return String(n).padStart(2, '0');
}
