export const isset = <T>(u?: T): u is T => typeof u !== 'undefined';

export const iswritten = <T>(u: T | null): u is T => u !== null;

export const isTypeObject = (u: unknown): u is Record<ObjectKey, unknown> =>
  typeof u === 'object' && u !== null && !Array.isArray(u);

type TValueConstructors = StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor;

type o<I extends TValueConstructors, T, E extends ObjectKey> = {
  [k in keyof T]: T[k];
} & {
  [s in E]: InstanceType<I>;
};

export const isKeyOfObject = <T>(obj: T, key: ObjectKey): key is keyof T =>
  typeof obj === 'object' && obj !== null && Object.prototype.hasOwnProperty.call(obj, key);

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
