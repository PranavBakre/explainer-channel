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

export const registry = {...visuals, Avalanche, KAnonExchange, GuessStream, ChainLine, HashGrinder, KeyCascade, LockBox, LoginMatch, LookupWall, SaltGrinder, MachineSet, LightTableSet, CatalogSet, LockboxSet} as unknown as Record<string, React.FC<Record<string, unknown>>>;

