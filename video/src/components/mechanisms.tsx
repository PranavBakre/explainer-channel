import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {colors, enter, fonts, rise, tone, Tone} from '../theme';
import {Label, ShotProps, stepAt} from './base';
import {Drawn} from './drawn';
import {Fingerprint, hexBits} from './fingerprint';

const ease = (frame: number, start: number, dur: number) =>
  interpolate(frame - start, [0, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const At: React.FC<{x: number; y: number; o?: number; children: React.ReactNode; center?: boolean; style?: React.CSSProperties}> = ({
  x,
  y,
  o = 1,
  children,
  center,
  style,
}) =>
  o <= 0 ? null : (
    <div style={{position: 'absolute', left: x, top: y, opacity: o, transform: center ? 'translate(-50%, -50%)' : undefined, ...style}}>{children}</div>
  );

const Card: React.FC<{text: string; t?: Tone; size?: number}> = ({text, t = 'amber', size = 44}) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: size,
      color: tone(t),
      border: `2px solid ${tone(t)}`,
      background: colors.panel,
      borderRadius: 12,
      padding: `${size * 0.18}px ${size * 0.4}px`,
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

const Machine: React.FC<{x: number; y: number; w: number; h: number; label: string; start: number; seed?: number; busy?: number}> = ({
  x,
  y,
  w,
  h,
  label,
  start,
  seed = 1,
  busy = 0,
}) => {
  const frame = useCurrentFrame();
  const shake = busy > 0 && busy < 1 ? Math.sin(frame * 2.1) * 3 : 0;
  const teeth = Array.from({length: 7}, (_, i) => `${x + 30 + i * ((w - 60) / 6)},${y + h - 50 + (i % 2 ? -22 : 0)}`).join(' L ');
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translateX(${shake}px)`}}>
      <Drawn shape={{kind: 'rect', x, y, w, h}} start={start} dur={20} seed={seed} width={4} />
      <Drawn shape={{kind: 'path', d: `M ${teeth}`}} start={start + 14} dur={16} seed={seed + 3} color={colors.slate} width={3} />
      <At x={x + w / 2} y={y + 56} o={enter(frame, start + 10)} center>
        <div style={{fontFamily: fonts.sans, fontWeight: 700, fontSize: 32, letterSpacing: 2, color: colors.cream}}>{label}</div>
      </At>
    </div>
  );
};

const Caption: React.FC<{text?: string; start: number; t?: Tone; top?: boolean}> = ({text, start, t = 'cream', top}) => {
  const frame = useCurrentFrame();
  if (!text) return null;
  return (
    <AbsoluteFill style={{justifyContent: top ? 'flex-start' : 'flex-end', alignItems: 'center', paddingBottom: 190, paddingTop: 70}}>
      <div style={{...rise(frame, start), fontFamily: fonts.serif, fontSize: 58, color: tone(t)}}>{text}</div>
    </AbsoluteFill>
  );
};

const sweep = (frame: number, start: number, dur = 40) => interpolate(frame - start, [0, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// S06: the card goes into the machine and a fingerprint comes out; the way back is struck out.
export const HashGrinder: React.FC<ShotProps<{input: string; algo: string; hex: string; note?: string; caption?: string}>> = ({
  input,
  algo,
  hex,
  note,
  caption,
  steps,
}) => {
  const frame = useCurrentFrame();
  const [s0, s1, s2] = [0, 1, 2].map((k) => stepAt(steps, k));
  const go = ease(frame, s0 + 12, 30);
  const M = {x: 720, y: 260, w: 400, h: 300};
  return (
    <AbsoluteFill>
      <Machine {...M} label={algo} start={s0} busy={sweep(frame, s0 + 40, 30)} />
      <At x={lerp(170, M.x + 40, go)} y={380} o={1 - ease(frame, s0 + 36, 8)}>
        <Card text={input} />
      </At>
      <At x={1260} y={220} o={enter(frame, s0 + 40)}>
        <Fingerprint hex={hex} cell={21} reveal={sweep(frame, s0 + 42, 45)} />
      </At>
      <At x={1260} y={630} o={enter(frame, s1)} style={{width: 400, fontFamily: fonts.mono, fontSize: 25, lineHeight: 1.3, color: colors.cream, wordBreak: 'break-all'}}>
        {hex}
        {note ? <div style={{fontFamily: fonts.sans, fontSize: 24, color: colors.slate, marginTop: 10}}>{note}</div> : null}
      </At>
      <At x={170} y={380} o={enter(frame, s2) * 0.6}>
        <Card text={input} t="slate" />
      </At>
      <Drawn shape={{kind: 'path', d: 'M 1300 200 C 1100 60, 600 60, 330 350'}} start={s2 + 6} dur={26} seed={21} color={colors.slate} width={4} />
      <Drawn shape={{kind: 'line', x1: 760, y1: 60, x2: 860, y2: 160}} start={s2 + 34} dur={10} seed={22} color={colors.red} width={7} />
      <Drawn shape={{kind: 'line', x1: 860, y1: 60, x2: 760, y2: 160}} start={s2 + 42} dur={10} seed={23} color={colors.red} width={7} />
      <Caption text={caption} start={s2 + 60} />
    </AbsoluteFill>
  );
};

// S08: the stored fingerprint sits in the user's row; the typed password is hashed and laid against it.
export const LoginMatch: React.FC<ShotProps<{input: string; email: string; hex: string; caption?: string}>> = ({input, email, hex, caption, steps}) => {
  const frame = useCurrentFrame();
  const [s0, s1, s2, s3] = [0, 1, 2, 3].map((k) => stepAt(steps, k));
  const row = {x: 1150, y: 170, w: 600, h: 330};
  const M = {x: 520, y: 600, w: 320, h: 220};
  const go = ease(frame, s1 + 6, 30);
  const matched = ease(frame, s2, 20);
  const leaked = ease(frame, s3, 20);
  const bits = hexBits(hex);
  return (
    <AbsoluteFill>
      <Drawn shape={{kind: 'rect', ...row}} start={s0} dur={20} seed={31} width={4} color={leaked > 0.5 ? colors.red : colors.cream} />
      <At x={row.x + 36} y={row.y + 28} o={enter(frame, s0 + 8)}>
        <Label>stored row</Label>
        <div style={{fontFamily: fonts.sans, fontSize: 32, marginTop: 10, color: colors.slate}}>{email}</div>
      </At>
      <At x={row.x + 330} y={row.y + 40} o={enter(frame, s0 + 14)}>
        <Fingerprint hex={hex} cell={14} reveal={sweep(frame, s0 + 14, 40)} on={matched > 0 ? colors.teal : colors.cream} />
      </At>
      <Machine {...M} label="SHA-256" start={s1} seed={33} busy={sweep(frame, s1 + 34, 20)} />
      <At x={lerp(140, M.x + 30, go)} y={690} o={enter(frame, s1) * (1 - ease(frame, s1 + 32, 8))}>
        <Card text={input} />
      </At>
      <At x={M.x + M.w + 40} y={640} o={enter(frame, s1 + 52)}>
        <Fingerprint hex={hex} cell={14} reveal={sweep(frame, s1 + 52, 40)} on={matched > 0 ? colors.teal : colors.cream} />
      </At>
      <Drawn shape={{kind: 'arrow', x1: 1150, y1: 690, x2: 1460, y2: 530}} start={s1 + 95} dur={18} seed={35} color={colors.slate} />
      <At x={1290} y={600} o={enter(frame, s1 + 100)}>
        <Label>compare</Label>
      </At>
      <At x={1480} y={640} o={matched}>
        <div style={{fontFamily: fonts.serif, fontSize: 64, color: colors.teal}}>match ✓</div>
        <div style={{fontFamily: fonts.sans, fontSize: 30, color: colors.teal}}>{bits.length} of {bits.length} bits</div>
      </At>
      <At x={row.x + 36} y={row.y + 250} o={leaked}>
        <div style={{fontFamily: fonts.sans, fontWeight: 700, fontSize: 28, color: colors.red, letterSpacing: 2}}>LEAKED · fingerprints only</div>
      </At>
      <Caption text={caption} start={s3 + 30} top />
    </AbsoluteFill>
  );
};

// S10: the same password with two different salts gives two unrelated fingerprints.
export const SaltGrinder: React.FC<ShotProps<{password: string; users: {name: string; salt: string; hash: string}[]; caption?: string}>> = ({
  password,
  users,
  caption,
  steps,
}) => {
  const frame = useCurrentFrame();
  const [s0, s1] = [0, 1].map((k) => stepAt(steps, k));
  return (
    <AbsoluteFill>
      {users.map((u, i) => {
        const st = s0 + i * 50;
        const y = 210 + i * 330;
        const go = ease(frame, st + 14, 26);
        return (
          <React.Fragment key={u.name}>
            <At x={150} y={y - 10} o={enter(frame, st)}>
              <Label>{u.name}</Label>
            </At>
            <At x={lerp(150, 330, go)} y={y + 40} o={enter(frame, st)}>
              <Card text={password} size={38} />
            </At>
            <At x={lerp(150, 330, go)} y={y + 120} o={enter(frame, st + 6)}>
              <Card text={`+ ${u.salt}`} t="teal" size={30} />
            </At>
            <Drawn shape={{kind: 'arrow', x1: 640, y1: y + 110, x2: 770, y2: y + 110}} start={st + 30} dur={12} seed={45 + i} color={colors.slate} />
            <Machine x={790} y={y} w={300} h={220} label="SHA-256" start={st} seed={40 + i} busy={sweep(frame, st + 40, 20)} />
            <At x={1200} y={y - 10} o={enter(frame, st + 44)}>
              <Fingerprint hex={u.hash} cell={14} reveal={sweep(frame, st + 46, 36)} />
            </At>
          </React.Fragment>
        );
      })}
      <At x={1520} y={520} o={enter(frame, s0 + 140)} center>
        <div style={{fontFamily: fonts.serif, fontSize: 120, color: colors.red}}>≠</div>
      </At>
      <Caption text={caption} start={s1} />
    </AbsoluteFill>
  );
};

// S04: the card locked in a box; one key opens it again.
export const LockBox: React.FC<ShotProps<{plain: string; cipher: string; caption?: string}>> = ({plain, cipher, caption, steps}) => {
  const frame = useCurrentFrame();
  const [s0, s1, s2] = [0, 1, 2].map((k) => stepAt(steps, k));
  const B = {x: 710, y: 300, w: 500, h: 300};
  const into = ease(frame, s0 + 20, 30);
  const keyIn = ease(frame, s2 + 10, 34);
  const pop = ease(frame, s2 + 50, 24);
  return (
    <AbsoluteFill>
      <Drawn shape={{kind: 'rect', ...B}} start={s0} dur={20} seed={51} width={5} />
      <Drawn shape={{kind: 'ellipse', x: B.x + B.w / 2, y: B.y + B.h - 70, w: 46, h: 46}} start={s0 + 16} dur={12} seed={52} color={colors.slate} />
      <At x={lerp(160, B.x + 90, into)} y={B.y + 80} o={1 - ease(frame, s0 + 48, 8)}>
        <Card text={plain} />
      </At>
      <At x={B.x + B.w / 2} y={B.y + 110} o={enter(frame, s1)} center>
        <div style={{fontFamily: fonts.mono, fontSize: 44, color: colors.slate}}>{cipher}</div>
      </At>
      {/* the key: a drawn bow and shaft that slides into the keyhole */}
      <div style={{position: 'absolute', inset: 0, transform: `translate(${lerp(0, 10, keyIn)}px, ${lerp(0, -300, keyIn)}px)`, opacity: enter(frame, s0 + 30)}}>
        <Drawn shape={{kind: 'ellipse', x: 650, y: 830, w: 80, h: 80}} start={s0 + 30} dur={14} seed={53} color={colors.amber} width={5} />
        <Drawn shape={{kind: 'path', d: 'M 690 830 L 950 830 M 900 830 L 900 862 M 935 830 L 935 856'}} start={s0 + 38} dur={14} seed={54} color={colors.amber} width={5} />
      </div>
      <At x={590} y={900} o={enter(frame, s0 + 40) * (1 - keyIn)}>
        <Label color={colors.amber}>one secret key</Label>
      </At>
      <At x={lerp(B.x + 90, 1320, pop)} y={lerp(B.y + 80, 420, pop)} o={pop}>
        <Card text={plain} t="red" />
      </At>
      <Caption text={caption} start={s2 + 70} t="red" />
    </AbsoluteFill>
  );
};

// S05: one key opens every box in turn; plain-text hints sit beside some of them.
export const KeyCascade: React.FC<ShotProps<{cols?: number; rows?: number; hints: {at: number; text: string}[]; caption?: string}>> = ({
  cols = 6,
  rows = 4,
  hints,
  caption,
  steps,
}) => {
  const frame = useCurrentFrame();
  const [s0, s1] = [0, 1].map((k) => stepAt(steps, k));
  const W = 200;
  const H = 110;
  const gx = 60;
  const gy = 50;
  const x0 = (1920 - (cols * W + (cols - 1) * gx)) / 2;
  const y0 = 150;
  const n = cols * rows;
  const keyT = interpolate(frame - s0 - 20, [0, n * 4], [0, n - 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const kc = Math.round(keyT);
  return (
    <AbsoluteFill>
      {Array.from({length: n}, (_, i) => {
        const cx = x0 + (i % cols) * (W + gx);
        const cy = y0 + Math.floor(i / cols) * (H + gy);
        const open = frame >= s0 + 20 + i * 4 + 4;
        const hint = hints.find((h) => h.at === i);
        return (
          <React.Fragment key={i}>
            <Drawn shape={{kind: 'rect', x: cx, y: cy, w: W, h: H}} start={s0 + (i % 7)} dur={14} seed={60 + i} color={open ? colors.red : colors.slate} width={3} />
            <At x={cx + W / 2} y={cy + H / 2} center>
              <div style={{fontFamily: fonts.mono, fontSize: 24, color: open ? colors.amber : colors.slate}}>{open ? 'password' : '•••••••'}</div>
            </At>
            {hint ? (
              <At x={cx + W / 2} y={cy + H + 22} o={enter(frame, s1)} center>
                <div style={{fontFamily: fonts.sans, fontSize: 22, color: colors.red, whiteSpace: 'nowrap'}}>hint: “{hint.text}”</div>
              </At>
            ) : null}
          </React.Fragment>
        );
      })}
      <At x={x0 + (kc % cols) * (W + gx) + W - 30} y={y0 + Math.floor(kc / cols) * (H + gy) - 20} o={frame >= s0 + 20 && frame < s0 + 30 + n * 4 ? 1 : 0}>
        <svg width={90} height={40} style={{transform: 'rotate(-20deg)'}}>
          <circle cx={18} cy={20} r={14} fill="none" stroke={colors.amber} strokeWidth={5} />
          <path d="M 32 20 L 86 20 M 70 20 L 70 34 M 82 20 L 82 30" stroke={colors.amber} strokeWidth={5} fill="none" />
        </svg>
      </At>
      <Caption text={caption} start={s1 + 20} t="red" />
    </AbsoluteFill>
  );
};

// S09: identical passwords give identical fingerprints, so a table computed in advance finds the stolen one.
export const LookupWall: React.FC<ShotProps<{stolen: string; rows: {password: string; hash: string}[]; caption?: string}>> = ({
  stolen,
  rows,
  caption,
  steps,
}) => {
  const frame = useCurrentFrame();
  const [s0, s1, s2] = [0, 1, 2].map((k) => stepAt(steps, k));
  const hit = rows.findIndex((r) => r.hash === stolen);
  const scan = interpolate(frame - s2 - 10, [0, 70], [0, hit], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const found = frame >= s2 + 84;
  const rowY = (i: number) => 150 + i * 92;
  return (
    <AbsoluteFill>
      <At x={170} y={250} o={enter(frame, s0)}>
        <Label color={colors.red}>stolen fingerprint · no salt</Label>
        <div style={{marginTop: 18}}>
          <Fingerprint hex={stolen} cols={16} cell={22} reveal={sweep(frame, s0 + 4, 30)} on={colors.red} />
        </div>
        <div style={{marginTop: 18, fontFamily: fonts.sans, fontSize: 26, color: colors.slate, width: 400, opacity: enter(frame, s0 + 40)}}>
          same password → same fingerprint, every time
        </div>
      </At>
      <At x={980} y={95} o={enter(frame, s1)}>
        <Label>attacker's table · computed in advance</Label>
      </At>
      {rows.map((r, i) => {
        const o = enter(frame, s1 + 6 + i * 6);
        const lit = frame >= s2 + 10 && Math.round(scan) === i;
        const isHit = found && i === hit;
        return (
          <At key={i} x={980} y={rowY(i)} o={o}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                padding: '8px 18px',
                borderRadius: 10,
                background: isHit ? 'rgba(255,90,78,0.18)' : lit ? 'rgba(242,237,228,0.08)' : 'transparent',
                border: `2px solid ${isHit ? colors.red : 'transparent'}`,
              }}
            >
              <Fingerprint hex={r.hash} cols={32} cell={6} on={isHit ? colors.red : colors.cream} />
              <div style={{fontFamily: fonts.mono, fontSize: 34, color: colors.amber, width: 240}}>{r.password}</div>
            </div>
          </At>
        );
      })}
      <Drawn shape={{kind: 'arrow', x1: 580, y1: 480, x2: 965, y2: rowY(hit) + 34}} start={s2 + 84} dur={16} seed={71} color={colors.red} width={4} />
      <Caption text={caption} start={s2 + 100} t="red" />
    </AbsoluteFill>
  );
};

type Station = {label: string; verdict: string; holds?: boolean; step: number};

// S18: the card passes every storage method in turn; each failure lights, the last one holds.
export const ChainLine: React.FC<ShotProps<{stations: Station[]; card: string}>> = ({stations, card, steps}) => {
  const frame = useCurrentFrame();
  const W = 290;
  const gap = 50;
  const x0 = (1920 - (stations.length * W + (stations.length - 1) * gap)) / 2;
  const at = stations.map((s, i) => stepAt(steps, s.step) + (i - stations.findIndex((x) => x.step === s.step)) * 70);
  const pos = at.reduce((p, a, i) => p + ease(frame, a, 24) * (i === 0 ? 0 : 1), 0);
  const cardX = x0 + pos * (W + gap) + W / 2;
  return (
    <AbsoluteFill>
      <At x={cardX} y={300} o={enter(frame, at[0])} center>
        <Card text={card} size={36} />
      </At>
      {stations.map((s, i) => {
        const x = x0 + i * (W + gap);
        const lit = frame >= at[i] + 24;
        const c = lit ? (s.holds ? colors.teal : colors.red) : colors.slate;
        return (
          <React.Fragment key={i}>
            <Drawn shape={{kind: 'rect', x, y: 400, w: W, h: 220}} start={at[0] + i * 4} dur={16} seed={80 + i} color={c} width={4} />
            <At x={x + W / 2} y={510} o={enter(frame, at[0] + i * 4 + 6)} center>
              <div style={{fontFamily: fonts.sans, fontWeight: 700, fontSize: 30, color: colors.cream, textAlign: 'center', width: W - 30}}>{s.label}</div>
            </At>
            <At x={x + W / 2} y={690} o={lit ? enter(frame, at[i] + 24) : 0} center>
              <div style={{fontFamily: fonts.serif, fontSize: 40, color: c, textAlign: 'center', width: W}}>{s.verdict}</div>
            </At>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
