import example from './example.json';

exports.handler = (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...event.queryStringParameters,
      example
    })
  });
}