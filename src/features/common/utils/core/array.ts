import { areArraysEqual } from '@mui/base';

import { BinaryPredicateFunc, ComparatorFunc } from './types';

export const range = <V>(from: number, to: number, generator: (i: number) => V): V[] =>
  Array.from({ length: to - from + 1 }, (_, i) => generator(i + from));

export const areArraysShallowlyEqual = <T extends any[]>(arrA: T, arrB: T) =>
  areArraysEqual(arrA, arrB, (a, b) => a === b);

export const insert = <T = any>(arr: T[], index: number, ...items: T[]) => {
  arr.splice(index, 0, ...items);
};

export const binaryNarrow = <T = any>(sortedArr: T[], predicate: BinaryPredicateFunc<T>) => {
  let from = 0;
  let to = sortedArr.length - 1;
  let predicted = 0;

  while (from <= to) {
    const found = Math.floor((to - from) / 2) + from;
    predicted = predicate(sortedArr[found], found, sortedArr);
    if (predicted === 0) return { found, from, predicted, to };
    if (from === to) break;
    if (predicted < 0) {
      to = found;
      continue;
    }
    from = found + 1;
  }

  return { found: -1, from, predicted, to };
};

export const binaryFindIndex = <T = any>(sortedArr: T[], predicate: BinaryPredicateFunc<T>) =>
  binaryNarrow(sortedArr, predicate).found;

export const binaryFind = <T = any>(sortedArr: T[], predicate: BinaryPredicateFunc<T>) => {
  const index = binaryFindIndex(sortedArr, predicate);
  return sortedArr[index];
};

export const binaryInsert = <T = any>(sortedArr: T[], comparator: ComparatorFunc<T>, ...items: T[]) => {
  items.forEach((item) => {
    const { predicted, found, from } = binaryNarrow(sortedArr, (val) => comparator(item, val));
    insert(sortedArr, found === -1 ? from + Number(predicted > 0) : found, item);
  });
};
