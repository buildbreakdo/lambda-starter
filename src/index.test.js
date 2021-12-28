import event from '../event.json';
import { handler } from './index.js';

beforeEach(() => {
  // reset event.json
  jest.resetModules();
});

test('Handler does not explode on import', () => {
  expect(true).toBe(true);
});

test('returns error when href is not provided', async () => {
  event.queryStringParameters.href = null;

  const response = await handler(event, null);

  expect(response.statusCode).toBe(500);
});

test('returns error when href is invalid', async () => {
  event.queryStringParameters.href = 'google.com';

  const response = await handler(event, null);

  expect(response.statusCode).toBe(500);
});

test('Fetch google.com', async () => {
  event.queryStringParameters.href = encodeURIComponent('https://google.com');

  const response = await handler(event, null);

  expect(response.statusCode).toBe(200);
});
