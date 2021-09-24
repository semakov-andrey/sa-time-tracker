import { Action, Dispatch } from 'redux';

import { IStates } from 'store/states';
import { store } from 'store/store';

type A = Record<string, (...args: Array<never>) => Action>;

export const repoFactory = <
  T extends ((state: IStates) => S),
  S = ReturnType<T>
>(
  mapStates: T,
  mapActions: A
): S & A => {
  const states = mapStates(store.getState());
  const actions = Object.fromEntries<A>(
    Object.entries<A>(mapActions)
      .map(([ key, value ]: EntryOf<A>) =>
        [
          key,
          (...args: Array<never>): Action =>
            (store.dispatch as Dispatch<Action>)(value(...args))
        ])
  );
  const mappedObject = {
    ...states,
    ...actions
  };

  store.subscribe(() => {
    const newState = mapStates(store.getState());
    Object.entries(newState).forEach(([ key, value ]: [ string | keyof S, unknown ]) => {
      (mappedObject[key] as typeof value) = value;
    });
  });

  return mappedObject;
};
