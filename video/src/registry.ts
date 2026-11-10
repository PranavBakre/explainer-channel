import React from 'react';
import * as visuals from './components/visuals';
import {Avalanche} from './components/fingerprint';
import {KAnonExchange} from './components/KAnonExchange';
import {ChainLine, HashGrinder, KeyCascade, LockBox, LoginMatch, LookupWall, SaltGrinder} from './components/mechanisms';
import {GuessStream} from './components/three/GuessStream';
import {MachineSet} from './three/sets/MachineSet';
import {LightTableSet} from './three/sets/LightTableSet';
import {CatalogSet} from './three/sets/CatalogSet';
import {LockboxSet} from './three/sets/LockboxSet';
import {LottieShot} from './components/LottieShot';
import {DocShot} from './components/DocShot';
import {FootageShot} from './components/FootageShot';
import {segA} from './segments/segA';
import {segB} from './segments/segB';
import {segC} from './segments/segC';
import {segD} from './segments/segD';
import {segE} from './segments/segE';


export const registry = {...visuals, Avalanche, KAnonExchange, GuessStream, ChainLine, HashGrinder, KeyCascade, LockBox, LoginMatch, LookupWall, SaltGrinder, MachineSet, LightTableSet, CatalogSet, LockboxSet, LottieShot, DocShot, FootageShot, ...segA, ...segB, ...segC, ...segD, ...segE} as unknown as Record<string, React.FC<Record<string, unknown>>>;

