import { Action, Dispatch } from 'redux';

import { IStates } from 'store/states';
import { store } from 'store/store';

type A<Params> = Record<string, (...args: Array<Params>) => Action>;

export const repoFactory = <
  T extends ((state: IStates) => S),
  Params,
  S = ReturnType<T>
>(
  mapStates: T,
  mapActions: A<Params>
): S & A<Params> => {
  const states = mapStates(store.getState());
  const actions = Object.fromEntries<A<Params>>(
    Object.entries<A<Params>>(mapActions)
      .map(([ key, value ]: EntryOf<A<Params>>) =>
        [
          key,
          (...args: Array<Params>): Action =>
            (store.dispatch as Dispatch<Action>)(value(...args))
        ])
  );
  const mappedObject = {
    ...states,
    ...actions
  };

  store.subscribe(() => {
    const newState = mapStates(store.getState());
    Object.entries(newState).forEach(([ key, value ]: EntryOf<S>) => {
      (mappedObject[key] as typeof value) = value;
    });
  });

  return mappedObject;
};
