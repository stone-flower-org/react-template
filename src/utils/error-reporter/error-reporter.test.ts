import { createErrorReporter } from './error-reporter';

let errorSpy: jest.SpyInstance;
const defaultError = new Error('Some Error');

describe('error-reporter', () => {
  beforeAll(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  beforeEach(() => {
    errorSpy.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    describe('createErrorReporter', () => {
      it('should return error reporter isntance', () => {
        expect(createErrorReporter()).toBeInstanceOf(Object);
      });
    });
  });

  describe('instance', () => {
    describe('report', () => {
      it('should log given error', () => {
        const errorReporter = createErrorReporter();
        errorReporter.report(defaultError);
        expect(errorSpy).toHaveBeenCalledWith(defaultError);
      });
    });
  });
});
