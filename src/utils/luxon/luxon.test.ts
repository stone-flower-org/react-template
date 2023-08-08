import { DateTime } from '@src/boot';

import { getTimeMsTillHour, getTimeMsTillMillisecond, getTimeMsTillMinute, getTimeMsTillSecond } from './luxon';

const defaultDate = DateTime.fromISO('2023-01-01T01:02:03.400Z');

describe('luxon', () => {
  describe('getTimeMsTillMillisecond', () => {
    it('should return date milliseconds', () => {
      expect(getTimeMsTillMillisecond(defaultDate)).toBe(400);
    });
  });

  describe('getTimeMsTillSecond', () => {
    it('should return date milliseconds and seconds converted to ms', () => {
      expect(getTimeMsTillSecond(defaultDate)).toBe(3400);
    });
  });

  describe('getTimeMsTillMinute', () => {
    it('should return date milliseconds, seconds and minutes converted to ms', () => {
      expect(getTimeMsTillMinute(defaultDate)).toBe(123400);
    });
  });

  describe('getTimeMsTillHour', () => {
    it('should return date milliseconds, seconds, minutes and hours converted to ms', () => {
      expect(getTimeMsTillHour(defaultDate)).toBe(18123400);
    });
  });
});
