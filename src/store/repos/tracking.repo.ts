import { Action } from 'redux';

import { STrackingRepo } from 'interface/interfaces/trackingRepo';
import {
  addNewTrack,
  setCurrentTrack,
  setCurrentTimeTrack,
  setInTracking
} from 'store/actions/tracking.actions';
import { iocContainer } from 'utils/di';
import { repoFactory } from 'utils/repo';

import type { IStates } from 'store/states';

type TMapStates = Record<string, unknown>;
type TMapActions = Record<string, (...args: Array<never>) => Action>;

const mapStates = ({ tracking: {
  tracks,
  currentTrack,
  currentTimeTrack,
  inTracking
} }: IStates): TMapStates => ({
  tracks,
  currentTrack,
  currentTimeTrack,
  inTracking
});

const mapActions: TMapActions = {
  addNewTrack,
  setCurrentTrack,
  setCurrentTimeTrack,
  setInTracking
};

export const trackingRepo = (): TMapStates & TMapActions =>
  repoFactory(mapStates, mapActions);

iocContainer.set(STrackingRepo, trackingRepo);

