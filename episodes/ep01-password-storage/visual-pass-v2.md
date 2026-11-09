# EP01 visual pass v2 — show the mechanism, not a card about it

Operator feedback on v1: "fully text based, not many visuals". v1 put the explanation in the narration and illustrated it with typeset cards. v2 makes each mechanism something the viewer watches happen.

## Rules
1. **One object.** The password is a physical card, amber, `mango@123`, that travels through every machine. Same model in every scene.
2. **Hashes are pictures of real data.** A SHA-256 output is drawn as its 256 bits on a 16×16 grid (1 = lit cell). Every grid on screen is computed from the real hash. The avalanche is the count of cells that differ.
3. **Text only for numbers and quotes.** Labels are short, drawn by the rough layer, and appear on the word that names them.
4. **Every beat changes the picture.** No hold over 8 s without a new event (camera move, element arrival, highlight).
5. **Deterministic.** All randomness is seeded by frame or index; no simulation state carried between frames (Remotion renders frames out of order).

## Layers
| Layer | Tool | Used for |
|---|---|---|
| 3D | `@remotion/three` (React Three Fiber), flat-shaded low-poly, palette colours only, one key light + rim | card, lockboxes, grinder, lookup wall, GPU swarm, factory line |
| Drawn | rough.js SVG, stroke-dash reveal | arrows, circles, underlines, short labels |
| 2D data | SVG | fingerprint grids, bit-diff, distance-as-time scale |
| Type | existing components | big numbers, NIST quotes |

## Scene plan
| Scene | v1 | v2 |
|---|---|---|
| S01 | table card | 3D database row; the password slot shows a fingerprint grid, then (bad site) the plain card |
| S03 | table | card dropped into an open drawer; a drawn hand copies the whole drawer |
| S04–S05 | key diagram, text | card into a lockbox; one key; Adobe: the same key opens a wall of boxes in a cascade |
| S06 | hash string | the grinder: card in, fingerprint grid out; no way back (reverse arrow crossed out) |
| S07 | two strings | hunter2 / hunter3 grids side by side; differing cells pulse red; counter to 146 |
| S08 | flow boxes | login: typed card → grinder → grid laid over the stored grid, cells match, gate opens |
| S09 | lookup table | camera flies along a wall of precomputed grids; the stolen grid finds its twin; the card flips over behind it |
| S10 | salt diagram | salt grains fall into the grinder; same card twice → two different grids |
| S11–S12 | bars | GPU swarm: guess particles pour through the grinder; density = guesses/s (MD5 firehose, SHA-256 stream) |
| S13 | bars | heavy grinder (bcrypt), then a memory tank that must fill per guess (scrypt); the swarm slows to a trickle |
| S12–S13 | stat grid | time as distance: 17 s = 1 cm on a ruler; zoom out to 177 days ≈ 9 km, 12.5 years ≈ 230 km (map scale) |
| S14 | code card | the stored line splits into three labelled physical parts: recipe, salt, fingerprint |
| S15 | flow | card travels a tunnel (TLS) to the server, ground into a grid, compared, discarded |
| S16 | quote cards | keep the quotes (they are evidence), each with a drawn mark on the key phrase |
| S17 | k-anonymity panel | phone sends five characters; a crowd of suffix chips returns; the phone finds its match locally |
| S18 | text list | factory line: the card passes all five machines; each failure lights in order, the last holds |

## Pilot (before rollout)
S07 fingerprint avalanche, S12 GPU swarm, S17 k-anonymity. Stills at 3 points per shot; check style coherence of 3D + drawn + type together before building the rest.
