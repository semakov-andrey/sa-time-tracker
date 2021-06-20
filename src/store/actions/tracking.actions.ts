import { ACTIONS_TRACKING } from 'store/constants/actions.constants';

import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';
import type { T_ACTIONS_TRACKING } from 'store/constants/actions.constants';

export type TTrackingActions =
| IAddNewTrack
| ISetCurrentTrack
| ISetCurrentTimeTrack
| ISetInTracking;

export interface IAddNewTrack {
  type: T_ACTIONS_TRACKING['ADD_NEW_TRACK'];
  payload: { newTrack: ITrack };
};

export const addNewTrack = (newTrack: ITrack): IAddNewTrack => ({
  type: ACTIONS_TRACKING.ADD_NEW_TRACK,
  payload: { newTrack }
});

export interface ISetCurrentTrack {
  type: T_ACTIONS_TRACKING['SET_CURRENT_TRACK'];
  payload: { currentTrack: Nullable<ITrack> };
};

export const setCurrentTrack = (currentTrack: Nullable<ITrack>): ISetCurrentTrack => ({
  type: ACTIONS_TRACKING.SET_CURRENT_TRACK,
  payload: { currentTrack }
});

export interface ISetCurrentTimeTrack {
  type: T_ACTIONS_TRACKING['SET_CURRENT_TIME_TRACK'];
  payload: { currentTimeTrack: Nullable<ITimeTrack> };
};

export const setCurrentTimeTrack = (currentTimeTrack: Nullable<ITimeTrack>): ISetCurrentTimeTrack => ({
  type: ACTIONS_TRACKING.SET_CURRENT_TIME_TRACK,
  payload: { currentTimeTrack }
});

export interface ISetInTracking {
  type: T_ACTIONS_TRACKING['IN_TRACKING'];
  payload: { inTracking: boolean };
};

export const setInTracking = (inTracking: boolean): ISetInTracking => ({
  type: ACTIONS_TRACKING.IN_TRACKING,
  payload: { inTracking }
});

