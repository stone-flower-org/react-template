import { createProvider } from '@src/utils/core';
import { createErrorReporter } from '@src/utils/error-reporter';

export const errorReporterProvider = createProvider(async () => createErrorReporter());
