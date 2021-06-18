import { PureComponent } from 'react';

import { store } from 'store/Tracking';

import { isKeyOfObject, isset, isTypeObject, TObjectKey } from './guards';

type TListener = () => void;

const listeners: Array<TListener> = [];

store.subscribe((): void => {
  listeners.forEach((listener: TListener) => {
    listener();
  });
});

const compareObjects = (
  x: Record<TObjectKey, unknown>,
  y: Record<TObjectKey, unknown>
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

    const previousValue = { ...target[propertyName] };
    let self: PureComponent;
    const { componentDidMount } = target;
    target.componentDidMount = function (): void {
      if (isset(componentDidMount)) componentDidMount.call(this);
      self = this;
    };

    listeners.push((): void => {
      if (!isset(self) || compareObjects(previousValue, target[propertyName])) return;
      self.forceUpdate();
    });
  };
};
