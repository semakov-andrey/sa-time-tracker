import { TimeTrack } from '../entities/TimeTrack';
import { v4 } from 'uuid'; 
import { Track } from '../entities/Track';

export class Tracking {
  public startTrack(name: string): Track {
    return new Track(v4(), name);
  };

  public startTimeTrack(): TimeTrack {
    return new TimeTrack(v4(), 0, new Date());
  };

  public finishTimeTrack(tt: TimeTrack): TimeTrack {
    tt.duration = ((new Date()).getTime() - tt.startTime.getTime()) / 1000;
    return tt;
  };

  public pushTimeTrackToTrack(track: Track, timeTrack: TimeTrack) {
    track.timeTracks.push(timeTrack);
  };
};
