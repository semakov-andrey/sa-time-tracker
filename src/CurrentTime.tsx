import React, { PureComponent, ReactNode } from 'react';
import { TimeTrack } from './entities/TimeTrack';

interface ICurrentTimeProps {
  currentTimeTrack: TimeTrack;
};

export class CurrentTime extends PureComponent<ICurrentTimeProps> {
  private inUpdating = false;

  public componentDidMount = () => {
    this.inUpdating = true;
    this.updateComponent();
  };

  public componentWillUnmount = () => {
    this.inUpdating = false;
  };

  private updateComponent = () => {
    if (this.inUpdating) {
      this.forceUpdate();
      window.requestAnimationFrame(this.updateComponent);
    }
  };

  public render = (): ReactNode => {
    const { currentTimeTrack: { startTime } } = this.props;
    const time = ((new Date()).getTime() - startTime.getTime()) / 1000;
  
    return <div>{ time } sec</div>;
  };
};
