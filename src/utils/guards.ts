export const isset = <T>(u?: T): u is T => typeof u !== 'undefined';

export const iswritten = <T>(u: T | null): u is T => u !== null;

export const isexists = <T>(u?: T | null): u is T => isset(u) && iswritten(u);

export const isTypeObject = (u: unknown): u is Record<ObjectKey, unknown> =>
  typeof u === 'object' && u !== null && !Array.isArray(u);

export const isKeyOfObject = <T>(u: T, key: ObjectKey): key is keyof T =>
  isTypeObject(u) && Object.prototype.hasOwnProperty.call(u, key);

type TValueConstructors = StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor;

type o<I extends TValueConstructors, T, E extends ObjectKey> = {
  [k in keyof T]: T[k];
} & {
  [s in E]: InstanceType<I>;
};

export const checkPropType = <
  I extends TValueConstructors,
  T,
  S extends ObjectKey
>(
  instance: I,
  obj: T,
  key: S
): obj is o<I, T, S> =>
  isKeyOfObject(obj, key) && typeof obj[key] === instance.name.toLowerCase();

export const isTypeNumber = (u: unknown): u is number =>
  typeof u === 'number';

export const isTypeString = (u: unknown): u is string =>
  typeof u === 'string';

export const isEmptyString = (u: string): boolean => u !== '';
