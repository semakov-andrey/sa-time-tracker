import { v4 } from 'uuid';

import { TimeTrack } from 'entities/TimeTrack';
import { Track } from 'entities/Track';

import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';

export interface ITracking {
  startTrack(name: string): ITrack;
  startTimeTrack(): ITimeTrack;
  finishTimeTrack(tt: ITimeTrack): ITimeTrack;
  pushTimeTrackToTrack(track: ITrack, timeTrack: ITimeTrack): void;
};

export class Tracking implements ITracking {
  public startTrack(name: string): ITrack {
    return new Track(v4(), name);
  };

  public startTimeTrack(): ITimeTrack {
    return new TimeTrack(v4(), 0, new Date());
  };

  public finishTimeTrack(tt: ITimeTrack): ITimeTrack {
    const divider = 1000;
    tt.duration = ((new Date()).getTime() - tt.startTime.getTime()) / divider;

    return tt;
  };

  public pushTimeTrackToTrack(track: ITrack, timeTrack: ITimeTrack): void {
    track.timeTracks.push(timeTrack);
  };
};
