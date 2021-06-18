import { createStore } from 'redux';

import { STrackingRepo } from 'interface/trackingRepo';
import { iocContainer } from 'utils/di';

import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';
import type { ITrackingRepo } from 'interface/trackingRepo';

const ADD_NEW_TRACK = 'add_new_track';
const SET_CURRENT_TRACK = 'set_current_track';
const SET_CURRENT_TIME_TRACK = 'set_current_time_track';
const IN_TRACKING = 'in_tracking';

interface IIrackingState {
  tracks: Array<ITrack>;
  currentTrack: ITrack | null;
  currentTimeTrack: ITimeTrack | null;
  inTracking: boolean;
};

export const trackingInitialState: IIrackingState = {
  tracks: [],
  currentTrack: null,
  currentTimeTrack: null,
  inTracking: false
};

export const trackingReducer = (
  state: IIrackingState = trackingInitialState,
  action: TAction
): IIrackingState => {
  switch (action.type) {
    case ADD_NEW_TRACK: {
      const { newTrack } = action.payload;

      return {
        ...state,
        tracks: [ ...state.tracks, newTrack ]
      };
    };
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload.currentTrack
      };
    case SET_CURRENT_TIME_TRACK:
      return {
        ...state,
        currentTimeTrack: action.payload.currentTimeTrack
      };
    case IN_TRACKING:
      return {
        ...state,
        inTracking: action.payload.inTracking
      };
    default:
      return state;
  }
};

export const store = createStore(trackingReducer);

const addNewTrack = (newTrack: ITrack) => ({
  type: ADD_NEW_TRACK,
  payload: { newTrack }
}) as const;

const setCurrentTrack = (currentTrack: ITrack | null) => ({
  type: SET_CURRENT_TRACK,
  payload: { currentTrack }
}) as const;

const setCurrentTimeTrack = (currentTimeTrack: ITimeTrack | null) => ({
  type: SET_CURRENT_TIME_TRACK,
  payload: { currentTimeTrack }
}) as const;

const setInTracking = (inTracking: boolean) => ({
  type: IN_TRACKING,
  payload: { inTracking }
}) as const;

export class TrackingRepo implements ITrackingRepo {
  constructor() {
    this.init();
    this.subscribe();
  };

  private init(): void {
    const state = store.getState();
    this.tracks = state.tracks;
    this.currentTrack = state.currentTrack;
    this.currentTimeTrack = state.currentTimeTrack;
    this.inTracking = state.inTracking;
  };

  private subscribe(): void {
    store.subscribe(() => {
      this.init();
    });
  }

  public tracks!: Array<ITrack>;

  public currentTrack!: ITrack | null;

  public currentTimeTrack!: ITimeTrack | null;

  public inTracking!: boolean;

  public addNewTrack = (newTrack: ITrack): unknown =>
    store.dispatch(addNewTrack(newTrack));

  public setCurrentTrack = (currentTrack: ITrack | null): unknown =>
    store.dispatch(setCurrentTrack(currentTrack));

  public setCurrentTimeTrack = (currentTimeTrack: ITimeTrack | null): unknown =>
    store.dispatch(setCurrentTimeTrack(currentTimeTrack));

  public setInTracking = (inTrackingValue: boolean): unknown =>
    store.dispatch(setInTracking(inTrackingValue));
};

iocContainer.set(STrackingRepo, TrackingRepo);

type TAction = ReturnType<
| typeof addNewTrack
| typeof setCurrentTrack
| typeof setCurrentTimeTrack
| typeof setInTracking
>;
