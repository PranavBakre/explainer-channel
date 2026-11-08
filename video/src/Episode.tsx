import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background} from './components/base';
import * as visuals from './components/visuals';
import {SceneTransition} from './transitions';
import {BuiltEpisode, BuiltShot} from './types';

const registry = visuals as unknown as Record<string, React.FC<Record<string, unknown>>>;

const SFX_VOLUME = {tick: 0.18, hit: 0.35, whoosh: 0.2};

const SCALE: Record<string, number> = {
  DbTable: 1.1, TextStack: 1.3, BigNumber: 1.25, ActTitle: 1.25, StatGrid: 1.2, QuoteCard: 1.15,
  Checklist: 1.25, KAnonymity: 1.15, KeyDiagram: 1.5, CodeCard: 1.2, LookupTable: 1.1, RaceBars: 1.1,
  FlowDiagram: 1.05, HashMachine: 1.08, SaltDiagram: 1,
};

const PUSH_IN = 0.03;

const Shot: React.FC<{shot: BuiltShot}> = ({shot}) => {
  const frame = useCurrentFrame();
  const Visual = registry[shot.visual];
  if (!Visual) throw new Error(`Unknown visual ${shot.visual}`);
  const base = (shot.props.scale as number | undefined) ?? SCALE[shot.visual] ?? 1;
  const scale = base * (1 + (PUSH_IN * frame) / shot.duration);
  // Stage content centres at y≈503 of 1080 because its bottom padding is larger than its top.
  return (
    <AbsoluteFill style={{transform: `scale(${scale})`, transformOrigin: '50% 46.6%'}}>
      <Visual {...shot.props} steps={shot.steps} />
    </AbsoluteFill>
  );
};

export const Episode: React.FC<{data: BuiltEpisode}> = ({data}) => (
  <AbsoluteFill>
    <Background />
    {data.scenes.map((scene) => (
      <Sequence key={scene.id} from={scene.from} durationInFrames={scene.duration} name={scene.id}>
        <SceneTransition type={scene.transitionIn}>
          {scene.shots.map((shot, i) => (
            <Sequence key={i} from={shot.from} durationInFrames={shot.duration} name={`${scene.id}:${shot.visual}`}>
              <Shot shot={shot} />
              {(shot.sfx ?? []).map((s, j) => (
                <Sequence key={j} from={s.at} durationInFrames={45}>
                  <Audio src={staticFile(`sfx/${s.kind}.wav`)} volume={SFX_VOLUME[s.kind]} />
                </Sequence>
              ))}
            </Sequence>
          ))}
        </SceneTransition>
      </Sequence>
    ))}
    {data.audio.map((a) => (
      <Sequence key={a.file} from={a.from} name={a.file}>
        <Audio src={staticFile(`${data.id}/${a.file}`)} />
      </Sequence>
    ))}
    {data.music ? <Audio src={staticFile(`${data.id}/${data.music.file}`)} volume={data.music.volume} /> : null}
  </AbsoluteFill>
);
