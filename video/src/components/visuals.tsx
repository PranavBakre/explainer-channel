import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, enter, fonts, rise, tone, Tone} from '../theme';
import {currentStep, Label, Scramble, ShotProps, Stage, stepAt} from './base';

type Line = {text: string; tone?: Tone; mono?: boolean; size?: number; step?: number; serif?: boolean};

export const TextStack: React.FC<ShotProps<{kicker?: string; lines: Line[]; align?: 'center' | 'left'}>> = ({
  kicker,
  lines,
  steps,
  align = 'center',
}) => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <div style={{display: 'flex', flexDirection: 'column', gap: 28, alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align}}>
        {kicker ? <Label style={rise(frame, 0)}>{kicker}</Label> : null}
        {lines.map((l, i) => {
          const s = stepAt(steps, l.step ?? i);
          const size = l.size ?? (l.mono ? 64 : 72);
          return (
            <div
              key={i}
              style={{
                ...rise(frame, s),
                fontFamily: l.mono ? fonts.mono : l.serif === false ? fonts.sans : fonts.serif,
                fontSize: size,
                lineHeight: 1.12,
                color: tone(l.tone),
                maxWidth: 1500,
              }}
            >
              {l.text}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

export const ActTitle: React.FC<ShotProps<{act: string; title: string; tone?: Tone}>> = ({act, title, tone: t}) => {
  const frame = useCurrentFrame();
  const line = enter(frame, 4, 24);
  return (
    <Stage>
      <Label style={rise(frame, 0)} color={tone(t, 'amber')}>
        {act}
      </Label>
      <div style={{...rise(frame, 6), fontFamily: fonts.serif, fontSize: 120, marginTop: 20, textAlign: 'center'}}>{title}</div>
      <div style={{height: 3, width: 520 * line, background: tone(t, 'amber'), marginTop: 36}} />
    </Stage>
  );
};

export const BigNumber: React.FC<
  ShotProps<{value: number; label: string; prefix?: string; suffix?: string; tone?: Tone; note?: string; countFrames?: number}>
> = ({value, label, prefix = '', suffix = '', tone: t, note, steps, countFrames = 40}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, countFrames], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const eased = 1 - Math.pow(1 - p, 3);
  const shown = Math.round(value * eased).toLocaleString('en-US');
  return (
    <Stage>
      <div style={{fontFamily: fonts.serif, fontSize: 220, lineHeight: 1, color: tone(t, 'red'), ...rise(frame, 0)}}>
        {prefix}
        {shown}
        {suffix}
      </div>
      <div style={{...rise(frame, 8), fontSize: 44, marginTop: 24, color: colors.cream, fontWeight: 500}}>{label}</div>
      {note ? <div style={{...rise(frame, stepAt(steps, 1)), fontSize: 30, marginTop: 28, color: colors.slate}}>{note}</div> : null}
    </Stage>
  );
};

type Variant = {fromStep: number; rows: string[][]; highlight?: number[]; tone?: Tone; caption?: string};

export const DbTable: React.FC<
  ShotProps<{title: string; columns: string[]; rows: string[][]; secretCol?: number; secretTone?: Tone; variants?: Variant[]; caption?: string; rowStep?: boolean}>
> = ({title, columns, rows, secretCol = 1, secretTone = 'amber', variants = [], caption, steps, rowStep = false}) => {
  const frame = useCurrentFrame();
  const step = currentStep(steps, frame);
  const active = [...variants].filter((v) => v.fromStep <= step).pop();
  const data = active?.rows ?? rows;
  const changedAt = active ? stepAt(steps, active.fromStep) : 0;
  const cap = active?.caption ?? caption;
  return (
    <Stage>
      <div style={{width: 1500, ...rise(frame, 0)}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16}}>
          <Label>{title}</Label>
          <Label color={colors.slate} style={{letterSpacing: 1, textTransform: 'none', fontWeight: 400}}>
            {data.length} rows
          </Label>
        </div>
        <div style={{border: `2px solid ${colors.line}`, borderRadius: 10, overflow: 'hidden', background: colors.panel}}>
          <div style={{display: 'flex', background: '#1B2330', borderBottom: `2px solid ${colors.line}`}}>
            <Cell w={70} color={colors.slate}>#</Cell>
            {columns.map((c, i) => (
              <Cell key={c} flex={i === secretCol ? 2.2 : 1} color={colors.slate} bold>
                {c}
              </Cell>
            ))}
          </div>
          {data.map((r, ri) => {
            const appear = rowStep ? stepAt(steps, ri) : ri * 4;
            const hi = active?.highlight?.includes(ri);
            return (
              <div
                key={ri}
                style={{
                  display: 'flex',
                  borderBottom: ri === data.length - 1 ? 'none' : `1px solid ${colors.line}`,
                  background: hi ? `${tone(active?.tone, 'red')}22` : 'transparent',
                  opacity: enter(frame, appear, 10),
                }}
              >
                <Cell w={70} color={colors.slate}>{ri + 1}</Cell>
                {r.map((v, ci) => (
                  <Cell key={ci} flex={ci === secretCol ? 2.2 : 1} mono={ci >= secretCol} color={ci === secretCol ? tone(hi ? active?.tone : undefined, secretTone) : colors.cream}>
                    {ci === secretCol && active ? <Scramble text={v} start={changedAt} size={30} perChar={0.3} color={tone(hi ? active?.tone : undefined, secretTone)} /> : v}
                  </Cell>
                ))}
              </div>
            );
          })}
        </div>
        {cap ? <div style={{...rise(frame, changedAt + 10), marginTop: 28, fontSize: 36, color: colors.cream, textAlign: 'center'}}>{cap}</div> : null}
      </div>
    </Stage>
  );
};

const Cell: React.FC<{children: React.ReactNode; w?: number; flex?: number; color?: string; mono?: boolean; bold?: boolean}> = ({
  children,
  w,
  flex,
  color,
  mono,
  bold,
}) => (
  <div
    style={{
      width: w,
      flex: w ? undefined : flex ?? 1,
      padding: '18px 22px',
      fontFamily: mono ? fonts.mono : fonts.sans,
      fontSize: 30,
      fontWeight: bold ? 700 : 400,
      color,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }}
  >
    {children}
  </div>
);

type Pair = {input: string; output: string; note?: string};

export const HashMachine: React.FC<ShotProps<{algo: string; pairs: Pair[]; caption?: string; captionStep?: number; outputTone?: Tone}>> = ({
  algo,
  pairs,
  caption,
  captionStep,
  outputTone = 'slate',
  steps,
}) => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <div style={{display: 'flex', flexDirection: 'column', gap: 56, width: 1600}}>
        {pairs.map((p, i) => {
          const s = stepAt(steps, i);
          const pulse = interpolate(frame - s, [8, 16, 30], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 28, opacity: enter(frame, s)}}>
              <div style={{width: 300, textAlign: 'right', fontFamily: fonts.mono, fontSize: 48, color: colors.amber}}>{p.input}</div>
              <Arrow />
              <div
                style={{
                  padding: '22px 30px',
                  border: `2px solid ${colors.cream}`,
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 30,
                  letterSpacing: 2,
                  boxShadow: `0 0 ${40 * pulse}px ${colors.amber}`,
                  background: colors.panel,
                  whiteSpace: 'nowrap',
                }}
              >
                {algo}
              </div>
              <Arrow />
              <div style={{flex: 1, lineHeight: 1.35}}>
                <Scramble text={p.output} start={s + 10} size={30} color={tone(outputTone)} perChar={0.5} />
                {p.note ? <div style={{fontSize: 24, color: colors.slate, marginTop: 8, opacity: enter(frame, s + 40)}}>{p.note}</div> : null}
              </div>
            </div>
          );
        })}
        {caption ? (
          <div style={{...rise(frame, stepAt(steps, captionStep ?? pairs.length)), fontSize: 40, textAlign: 'center'}}>{caption}</div>
        ) : null}
      </div>
    </Stage>
  );
};

