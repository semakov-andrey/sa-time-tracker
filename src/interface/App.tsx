import React, { PureComponent } from 'react';

import { Tracking } from 'domain/Tracking';
import { CurrentTime } from 'interface/CurrentTime';
import { inject } from 'utils/di';
import { iswritten, isset } from 'utils/guards';
import { observe } from 'utils/observer';

import { STrackingRepo } from './trackingRepo';

import type { ITrackingRepo } from './trackingRepo';
import type { ITracking } from 'domain/Tracking';
import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';
import type { ReactNode } from 'react';

type TAppProps = Record<string, never>;

export class App extends PureComponent<TAppProps> {
  constructor(props: TAppProps) {
    super(props);
    this.tracking = new Tracking();
  };

  private tracking: ITracking;

  @observe()
  @inject(STrackingRepo)
  private trackingRepo!: ITrackingRepo;

  private addNewTrack = (): ITrack => {
    const newTrack = this.tracking.startTrack('noname');
    this.trackingRepo.addNewTrack(newTrack);

    return newTrack;
  };

  private startTrack = (): void => {
    let { currentTrack, tracks } = this.trackingRepo;
    if (currentTrack === null) {
      currentTrack = !isset(tracks[0]) ? this.addNewTrack() : tracks[0];
      this.trackingRepo.setCurrentTrack(currentTrack);
    }
    const currentTimeTrack = this.tracking.startTimeTrack();
    this.tracking.pushTimeTrackToTrack(currentTrack, currentTimeTrack);
    this.trackingRepo.setCurrentTimeTrack(currentTimeTrack);
    this.trackingRepo.setInTracking(true);
  };

  private stopTrack = (): void => {
    const { currentTimeTrack } = this.trackingRepo;
    if (!iswritten(currentTimeTrack)) return;

    this.tracking.finishTimeTrack(currentTimeTrack);
    this.trackingRepo.setCurrentTimeTrack(null);
    this.trackingRepo.setInTracking(false);
  };

  private setCurrentTrack = (id: string) => (): void => {
    const currentTrack = this.trackingRepo.tracks.find((track: ITrack) => track.id === id);
    if (isset(currentTrack)) {
      this.trackingRepo.setCurrentTrack(currentTrack);
    }
  };

  public render = (): ReactNode => {
    const {
      tracks,
      currentTrack,
      currentTimeTrack,
      inTracking
    } = this.trackingRepo;

    return (
      <div>
        { this.renderNewTrackButton() }
        { this.renderStartButton(inTracking) }
        { iswritten(currentTimeTrack) && <CurrentTime currentTimeTrack={ currentTimeTrack }/> }
        <ul>
          { tracks.map(this.renderTrack(currentTrack)) }
        </ul>
      </div>
    );
  };

  private renderNewTrackButton = (): ReactNode =>
    <button type="button" onClick={ this.addNewTrack }>Add new track</button>;

  private renderStartButton = (inTracking: boolean): ReactNode => (
    <button type="button" onClick={ inTracking ? this.stopTrack : this.startTrack }>
      { inTracking ? 'Stop' : 'Start' }
    </button>
  );

  private renderTrack = (currentTrack: ITrack | null) => (track: ITrack): ReactNode => {
    const { id, name, timeTracks } = track;
    const isActive = track === currentTrack;

    return (
      <li key={ id }>
        <button
          type="button"
          onClick={ this.setCurrentTrack(id) }
          style={ isActive ? { border: '1px solid red' } : {} }
        >
          { name } - { this.renderTime(timeTracks) } sec
        </button>
      </li>
    );
  };

  private renderTime = (timeTracks: Array<ITimeTrack>): number =>
    Math.ceil(timeTracks
      .reduce((acc: number, { duration }: ITimeTrack) => acc + duration, 0));
};
