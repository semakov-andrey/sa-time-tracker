export const isset = <T>(u?: T): u is T => typeof u !== 'undefined';

export const iswroted = <T>(u: T | null): u is T => u !== null;