const Arrow: React.FC<{color?: string; back?: boolean}> = ({color = colors.slate, back}) => (
  <svg width="70" height="24" viewBox="0 0 70 24" style={{flexShrink: 0, transform: back ? 'scaleX(-1)' : undefined}}>
    <line x1="0" y1="12" x2="60" y2="12" stroke={color} strokeWidth="3" />
    <polyline points="52,4 62,12 52,20" fill="none" stroke={color} strokeWidth="3" />
  </svg>
);

export const KeyDiagram: React.FC<ShotProps<{plain: string; cipher: string; keyLabel: string; caption?: string; backStep?: number; captionStep?: number}>> = ({
  plain,
  cipher,
  keyLabel,
  caption,
  backStep = 1,
  captionStep = 2,
  steps,
}) => {
  const frame = useCurrentFrame();
  const back = stepAt(steps, backStep);
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 40, ...rise(frame, 0)}}>
        <Box color={colors.amber} mono>{plain}</Box>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
          <Label color={colors.cream}>encrypt</Label>
          <Arrow color={colors.cream} />
          <div style={{opacity: enter(frame, back)}}>
            <Arrow color={colors.red} back />
          </div>
          <Label color={colors.red} style={{opacity: enter(frame, back)}}>decrypt</Label>
        </div>
        <Box color={colors.slate} mono>
          <Scramble text={cipher} start={6} size={40} color={colors.slate} />
        </Box>
      </div>
      <div style={{...rise(frame, 10), marginTop: 56, display: 'flex', alignItems: 'center', gap: 18}}>
        <KeyIcon color={frame >= back ? colors.red : colors.cream} />
        <span style={{fontSize: 36, color: frame >= back ? colors.red : colors.cream}}>{keyLabel}</span>
      </div>
      {caption ? <div style={{...rise(frame, stepAt(steps, captionStep)), marginTop: 44, fontSize: 40, textAlign: 'center'}}>{caption}</div> : null}
    </Stage>
  );
};

