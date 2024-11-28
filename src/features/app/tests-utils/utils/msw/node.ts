import { RequestHandler } from 'msw';
import { setupServer as baseSetupServer } from 'msw/node';

export const setupServer = async (...handlers: RequestHandler[]) => baseSetupServer(...handlers);
