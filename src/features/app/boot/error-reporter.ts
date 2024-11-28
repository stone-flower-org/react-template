import { createErrorReporter } from '@src/features/app/utils/error-reporter';
import { createProvider } from '@src/features/common/utils/service-provider';

export const errorReporterProvider = createProvider(async () => createErrorReporter());
