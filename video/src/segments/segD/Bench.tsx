import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {DocShot} from '../../components/DocShot';
import {ease, Studio} from '../../three/kit';
import {Bench, Calendar, Counter, GPU, RATES, SPACE, Sign, Stopwatch} from './props';

type Props = {duration: number; steps: number[]};

export const DEvidence: React.FC<Props & {kind: 'fast' | 'bcrypt' | 'scrypt' | 'owasp'}> = ({duration, steps, kind}) => {
  const frame = useCurrentFrame();
  const crop = kind === 'fast' ? frame < (steps[1] ?? 184) ? 'hc-md5.png' : frame < (steps[1] ?? 184) + 88 ? 'hc-sha1.png' : 'hc-sha256.png' : kind === 'owasp' ? 'owasp-quote.png' : `hc-${kind}.png`;
  return <AbsoluteFill className="d-evidence" style={{background: '#E9E5DD'}}>
    <style>{'.d-evidence img[src*="hc-"], .d-evidence img[src*="owasp-quote"] {width: 1428px; height: auto;} .d-evidence div[style*="bottom: 64px"] {bottom: 174px !important;}'}</style><AbsoluteFill style={{height: 'calc(100% + 110px)', transform: 'translateY(-110px)'}}><DocShot page={kind === 'owasp' ? 'owasp.png' : 'hashcat.png'} quote={crop} quoteStep={0} steps={[25]} duration={duration} source={kind === 'owasp' ? 'OWASP · Password Storage Cheat Sheet · F26' : 'Chick3nman · RTX 4090 · hashcat v6.2.6 · F23'} /></AbsoluteFill></AbsoluteFill>;
};

export const DGPUBench: React.FC<Props & {mode: 'intro' | 'space' | 'times' | 'bcrypt' | 'scrypt'}> = ({duration, mode}) => {
  const frame = useCurrentFrame();
  const timingPhase = mode === 'times' ? frame < 168 ? 0 : frame < 250 ? 1 : 2 : 0;
  const starts = [0, 168, 250];
  const lens = [130, 65, 76];
  const p = ease(frame, starts[timingPhase] + 8, starts[timingPhase] + lens[timingPhase]);
  const totalSec = SPACE / RATES[timingPhase];
  const seconds = totalSec * p;
  const calendarProgress = ease(frame, 4, Math.round(duration * 0.6));
  const bcDays = SPACE / RATES[3] / 86400;
  const scYears = SPACE / RATES[4] / (86400 * 365.25);
  return <Studio color="#344E58" duration={duration} angle={{from: [0, 4.4, 15], to: [0, 4.1, 14], target: [0, 1.9, 0], fov: 35}}>
    <Bench>
      <GPU frame={frame} />
      {mode === 'intro' ? <Counter title="hashcat v6.2.6" value="1 GPU · 24 GB" /> : null}
      {mode === 'space' ? <Counter mechanical title="a–z + 0–9 · 8 characters" value={Math.round(SPACE * ease(frame, 24, duration - 30)).toLocaleString('en-US', {minimumIntegerDigits: 13})} /> : null}
      {mode === 'times' ? <Stopwatch reading={p > 0.99 ? ['~17 s', '<1 min', '~2 min'][timingPhase] : `${seconds.toFixed(1)} s`} algorithm={['MD5', 'SHA-1', 'SHA-256'][timingPhase]} needle={seconds * Math.PI / 30} /> : null}
      {mode === 'bcrypt' || mode === 'scrypt' ? <Calendar flip={calendarProgress > 0 && calendarProgress < 0.99 ? (frame % 12) / 12 : 0} reading={mode === 'bcrypt' ? `~${Math.round(bcDays * calendarProgress)} days` : `${(scYears * calendarProgress).toFixed(1)} years`} algorithm={mode === 'bcrypt' ? 'bcrypt · cost 5' : 'scrypt · N = 16384'} /> : null}
      {mode === 'times' ? <Sign at={[-3.1, 0.75, 1.95]} text="36⁸ · FULL-SEARCH ESTIMATE" w={4.7} h={0.48} /> : null}
    </Bench>
  </Studio>;
};

export const DSlowBenchmark: React.FC<Props & {algorithm: 'bcrypt' | 'scrypt'}> = ({duration, algorithm}) => {
  const evidence = algorithm === 'bcrypt' ? 225 : 145;
  return <AbsoluteFill>
    <Sequence durationInFrames={evidence}><DEvidence duration={evidence} steps={[0]} kind={algorithm} /></Sequence>
    <Sequence from={evidence}><DGPUBench duration={duration - evidence} steps={[0]} mode={algorithm} /></Sequence>
  </AbsoluteFill>;
};
