import { DateTime } from '@src/boot';
import { HOUR_MS, MINUTE_MS, SECOND_MS } from '@src/utils/datetime';

export const safeUpdate = (date: DateTime, update: (date: DateTime) => DateTime, def?: DateTime) => {
  const updated = update(date);
  return updated.isValid ? updated : def;
};

export const getTimeMsTillMillisecond = (date: DateTime) => date.millisecond;

export const getTimeMsTillSecond = (date: DateTime) => date.second * SECOND_MS + getTimeMsTillMillisecond(date);

export const getTimeMsTillMinute = (date: DateTime) => date.minute * MINUTE_MS + getTimeMsTillSecond(date);

export const getTimeMsTillHour = (date: DateTime) => date.hour * HOUR_MS + getTimeMsTillMinute(date);
