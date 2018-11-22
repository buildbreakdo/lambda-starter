/* Globals -- jest.globals.js:
   callback
   event
*/

import { handler } from './index.js';

test('Handler does not explode on import', () => {
  expect(true).toBe(true);
});

test('Fetch google.com', async () => {
  event.queryStringParameters.href = encodeURIComponent('https://google.com');

  const response = await handler(event, null, callback)

  expect(response.statusCode).toBe(200);
});