import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';

export interface ITrackingState {
  tracks: Array<ITrack>;
  currentTrack: ITrack | null;
  currentTimeTrack: ITimeTrack | null;
  inTracking: boolean;
};

export const trackingState: ITrackingState = {
  tracks: [],
  currentTrack: null,
  currentTimeTrack: null,
  inTracking: false
};
