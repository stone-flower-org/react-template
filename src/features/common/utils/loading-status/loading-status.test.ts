import {
  isErrorStatus,
  isIdleStatus,
  isLoadedStatus,
  isLoadingStatus,
  isSuccessStatus,
  LoadingStatus,
} from './loading-status';

describe('loading-status', () => {
  describe.each([
    {
      status: LoadingStatus.ERROR,
      result: true,
    },
    {
      status: LoadingStatus.IDLE,
      result: false,
    },
    {
      status: LoadingStatus.LOADING,
      result: false,
    },
    {
      status: LoadingStatus.SUCCESS,
      result: false,
    },
  ])('isErrorStatus', ({ status, result }) => {
    it(`should return ${String(result)} when status is ${status}`, () => {
      expect(isErrorStatus(status)).toBe(result);
    });
  });

  describe.each([
    {
      status: LoadingStatus.ERROR,
      result: false,
    },
    {
      status: LoadingStatus.IDLE,
      result: true,
    },
    {
      status: LoadingStatus.LOADING,
      result: false,
    },
    {
      status: LoadingStatus.SUCCESS,
      result: false,
    },
  ])('isIdleStatus', ({ status, result }) => {
    it(`should return ${String(result)} when status is ${status}`, () => {
      expect(isIdleStatus(status)).toBe(result);
    });
  });

  describe.each([
    {
      status: LoadingStatus.ERROR,
      result: false,
    },
    {
      status: LoadingStatus.IDLE,
      result: false,
    },
    {
      status: LoadingStatus.LOADING,
      result: true,
    },
    {
      status: LoadingStatus.SUCCESS,
      result: false,
    },
  ])('isLoadingStatus', ({ status, result }) => {
    it(`should return ${String(result)} when status is ${status}`, () => {
      expect(isLoadingStatus(status)).toBe(result);
    });
  });

  describe.each([
    {
      status: LoadingStatus.ERROR,
      result: false,
    },
    {
      status: LoadingStatus.IDLE,
      result: false,
    },
    {
      status: LoadingStatus.LOADING,
      result: false,
    },
    {
      status: LoadingStatus.SUCCESS,
      result: true,
    },
  ])('isSuccessStatus', ({ status, result }) => {
    it(`should return ${String(result)} when status is ${status}`, () => {
      expect(isSuccessStatus(status)).toBe(result);
    });
  });

  describe.each([
    {
      status: LoadingStatus.ERROR,
      result: true,
    },
    {
      status: LoadingStatus.IDLE,
      result: false,
    },
    {
      status: LoadingStatus.LOADING,
      result: false,
    },
    {
      status: LoadingStatus.SUCCESS,
      result: true,
    },
  ])('isLoadedStatus', ({ status, result }) => {
    it(`should return ${String(result)} when status is ${status}`, () => {
      expect(isLoadedStatus(status)).toBe(result);
    });
  });
});
