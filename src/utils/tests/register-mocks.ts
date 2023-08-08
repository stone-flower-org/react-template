import { makeInMemoryCookies } from './mocks/js-cookie';
import { makeResizeObeserver } from './mocks/resize-observer';

Element.prototype.scrollTo = jest.fn();
jest.mock('js-cookie', () => makeInMemoryCookies());
global.ResizeObserver = makeResizeObeserver();
