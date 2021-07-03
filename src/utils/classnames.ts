export const cn = <T>(...classNames: Array<T>): string =>
  classNames
    .filter((value: T) => value !== null)
    .join(' ');
