import React from 'react';
import {AbsoluteFill} from 'remotion';
import {LottieShot} from '../../components/LottieShot';
import {DocShot} from '../../components/DocShot';

type Props = {duration: number};
export const ELogin: React.FC<Props> = ({duration}) => <LottieShot file="s15-login" scale={1} duration={duration} />;
export const EEmail: React.FC<Props> = ({duration}) => <LottieShot file="s15-email" scale={1} duration={duration} />;
export const ECheck: React.FC<Props> = ({duration}) => <LottieShot file="s17-check" scale={1} duration={duration} />;
export const EManager: React.FC<Props> = ({duration}) => <LottieShot file="s18-manager" scale={1} duration={duration} />;
export const EHibpSource: React.FC<Props> = ({duration}) => (
  <AbsoluteFill style={{background: '#E9E5DD'}}>
    <AbsoluteFill style={{height: 1000}}>
      <DocShot page="hibp.png" quote="hibp-quote.png" source="Have I Been Pwned · Pwned Passwords" steps={[0, 55]} duration={duration} />
    </AbsoluteFill>
  </AbsoluteFill>
);
