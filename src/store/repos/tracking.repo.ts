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

import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';
import type { IStates } from 'store/states';

type ParamsState = Array<ITrack> | Nullable<ITrack> | Nullable<ITimeTrack> | boolean;
type ParamsActions = ITrack & Nullable<ITimeTrack> & boolean;

type TMapStates = Record<string, ParamsState>;
type TMapActions = Record<string, (...args: Array<ParamsActions>) => Action>;

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
  repoFactory<(state: IStates) => TMapStates, ParamsActions>(mapStates, mapActions);

iocContainer.set(STrackingRepo, trackingRepo);

