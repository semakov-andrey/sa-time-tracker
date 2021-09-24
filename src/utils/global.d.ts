type FunctionType<T = unknown, R = unknown> = (...args: Array<T>) => R;

type ObjectKey = string | number | symbol;

type ObjectType<T = unknown> = Record<ObjectKey, T>;

type ObjectDefType<K extends ObjectKey, T = unknown> = Record<K, T>;

type Nullable<T> = T | null;

type Optional<T> = T | undefined;

type ResolveType = (value: unknown) => void;

type RejectType = (reason?: unknown) => void;

type ArrayInnerType<T> = T extends Array<infer R> ? R : never;

type KeyOf<T> = keyof T;

type ValueOf<T> = T[KeyOf<T>];

type EntryOf<T> = { [K in KeyOf<T>]: [K, T[K]] }[KeyOf<T>];

interface ObjectConstructor {
  keys<T>(o: T): T extends Array<unknown> ? string : Array<KeyOf<T>>;

  values<T>(o: T): T extends Array<infer R> ? R : Array<T[KeyOf<T>]>;

  entries<T>(o: T): T extends Array<infer R> ? Array<[ string, R ]> : Array<EntryOf<T>>;

  fromEntries<T>(entries: Array<EntryOf<T>>): T;
}

interface Array<T> {
  includes<U>(searchElement: U, fromIndex?: number): U extends T ? boolean : false;
}

type Modify<T, R> = Omit<T, KeyOf<R>> & R;
