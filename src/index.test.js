import event from '../event.json';
import { handler } from './index.js';

function callback (error, response) { return error || response }

beforeEach(() => {
  // reset event.json
  jest.resetModules();
});

test('Handler does not explode on import', () => {
  expect(true).toBe(true);
});

test('Fetch google.com', async () => {
  event.queryStringParameters.href = encodeURIComponent('https://google.com');

  const response = await handler(event, null, callback)

  expect(response.statusCode).toBe(200);
});