const Box: React.FC<{children: React.ReactNode; color: string; mono?: boolean}> = ({children, color, mono}) => (
  <div
    style={{
      padding: '30px 40px',
      border: `2px solid ${color}`,
      borderRadius: 14,
      background: colors.panel,
      fontFamily: mono ? fonts.mono : fonts.sans,
      fontSize: 44,
      color,
      minWidth: 360,
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

const KeyIcon: React.FC<{color: string}> = ({color}) => (
  <svg width="64" height="32" viewBox="0 0 64 32">
    <circle cx="14" cy="16" r="11" fill="none" stroke={color} strokeWidth="4" />
    <line x1="25" y1="16" x2="60" y2="16" stroke={color} strokeWidth="4" />
    <line x1="50" y1="16" x2="50" y2="27" stroke={color} strokeWidth="4" />
    <line x1="58" y1="16" x2="58" y2="24" stroke={color} strokeWidth="4" />
  </svg>
);

export const LookupTable: React.FC<ShotProps<{title: string; rows: {password: string; hash: string}[]; target: string; matchRow: number; caption?: string}>> = ({
  title,
  rows,
  target,
  matchRow,
  caption,
  steps,
}) => {
  const frame = useCurrentFrame();
  const scanStart = stepAt(steps, 1);
  const scan = Math.min(matchRow, Math.max(0, Math.floor((frame - scanStart) / 6)));
  const found = frame >= scanStart + matchRow * 6 + 6;
  return (
    <Stage>
      <div style={{display: 'flex', gap: 80, alignItems: 'center', ...rise(frame, 0)}}>
        <div style={{width: 520}}>
          <Label>stolen hash</Label>
          <div style={{marginTop: 18, fontFamily: fonts.mono, fontSize: 30, color: found ? colors.red : colors.slate, wordBreak: 'break-all', lineHeight: 1.4}}>{target}</div>
        </div>
        <div style={{width: 900}}>
          <Label>{title}</Label>
          <div style={{marginTop: 18, border: `2px solid ${colors.line}`, borderRadius: 10, background: colors.panel, overflow: 'hidden'}}>
            {rows.map((r, i) => {
              const isScan = frame >= scanStart && i === scan && !found;
              const isHit = found && i === matchRow;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    padding: '14px 20px',
                    gap: 24,
                    fontFamily: fonts.mono,
                    fontSize: 26,
                    borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${colors.line}`,
                    background: isHit ? `${colors.red}33` : isScan ? '#ffffff10' : 'transparent',
                  }}
                >
                  <span style={{width: 200, color: colors.amber}}>{r.password}</span>
                  <span style={{color: isHit ? colors.red : colors.slate, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{r.hash}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {caption ? <div style={{...rise(frame, stepAt(steps, 2)), marginTop: 48, fontSize: 40, textAlign: 'center'}}>{caption}</div> : null}
    </Stage>
  );
};

type Bar = {label: string; value: number; display: string; tone?: Tone; step?: number};

export const RaceBars: React.FC<ShotProps<{title: string; bars: Bar[]; caption?: string; captionStep?: number; log?: boolean}>> = ({
  title,
  bars,
  caption,
  captionStep,
  log = true,
  steps,
}) => {
  const frame = useCurrentFrame();
  const max = Math.max(...bars.map((b) => (log ? Math.log10(b.value) : b.value)));
  return (
    <Stage>
      <div style={{width: 1500, ...rise(frame, 0)}}>
        <Label>{title}</Label>
        <div style={{display: 'flex', flexDirection: 'column', gap: 34, marginTop: 40}}>
          {bars.map((b, i) => {
            const s = (b.step ?? i) < 0 ? -1000 : stepAt(steps, b.step ?? i);
            const v = log ? Math.max(Math.log10(b.value), 0.3) : b.value;
            const w = (v / max) * 860 * enter(frame, s, 24);
            return (
              <div key={b.label} style={{display: 'flex', alignItems: 'center', gap: 28, opacity: enter(frame, s, 8)}}>
                <div style={{width: 220, fontSize: 34, fontWeight: 700, color: colors.cream}}>{b.label}</div>
                <div style={{height: 54, width: w, background: tone(b.tone, 'red'), borderRadius: 6}} />
                <div style={{fontFamily: fonts.mono, fontSize: 30, color: tone(b.tone, 'red'), opacity: enter(frame, s + 16), whiteSpace: 'nowrap'}}>{b.display}</div>
              </div>
            );
          })}
        </div>
        {log ? <div style={{marginTop: 24, fontSize: 22, color: colors.slate}}>log scale · guesses per second</div> : null}
        {caption ? <div style={{...rise(frame, stepAt(steps, captionStep ?? bars.length)), marginTop: 40, fontSize: 40, textAlign: 'center'}}>{caption}</div> : null}
      </div>
    </Stage>
  );
};

type Stat = {value: string; label: string; tone?: Tone; step?: number};

export const StatGrid: React.FC<ShotProps<{title?: string; items: Stat[]; caption?: string; captionStep?: number}>> = ({title, items, caption, captionStep, steps}) => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      {title ? <Label style={{...rise(frame, 0), marginBottom: 48}}>{title}</Label> : null}
      <div style={{display: 'flex', gap: 60, justifyContent: 'center'}}>
        {items.map((it, i) => (
          <div key={i} style={{...rise(frame, stepAt(steps, it.step ?? i)), textAlign: 'center', width: 440}}>
            <div style={{fontFamily: fonts.serif, fontSize: 112, color: tone(it.tone, 'amber'), lineHeight: 1}}>{it.value}</div>
            <div style={{fontSize: 30, marginTop: 18, color: colors.cream}}>{it.label}</div>
          </div>
        ))}
      </div>
      {caption ? <div style={{...rise(frame, stepAt(steps, captionStep ?? items.length)), marginTop: 64, fontSize: 40, textAlign: 'center'}}>{caption}</div> : null}
    </Stage>
  );
};

export const FlowDiagram: React.FC<ShotProps<{nodes: {label: string; sub?: string; tone?: Tone}[]; packet?: string; caption?: string; captionStep?: number}>> = ({
  nodes,
  packet,
  caption,
  captionStep,
  steps,
}) => {
  const frame = useCurrentFrame();
  const step = currentStep(steps, frame);
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        {nodes.map((n, i) => {
          const s = i < steps.length ? steps[i] : steps[steps.length - 1] + (i - steps.length + 1) * 20;
          const live = (i < steps.length ? step === i : i === nodes.length - 1) && frame >= s;
          return (
            <React.Fragment key={i}>
              {i > 0 ? (
                <div style={{opacity: enter(frame, s)}}>
                  <Arrow color={colors.slate} />
                </div>
              ) : null}
              <div
                style={{
                  ...rise(frame, s),
                  width: 300,
                  padding: '34px 22px',
                  borderRadius: 14,
                  border: `2px solid ${live ? tone(n.tone, 'amber') : colors.line}`,
                  background: colors.panel,
                  textAlign: 'center',
                }}
              >
                <div style={{fontSize: 36, fontWeight: 700, color: tone(n.tone, 'cream')}}>{n.label}</div>
                {n.sub ? <div style={{fontFamily: fonts.mono, fontSize: 26, color: colors.slate, marginTop: 12, wordBreak: 'break-all'}}>{n.sub}</div> : null}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {packet ? (
        <div style={{marginTop: 44, fontFamily: fonts.mono, fontSize: 34, color: colors.amber, ...rise(frame, 4)}}>{packet}</div>
      ) : null}
      {caption ? <div style={{...rise(frame, stepAt(steps, captionStep ?? nodes.length)), marginTop: 48, fontSize: 40, textAlign: 'center', maxWidth: 1400}}>{caption}</div> : null}
    </Stage>
  );
};

export const QuoteCard: React.FC<ShotProps<{quote: string; source: string; tone?: Tone; highlight?: string}>> = ({quote, source, tone: t, highlight}) => {
  const frame = useCurrentFrame();
  const parts = highlight ? quote.split(highlight) : [quote];
  return (
    <Stage>
      <div style={{maxWidth: 1400, borderLeft: `6px solid ${tone(t, 'teal')}`, paddingLeft: 48, ...rise(frame, 0)}}>
        <div style={{fontFamily: fonts.serif, fontSize: 64, lineHeight: 1.2}}>
          “{parts[0]}
          {highlight ? <span style={{color: tone(t, 'teal')}}>{highlight}</span> : null}
          {parts[1] ?? ''}”
        </div>
        <div style={{marginTop: 32, fontSize: 28, color: colors.slate, ...rise(frame, 10)}}>{source}</div>
      </div>
    </Stage>
  );
};

export const CodeCard: React.FC<ShotProps<{code: string; caption?: string; title?: string}>> = ({code, caption, title, steps}) => {
  const frame = useCurrentFrame();
  const lines = code.split('\n');
  return (
    <Stage>
      <div style={{width: 1400, ...rise(frame, 0)}}>
        {title ? <Label style={{marginBottom: 16}}>{title}</Label> : null}
        <div style={{background: colors.panel, border: `2px solid ${colors.line}`, borderRadius: 12, padding: '36px 44px'}}>
          {lines.map((l, i) => (
            <div key={i} style={{fontFamily: fonts.mono, fontSize: 34, lineHeight: 1.6, color: l.trim().startsWith('#') ? colors.slate : colors.cream, opacity: enter(frame, 4 + i * 3), whiteSpace: 'pre'}}>
              {l || ' '}
            </div>
          ))}
        </div>
        {caption ? <div style={{...rise(frame, stepAt(steps, 1)), marginTop: 36, fontSize: 40, textAlign: 'center'}}>{caption}</div> : null}
      </div>
    </Stage>
  );
};

export const Checklist: React.FC<ShotProps<{title: string; items: {text: string; tone?: Tone; step?: number}[]}>> = ({title, items, steps}) => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <div style={{width: 1300}}>
        <div style={{fontFamily: fonts.serif, fontSize: 84, ...rise(frame, 0), marginBottom: 48}}>{title}</div>
        {items.map((it, i) => {
          const s = stepAt(steps, it.step ?? i + 1);
          const c = tone(it.tone, 'teal');
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 32, marginBottom: 34, ...rise(frame, s)}}>
              <div style={{width: 52, height: 52, borderRadius: 10, border: `3px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <polyline points="5,16 12,23 25,7" fill="none" stroke={c} strokeWidth="4" strokeDasharray="40" strokeDashoffset={40 * (1 - enter(frame, s + 6))} />
                </svg>
              </div>
              <div style={{fontSize: 46, color: colors.cream}}>{it.text}</div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

export const SaltDiagram: React.FC<ShotProps<{password: string; users: {name: string; salt: string; hash: string}[]; caption?: string}>> = ({password, users, caption, steps}) => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <div style={{display: 'flex', flexDirection: 'column', gap: 44, width: 1650}}>
        {users.map((u, i) => {
          const s = stepAt(steps, i);
          return (
            <div key={u.name} style={{display: 'flex', alignItems: 'center', gap: 22, opacity: enter(frame, s)}}>
              <div style={{width: 150, fontSize: 32, fontWeight: 700}}>{u.name}</div>
              <span style={{fontFamily: fonts.mono, fontSize: 38, color: colors.amber}}>{password}</span>
              <span style={{fontSize: 38, color: colors.slate}}>+</span>
              <span style={{fontFamily: fonts.mono, fontSize: 38, color: colors.teal, padding: '6px 14px', border: `2px solid ${colors.teal}`, borderRadius: 8}}>{u.salt}</span>
              <Arrow />
              <div style={{flex: 1}}>
                <Scramble text={u.hash} start={s + 14} size={30} color={colors.cream} perChar={0.4} />
              </div>
            </div>
          );
        })}
      </div>
      {caption ? <div style={{...rise(frame, stepAt(steps, users.length)), marginTop: 56, fontSize: 40, textAlign: 'center'}}>{caption}</div> : null}
    </Stage>
  );
};

export const KAnonymity: React.FC<ShotProps<{password: string; hash: string; prefixLen?: number}>> = ({password, hash, prefixLen = 5, steps}) => {
  const frame = useCurrentFrame();
  const send = stepAt(steps, 1);
  const back = stepAt(steps, 2);
  const fly = interpolate(frame - send, [10, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3)});
  return (
    <Stage>
      <div style={{display: 'flex', gap: 120, alignItems: 'center'}}>
        <div style={{width: 760, padding: 40, border: `2px solid ${colors.line}`, borderRadius: 14, background: colors.panel, ...rise(frame, 0)}}>
          <Label>your device</Label>
          <div style={{fontFamily: fonts.mono, fontSize: 44, color: colors.amber, marginTop: 20}}>{password}</div>
          <div style={{fontSize: 24, color: colors.slate, margin: '18px 0 10px'}}>SHA-1</div>
          <div style={{fontFamily: fonts.mono, fontSize: 30, wordBreak: 'break-all', lineHeight: 1.4}}>
            <span style={{color: colors.amber, background: frame >= send ? `${colors.amber}22` : 'transparent'}}>{hash.slice(0, prefixLen)}</span>
            <span style={{color: colors.slate}}>{hash.slice(prefixLen)}</span>
          </div>
          <div style={{marginTop: 22, fontSize: 28, color: colors.teal, opacity: enter(frame, back + 10)}}>match checked here, on your device</div>
        </div>
        <div style={{width: 520, padding: 40, border: `2px solid ${colors.line}`, borderRadius: 14, background: colors.panel, ...rise(frame, 6)}}>
          <Label>Have I Been Pwned</Label>
          <div style={{fontFamily: fonts.mono, fontSize: 44, color: colors.amber, marginTop: 24, opacity: fly, transform: `translateX(${(1 - fly) * -200}px)`}}>{hash.slice(0, prefixLen)}…</div>
          <div style={{fontSize: 26, color: colors.slate, marginTop: 24, opacity: enter(frame, back)}}>sends back every leaked hash starting with {hash.slice(0, prefixLen)}</div>
        </div>
      </div>
    </Stage>
  );
};
