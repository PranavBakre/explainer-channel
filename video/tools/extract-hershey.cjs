// Usage: node tools/extract-hershey.cjs <font> <out.json> — single-stroke glyph paths for printable ASCII.
const h = require('hersheytext');
const fs = require('fs');
const [font, out] = process.argv.slice(2);
const f = h.getFontData(font);
const glyphs = {};
for (let c = 32; c < 127; c++) {
  const ch = String.fromCharCode(c);
  const g = f.getChar(ch);
  if (g) glyphs[ch] = {d: g.d || '', w: Number(g.width ?? g['horiz-adv-x'] ?? f.info['horiz-adv-x'])};
}
const capYs = (glyphs.H.d.match(/-?\d*\.?\d+/g) || []).map(Number).filter((_, i) => i % 2);
fs.writeFileSync(out, JSON.stringify({font, unitsPerEm: Number(f.info['units-per-em'] || 1000), ascent: Number(f.info.ascent || 800), capHeight: Math.max(...capYs), glyphs}));
console.log(font, Object.keys(glyphs).length, JSON.stringify(glyphs['a']).slice(0, 120));
