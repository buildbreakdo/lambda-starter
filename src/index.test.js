import { handler } from './index.js';
const event = require('../event.json');

function mockCallback(error, data) { return error || data }

test('Handler does not explode on import', () => {
  expect(true).toBe(true);
});

test('Fetch google.com', async () => {
  const response = await handler(event, null, mockCallback)

  expect(response.statusCode).toBe(200);
});