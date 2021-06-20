import { TTrackingActions } from 'store/actions/tracking.actions';
import { ACTIONS_TRACKING } from 'store/constants/actions.constants';
import { trackingState } from 'store/states/tracking.state';

import type { ITrackingState } from 'store/states/tracking.state';

export const tracking = (
  state: ITrackingState = trackingState,
  action: TTrackingActions
): ITrackingState => {
  switch (action.type) {
    case ACTIONS_TRACKING.ADD_NEW_TRACK: {
      const { newTrack } = action.payload;

      return {
        ...state,
        tracks: [ ...state.tracks, newTrack ]
      };
    };
    case ACTIONS_TRACKING.SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload.currentTrack
      };
    case ACTIONS_TRACKING.SET_CURRENT_TIME_TRACK:
      return {
        ...state,
        currentTimeTrack: action.payload.currentTimeTrack
      };
    case ACTIONS_TRACKING.IN_TRACKING:
      return {
        ...state,
        inTracking: action.payload.inTracking
      };
    default:
      return state;
  }
};
