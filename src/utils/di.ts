import { PureComponent } from 'react';

import { isset } from './guards';

class IoCContainer {
  private instances: Map<symbol, unknown> = new Map();

  public get = <T>(token: symbol): T => {
    const constructor = this.instances.get(token);
    if (!isset(constructor)) throw new Error('di failed');

    return constructor as T;
  };

  public set = <T>(token: symbol, constructor: () => T): void => {
    this.instances.set(token, constructor());
  };
};

export const iocContainer = new IoCContainer();

export function inject(token: symbol) {
  return function (target: PureComponent, propertyName: string): void {
    Object.defineProperty(target, propertyName, {
      configurable: true,
      enumerable: true,
      writable: false,
      value: iocContainer.get(token)
    });
  };
};
