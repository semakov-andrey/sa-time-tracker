import { TimeTrack } from './TimeTrack';

export class Track {
  constructor(
    public id: string,
    public name: string,
    public timeTracks: Array<TimeTrack> = []
  ) {};
};