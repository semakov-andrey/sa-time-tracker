import React, { PureComponent } from 'react';

import type { ITimeTrack } from 'entities/TimeTrack';
import type { ReactNode } from 'react';

interface ICurrentTimeProps {
  currentTimeTrack: ITimeTrack;
};

export class CurrentTime extends PureComponent<ICurrentTimeProps> {
  public componentDidMount = (): void => {
    this.inUpdating = true;
    this.updateComponent();
  };

  public componentWillUnmount = (): void => {
    this.inUpdating = false;
  };

  private inUpdating = false;

  private updateComponent = (): void => {
    if (this.inUpdating) {
      this.forceUpdate();
      window.requestAnimationFrame(this.updateComponent);
    }
  };

  public render = (): ReactNode => {
    const divider = 1000;
    const { currentTimeTrack: { startTime } } = this.props;
    const time = ((new Date()).getTime() - startTime.getTime()) / divider;

    return <div>{ time } sec</div>;
  };
};
