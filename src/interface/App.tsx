import React, { PureComponent } from 'react';

import { Tracking } from 'domain/Tracking';
import { CurrentTime } from 'interface/CurrentTime';
import { iswritten, isset } from 'utils/guards';

import type { ITracking } from 'domain/Tracking';
import type { ITimeTrack } from 'entities/TimeTrack';
import type { ITrack } from 'entities/Track';
import type { ReactNode } from 'react';

interface IAppState {
  tracks: Array<ITrack>;
  currentTrack: ITrack | null;
  currentTimeTrack: ITimeTrack | null;
  inTracking: boolean;
};

type TAppProps = Record<string, never>;

export class App extends PureComponent<TAppProps, IAppState> {
  constructor(props: TAppProps) {
    super(props);
    this.tracking = new Tracking();
  };

  public state: IAppState = {
    tracks: [],
    currentTrack: null,
    currentTimeTrack: null,
    inTracking: false
  };

  private tracking: ITracking;

  private addNewTrack = (): ITrack => {
    const newTrack = this.tracking.startTrack('noname');
    this.setState(({ tracks }: IAppState) => ({
      tracks: [ ...tracks, newTrack ]
    }));

    return newTrack;
  };

  private startTrack = (): void => {
    let { currentTrack, tracks } = this.state;
    if (currentTrack === null) {
      currentTrack = !isset(tracks[0]) ? this.addNewTrack() : tracks[0];
      this.setState({ currentTrack });
    }
    const currentTimeTrack = this.tracking.startTimeTrack();
    this.tracking.pushTimeTrackToTrack(currentTrack, currentTimeTrack);
    this.setState({
      currentTimeTrack,
      inTracking: true
    });
  };

  private stopTrack = (): void => {
    const { currentTimeTrack } = this.state;
    if (!iswritten(currentTimeTrack)) return;

    this.tracking.finishTimeTrack(currentTimeTrack);
    this.setState({
      currentTimeTrack: null,
      inTracking: false
    });
  };

  private setCurrentTrack = (id: string) => (): void => {
    const currentTrack = this.state.tracks.find((track: ITrack) => track.id === id);
    if (isset(currentTrack)) {
      this.setState({ currentTrack });
    }
  };

  public render = (): ReactNode => {
    const {
      tracks,
      currentTrack,
      currentTimeTrack,
      inTracking
    } = this.state;

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
