// Usage: bun tools/storyboard-lines.ts <episode-dir> [--from-script] — writes voice/lines.json from storyboard.json, or from
// script.md (one line per narration paragraph, ids S<nn>_<kk>) when there is no storyboard yet or with --from-script.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

type Line = {id: string; text: string; spoken?: string};
const epDir = process.argv[2];
const sbPath = join(epDir, 'storyboard.json');
let lines: Line[];
if (existsSync(sbPath) && !process.argv.includes('--from-script')) {
  const sb = JSON.parse(readFileSync(sbPath, 'utf8'));
  lines = sb.scenes.flatMap((s: {shots: {beats: {id: string; vo: string}[]}[]}) =>
    s.shots.flatMap((sh) => sh.beats.map((b) => ({id: b.id, text: b.vo}))),
  );
} else {
  const script = readFileSync(join(epDir, 'script.md'), 'utf8');
  lines = [...script.matchAll(/^## (S\d\d) — .*?\n([\s\S]*?)(?=^## |(?![\s\S]))/gm)].flatMap(([, scene, body]) =>
    body
      .split('\n')
      .map((l) => l.replace(/\s*\[F\d+\]/g, '').trim())
      .filter((l) => l && !l.startsWith('>'))
      .map((text, i) => ({id: `${scene}_${String(i + 1).padStart(2, '0')}`, text})),
  );
}
mkdirSync(join(epDir, 'voice'), {recursive: true});
// Keep hand-added `spoken` forms (read by synth_elevenlabs.py) across re-extraction, while the text is unchanged.
const outPath = join(epDir, 'voice/lines.json');
if (existsSync(outPath)) {
  const prev = new Map((JSON.parse(readFileSync(outPath, 'utf8')) as Line[]).map((l) => [l.id, l]));
  lines = lines.map((l) => {
    const old = prev.get(l.id);
    return old?.spoken && old.text === l.text ? {...l, spoken: old.spoken} : l;
  });
}
writeFileSync(join(epDir, 'voice/lines.json'), JSON.stringify(lines, null, 1));
console.log(`${lines.length} lines`);
