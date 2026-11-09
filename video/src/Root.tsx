import React from 'react';
import {Composition} from 'remotion';
import {Episode} from './Episode';
import {Thumbnail} from './Thumbnail';
import {HashMachineSet} from './three/HashMachineSet';
import {BuiltEpisode} from './types';
import ep01 from './episodes/ep01.json';

const episodes = [ep01 as BuiltEpisode];

export const Root: React.FC = () => (
  <>
    {episodes.map((data) => (
      <Composition
        key={data.id}
        id={data.id}
        component={Episode}
        durationInFrames={data.durationInFrames}
        fps={data.fps}
        width={data.width}
        height={data.height}
        defaultProps={{data}}
      />
    ))}
    <Composition id="proto-hash" component={HashMachineSet} durationInFrames={300} fps={30} width={1920} height={1080} defaultProps={{input: 'mango@123', hex: '81c68634d1b211e0d5632839f7efc8601c743f1ef0c94da8220e26ab221efff1'}} />
    <Composition id="thumb-ep01" component={Thumbnail} durationInFrames={1} fps={30} width={1280} height={720} />
  </>
);
