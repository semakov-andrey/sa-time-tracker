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
import type {
  IAddNewTrack,
  ISetCurrentTrack,
  ISetCurrentTimeTrack,
  ISetInTracking
} from 'store/actions/tracking.actions';
import type { IStates } from 'store/states';

interface IMapStates {
  tracks: Array<ITrack>;
  currentTrack: Nullable<ITrack>;
  currentTimeTrack: Nullable<ITimeTrack>;
  inTracking: boolean;
};

interface IMapActions {
  addNewTrack: (newTrack: ITrack) => IAddNewTrack;
  setCurrentTrack: (currentTrack: Nullable<ITrack>) => ISetCurrentTrack;
  setCurrentTimeTrack: (currentTimeTrack: Nullable<ITimeTrack>) => ISetCurrentTimeTrack;
  setInTracking: (inTrackingValue: boolean) => ISetInTracking;
};

const mapStates = ({ tracking }: IStates): IMapStates => tracking;

const mapActions: IMapActions = {
  addNewTrack,
  setCurrentTrack,
  setCurrentTimeTrack,
  setInTracking
};

export const trackingRepo = (): IMapStates & IMapActions =>
  repoFactory<IMapStates, IMapActions, (s: IStates) => IMapStates>(mapStates, mapActions);

iocContainer.set(STrackingRepo, trackingRepo);

