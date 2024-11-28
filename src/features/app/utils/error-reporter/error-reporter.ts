import { ErrorReporter } from './types';

export const createErrorReporter = (): ErrorReporter => ({
  report: (e: Error) => {
    console.error(e);
  },
});
