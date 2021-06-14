import React, { PureComponent } from 'react';

import type { ReactNode } from 'react';

import type { ITimeTrack } from 'entities/TimeTrack';

interface ICurrentTimeProps {
  currentTimeTrack: ITimeTrack;
};

export class CurrentTime extends PureComponent<ICurrentTimeProps> {
  private inUpdating = false;

  public componentDidMount = (): void => {
    this.inUpdating = true;
    this.updateComponent();
  };

  public componentWillUnmount = (): void => {
    this.inUpdating = false;
  };

  private updateComponent = (): void => {
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
