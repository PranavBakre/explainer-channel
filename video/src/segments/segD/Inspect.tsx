import React from 'react';
import {Freeze} from 'remotion';
import {DAttack, DHeap} from './Attack';
import {DEvidence, DGPUBench, DSlowBenchmark} from './Bench';
import {DPepper, DRecipe, DRehash, DSlowMachine} from './Slow';
const visuals = {DAttack, DHeap, DEvidence, DGPUBench, DSlowBenchmark, DPepper, DRecipe, DRehash, DSlowMachine};
export const DInspect: React.FC<{visual: keyof typeof visuals; shotProps: object; shotDuration: number; shotSteps: number[]; sample?: number}> = ({visual, shotProps, shotDuration, shotSteps, sample}) => {
  const Visual = visuals[visual] as React.FC<{duration: number; steps: number[]}>;
  const content = <Visual {...shotProps} duration={shotDuration} steps={shotSteps} />;
  return sample === undefined ? content : <Freeze frame={sample}>{content}</Freeze>;
};
