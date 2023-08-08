import { ObjectKey } from './types';

export const isKeyOf = <O = unknown>(obj: O, key: string | number | symbol | undefined): key is keyof O =>
  typeof obj === 'object' && obj && key !== undefined && key in obj;

export const isNonNullObject = (obj: unknown): obj is object => typeof obj === 'object' && !!obj;

export const areObjectsShallowlyEqual = <O extends object>(a: O, b: O): boolean => {
  const keys = new Set<string>();
  Object.keys(a).forEach(keys.add.bind(keys));
  Object.keys(b).forEach(keys.add.bind(keys));
  for (const key of keys) {
    const aVal: unknown = isKeyOf(a, key) ? a[key] : undefined;
    const bVal: unknown = isKeyOf(b, key) ? b[key] : undefined;
    if (aVal !== bVal) return false;
  }
  return true;
};

export const createObjectFromObjectValues = <
  O extends Record<ObjectKey, ObjectKey>,
  V,
  K extends ObjectKey = O[keyof O]
>(
  object: O,
  generate: (key: K) => V
) => Object.fromEntries(Object.values(object).map((val) => [val, generate(val as K)])) as Record<K, V>;
