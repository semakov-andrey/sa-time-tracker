import { Action, Dispatch } from 'redux';

import { IStates } from 'store/states';
import { store } from 'store/store';

type TActionCreator = (...args: Array<unknown>) => Action;

export const repoFactory = <S, A, T extends ((state: IStates) => S)>(
  mapStates: T,
  mapActions: A
): S & A => {
  const states = mapStates(store.getState());
  const actions = Object.fromEntries(
    Object.entries(mapActions)
      .map(([ key, value ]: EntryOf<A>) =>
        [
          key,
          (...args: Parameters<TActionCreator>): Action =>
            (store.dispatch as Dispatch<Action>)((value as unknown as TActionCreator)(...args))
        ])
  ) as unknown as A;
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
