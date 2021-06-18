export type TObjectKey = string | number | symbol;

export const isset = <T>(u?: T): u is T => typeof u !== 'undefined';

export const iswritten = <T>(u: T | null): u is T => u !== null;

export const isKeyOfObject = <T>(obj: T, key: TObjectKey): key is keyof T =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const isTypeObject = (u: unknown): u is Record<TObjectKey, unknown> =>
  typeof u === 'object' && u !== null && !Array.isArray(u);
