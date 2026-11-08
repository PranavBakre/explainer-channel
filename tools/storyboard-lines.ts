// Usage: bun tools/storyboard-lines.ts <episode-dir> — writes voice/lines.json from storyboard.json.
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const epDir = process.argv[2];
const sb = JSON.parse(readFileSync(join(epDir, 'storyboard.json'), 'utf8'));
const lines = sb.scenes.flatMap((s: {shots: {beats: {id: string; vo: string}[]}[]}) =>
  s.shots.flatMap((sh) => sh.beats.map((b) => ({id: b.id, text: b.vo}))),
);
writeFileSync(join(epDir, 'voice/lines.json'), JSON.stringify(lines, null, 1));
console.log(`${lines.length} lines`);
