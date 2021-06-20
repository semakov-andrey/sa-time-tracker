type Nullable<T> = T | null;

type Optional<T> = T | undefined;

type EntryOf<T> = { [K in keyof T]: [K, T[K]] }[keyof T];

interface ObjectConstructor {
  keys<T>(o: T): Array<keyof T>;

  values<T>(o: T): Array<T[keyof T]>;

  entries<T>(o: T): Array<EntryOf<T>>;
}
