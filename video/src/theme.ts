import {loadFont as loadSerif} from '@remotion/google-fonts/InstrumentSerif';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import {Easing, interpolate} from 'remotion';

const serif = loadSerif('normal', {weights: ['400'], subsets: ['latin']});
const inter = loadInter('normal', {weights: ['400', '500', '700'], subsets: ['latin']});
const mono = loadMono('normal', {weights: ['400', '700'], subsets: ['latin']});

export const fonts = {
  serif: serif.fontFamily,
  sans: inter.fontFamily,
  mono: mono.fontFamily,
};

export const colors = {
  ink: '#0B0F14',
  panel: '#141A22',
  line: '#26303C',
  cream: '#F2EDE4',
  slate: '#6B7685',
  amber: '#FFB224',
  red: '#FF5A4E',
  teal: '#3DDC97',
};

export type Tone = 'amber' | 'red' | 'teal' | 'cream' | 'slate';
export const tone = (t: Tone | undefined, fallback: Tone = 'cream') => colors[t ?? fallback];

export const ENTER = 15;
export const EXIT = 9;

export const enter = (frame: number, start = 0, dur = ENTER) =>
  interpolate(frame - start, [0, dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const rise = (frame: number, start = 0) => {
  const p = enter(frame, start);
  return {opacity: p, transform: `translateY(${(1 - p) * 24}px)`};
};
