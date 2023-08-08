import { RequestHandler, setupWorker as baseSetupWorker } from 'msw';

export const setupWorker = async (...handlers: RequestHandler[]) => baseSetupWorker(...handlers);
