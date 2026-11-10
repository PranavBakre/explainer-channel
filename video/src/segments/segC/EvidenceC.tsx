import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {DocShot} from '../../components/DocShot';
import {ease} from '../../three/kit';

export const EvidenceC: React.FC<{year: '2012' | '2016'; steps: number[]; duration: number}> = ({year, steps, duration}) => {
  const frame = useCurrentFrame();
  const detail = year === '2016' ? ease(frame, duration * 0.62, duration * 0.62 + 15) : 0;
  return <AbsoluteFill data-seg-c-evidence style={{transform: 'translateY(-60px) scale(0.95)', background: '#E9E5DD'}}>
    <style>{`[data-seg-c-evidence] img[src*="linkedin-${year}-quote.png"] {clip-path: inset(${year === '2012' ? '15px 0 0' : '15px 0 30px'});}`}</style>
    <DocShot page={`linkedin-${year}.png`} quote={`linkedin-${year}-quote.png`} source={year === '2012' ? 'GovInfoSecurity · LinkedIn: Hashed Passwords Breached · June 2012' : 'Associated Press / Phys.org · LinkedIn confirms 2012 hack exposed 117M user passwords · May 2016'} steps={[steps[0] ?? 0, 42]} duration={duration} />
    {year === '2016' ? <div style={{position: 'absolute', left: 255, top: 440, width: 1410, height: 180, overflow: 'hidden', opacity: detail, background: '#FFFFFF'}}>
      <Img src={staticFile('assets/shots/linkedin-2016.png')} style={{position: 'absolute', width: 3072, height: 1728, maxWidth: 'none', left: -640, top: -496}} />
    </div> : null}
  </AbsoluteFill>;
};
