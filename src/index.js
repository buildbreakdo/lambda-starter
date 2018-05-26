exports.handler = (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "foo": "bar"
    })
  });
}