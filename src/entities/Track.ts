import type { ITimeTrack } from 'entities/TimeTrack';

export interface ITrack {
  id: string;
  name: string;
  timeTracks: Array<ITimeTrack>;
};

export class Track implements ITrack {
  constructor(
    public id: string,
    public name: string,
    public timeTracks: Array<ITimeTrack> = []
  ) {};
};
