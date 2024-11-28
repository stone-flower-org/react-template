export interface Option<V = unknown> {
  label: string;
  key: string;
  value: V;
}

export interface TreeOption<V = unknown> {
  label: string;
  key: string;
  value?: V;
  children?: TreeOption<V>[];
  hidden?: boolean;
}

export type FuncWithInjectedParam<IP, P, R> = (ctx: IP, ...params: P[]) => R;

export interface SingleCallQueueCtx<R = unknown> {
  promise?: Promise<R>;
  next?: () => Promise<R>;
}

export interface SingleBlockingCall<R = unknown> {
  promise?: Promise<R>;
}

export type PredicateFunc<T = any> = (value: T, index: number, arr: T[]) => boolean;

export type BinaryPredicateFunc<T = any> = (value: T, index: number, arr: T[]) => number;

export type ComparatorFunc<T = any> = (a: T, b: T) => number;

export type ObjectKey = string | number | symbol;
