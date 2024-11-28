import { DEFAULT_DATETIME_ID_GENERATOR_PARAMS } from './constants';
import { DatetimeIdGeneratorParams } from './types';

export const createDatetimeIdGenerator = (params: Partial<DatetimeIdGeneratorParams> = {}) => {
  const { radix } = { ...DEFAULT_DATETIME_ID_GENERATOR_PARAMS, ...params };
  let count: Record<string, number> = {};
  return () => {
    const time = new Date().getTime().toString(radix);
    if (count[time] === undefined) count = { [time]: -1 };
    count[time]++;
    return `${time}0${count[time]}`;
  };
};
