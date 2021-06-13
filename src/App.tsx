import React, { PureComponent, ReactNode } from 'react';
import { CurrentTime } from './CurrentTime';
import { Tracking } from './domain/Tracking';
import { TimeTrack } from './entities/TimeTrack';
import { Track } from './entities/Track';
import { iswroted, isset } from './utils/guards';

interface IAppState {
  tracks: Array<Track>;
  currentTrack: Track | null;
  currentTimeTrack: TimeTrack | null;
  inTracking: boolean;
};

export class App extends PureComponent<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.tracking = new Tracking();
  };

  private tracking: Tracking;

  public state: IAppState = {
    tracks: [],
    currentTrack: null,
    currentTimeTrack: null,
    inTracking: false
  };

  private addNewTrack = (): Track => {
    const newTrack = this.tracking.startTrack('noname');
    this.setState(({ tracks }: IAppState) => ({
      tracks: [ ...tracks, newTrack ]
    }));
    return newTrack;
  };

  private startTrack = () => {
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

  private stopTrack = () => {
    const { currentTimeTrack } = this.state;
    if (!iswroted(currentTimeTrack)) return;

    this.tracking.finishTimeTrack(currentTimeTrack);
    this.setState({
      currentTimeTrack: null,
      inTracking: false
    });
  };

  private setCurrentTrack = (id: string) => () => {
    const currentTrack = this.state.tracks.find((track: Track) => track.id === id);
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
        { iswroted(currentTimeTrack) && <CurrentTime currentTimeTrack={ currentTimeTrack }/> }
        <ul>
          { tracks.map(this.renderTrack(currentTrack)) }
        </ul>
      </div>
    );
  };

  private renderNewTrackButton = (): ReactNode =>
    <button onClick={ this.addNewTrack }>Add new track</button>;

  private renderStartButton = (inTracking: boolean): ReactNode => (
    <button onClick={ inTracking ? this.stopTrack : this.startTrack }>
      { inTracking ? 'Stop' : 'Start' }
    </button>
  );
    

  private renderTrack = (currentTrack: Track | null) => (track: Track): ReactNode => {
    const { id, name, timeTracks } = track;
    const isActive = track === currentTrack;
  
    return (
      <li key={ id }>
        <button onClick={ this.setCurrentTrack(id) } style={ isActive ? { border: '1px solid red' } : {} }>
          { name } - { this.renderTime(timeTracks) } sec
        </button>
      </li>
    );
  };

  private renderTime = (timeTracks: Array<TimeTrack>) =>
    Math.ceil(timeTracks
      .reduce((acc: number, { duration }: TimeTrack) => acc + duration, 0));
};
