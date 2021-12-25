import fetch from 'node-fetch';

exports.handler = async (event, context, callback) => {
  // Request headers for a mock 200 response
  const request = fetch(decodeURIComponent(event.queryStringParameters.href), {
    method: 'HEAD'
  });

  let data;
  try {
    const response = await request;

    data = {
      url: response.url,
      status: response.status,
      statusText: response.statusText
    };
  } catch (e) {
    console.log(e);
  }

  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
