import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';

export interface ITrackingRepo {
  tracks: Array<ITrack>;
  currentTrack: ITrack | null;
  currentTimeTrack: ITimeTrack | null;
  inTracking: boolean;
  addNewTrack: (newTrack: ITrack) => unknown;
  setCurrentTrack: (currentTrack: ITrack | null) => unknown;
  setCurrentTimeTrack: (currentTimeTrack: ITimeTrack | null) => unknown;
  setInTracking: (inTrackingValue: boolean) => unknown;
};

export const STrackingRepo = Symbol('trackingRepo');
