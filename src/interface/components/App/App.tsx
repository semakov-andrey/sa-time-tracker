import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader/root';

import { Tracking } from 'domain/Tracking';
import { SvgLogo } from 'interface/assets/icons/logo.svg';
import { CurrentTime } from 'interface/components/CurrentTime/CurrentTime';
import { STrackingRepo } from 'interface/interfaces/trackingRepo';
import { cn } from 'utils/classnames';
import { inject } from 'utils/di';
import { iswritten, isset } from 'utils/guards';
import { observe } from 'utils/observer';

import { css } from './App.css';

import type { ITracking } from 'domain/Tracking';
import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';
import type { ITrackingRepo } from 'interface/interfaces/trackingRepo';
import type { ReactNode } from 'react';

type TAppProps = Record<string, never>;

class AppComponent extends PureComponent<TAppProps> {
  constructor(props: TAppProps) {
    super(props);
    this.tracking = new Tracking();
  };

  private tracking: ITracking;

  @observe()
  @inject(STrackingRepo)
  private trackingRepo!: ITrackingRepo;

  private addNewTrack = (): ITrack => {
    const newTrack = this.tracking.startTrack('Noname');
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
      <main className={ css.main }>
        <header className={ css.header }>
          <SvgLogo className={ css.logo }/>
          <h1 className={ css.title }>Time Tracker</h1>
        </header>
        <section className={ css.timeTracker }>
          <div className={ css.buttons }>
            { this.renderNewTrackButton() }
            { this.renderStartButton(inTracking) }
          </div>
          <div className={ css.currentTime }>
            { iswritten(currentTimeTrack) && <CurrentTime currentTimeTrack={ currentTimeTrack }/> }
          </div>
          <ul className={ css.tracks }>
            { tracks.map(this.renderTrack(currentTrack)) }
          </ul>
        </section>
      </main>
    );
  };

  private renderNewTrackButton = (): ReactNode => (
    <button
      className={ cn(css.button, css.buttonAdd) }
      type="button"
      onClick={ this.addNewTrack }
    >
      Add new track
    </button>
  );

  private renderStartButton = (inTracking: boolean): ReactNode => (
    <button
      className={ cn(css.button, css.buttonToggle) }
      type="button"
      onClick={ inTracking ? this.stopTrack : this.startTrack }
    >
      { inTracking ? 'Stop' : 'Start' }
    </button>
  );

  private renderTrack = (currentTrack: ITrack | null) => (track: ITrack): ReactNode => {
    const { id, name, timeTracks } = track;
    const isActive = track === currentTrack;
    const cnActive = isActive ? css.trackActive : null;

    return (
      <li key={ id }>
        <button
          className={ cn(css.track, cnActive) }
          type="button"
          onClick={ this.setCurrentTrack(id) }
        >
          { name }: { this.renderTime(timeTracks) } sec
        </button>
      </li>
    );
  };

  private renderTime = (timeTracks: Array<ITimeTrack>): number =>
    Math.ceil(timeTracks
      .reduce((acc: number, { duration }: ITimeTrack) => acc + duration, 0));
};

export const App = hot(AppComponent);
