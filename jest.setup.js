/* eslint-disable no-undef */
const { matchers } = require('@emotion/jest');
const { configure } = require('@testing-library/dom');
require('@testing-library/jest-dom');

require('./src/features/app/tests-utils/register-mocks'); // important to register global mocks before their actual imports
const { boot, serverProvider } = require('./src/features/app/tests-utils/boot');

configure({
  asyncUtilTimeout: 4000,
  testIdAttribute: 'data-test-id',
});

expect.extend(matchers);

beforeAll(async () => await boot());
afterEach(() => {
  serverProvider.get().resetHandlers();
});
afterAll(() => {
  serverProvider.get().close();
});
