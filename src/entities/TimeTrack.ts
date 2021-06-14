export interface ITimeTrack {
  id: string;
  duration: number;
  startTime: Date;
};

export class TimeTrack implements ITimeTrack {
  constructor(
    public id: string,
    public duration: number,
    public startTime: Date
  ) {};
};
