import { PureComponent } from 'react';

import { store } from 'store/store';

import { isKeyOfObject, isset, isTypeObject } from './guards';

type TListener = () => void;

const listeners: Array<TListener> = [];

store.subscribe((): void => {
  listeners.forEach((listener: TListener) => {
    listener();
  });
});

const compareObjects = (
  x: Record<ObjectKey, unknown>,
  y: Record<ObjectKey, unknown>
): boolean => {
  for (const p in x) {
    if (Object.prototype.hasOwnProperty.call(x, p)) {
      if (!Object.prototype.hasOwnProperty.call(y, p)) return false;
      if (typeof x[p] !== typeof y[p]) return false;
      if (x[p] !== y[p]) return false;
    }
  }

  return true;
};

export function observe() {
  return function (target: PureComponent, propertyName: string): void {
    if (!isKeyOfObject(target, propertyName) || !isTypeObject(target[propertyName])) return;

    const previousValue = { ...target[propertyName] as Record<ObjectKey, unknown> };
    let t: PureComponent;
    // need to get unbound method
    // eslint-disable-next-line
    const { componentDidMount } = target;
    target.componentDidMount = function (): void {
      if (isset(componentDidMount)) componentDidMount.call(this);
      const self = this;
      t = self;
    };

    listeners.push((): void => {
      if (!isset(t) || compareObjects(previousValue, target[propertyName])) return;
      t.forceUpdate();
    });
  };
};
