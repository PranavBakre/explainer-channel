export type Transition = 'cut' | 'fade' | 'push' | 'zoom' | 'wipe';
export type Sfx = 'tick' | 'hit' | 'whoosh';

export type BuiltShot = {
  visual: string;
  props: Record<string, unknown>;
  from: number;
  duration: number;
  steps: number[];
  sfx?: {kind: Sfx; at: number}[];
};

export type BuiltScene = {
  id: string;
  act: number;
  transitionIn: Transition;
  from: number;
  duration: number;
  shots: BuiltShot[];
};

export type BuiltEpisode = {
  id: string;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  scenes: BuiltScene[];
  audio: {file: string; from: number}[];
  music?: {file: string; volume: number};
};
