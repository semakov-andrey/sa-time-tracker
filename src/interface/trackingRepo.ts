import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';

export interface ITrackingRepo {
  tracks: Array<ITrack>;
  currentTrack: Nullable<ITrack>;
  currentTimeTrack: Nullable<ITimeTrack>;
  inTracking: boolean;
  addNewTrack: (newTrack: ITrack) => unknown;
  setCurrentTrack: (currentTrack: Nullable<ITrack>) => unknown;
  setCurrentTimeTrack: (currentTimeTrack: Nullable<ITimeTrack>) => unknown;
  setInTracking: (inTrackingValue: boolean) => unknown;
};

export const STrackingRepo = Symbol('trackingRepo');
