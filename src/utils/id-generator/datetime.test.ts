import { createDatetimeIdGenerator } from './datetime';

describe('datetime', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01 00:00:00.000Z'));
  });

  describe('createDatetimeIdGenerator', () => {
    it('should return generator which will return datetime and amount of calls with same datetime', () => {
      const generator = createDatetimeIdGenerator();
      expect(generator()).toBe('1glla1i0000');
      expect(generator()).toBe('1glla1i0001');
      expect(generator()).toBe('1glla1i0002');
      jest.useFakeTimers().setSystemTime(new Date('2023-01-01 00:00:00.001Z'));
      expect(generator()).toBe('1glla1i0100');
      expect(generator()).toBe('1glla1i0101');
      expect(generator()).toBe('1glla1i0102');
    });

    it('should return generator which will return datetime number in given radix', () => {
      const generator = createDatetimeIdGenerator({ radix: 10 });
      expect(generator()).toBe('167253120000000');
    });
  });
});
