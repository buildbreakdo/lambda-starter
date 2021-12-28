import fetch from 'node-fetch';

function createResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

exports.handler = async ({queryStringParameters}, context) => {
  // TODO: Validate body or query params with some kind of json schema. AJV?
  try {
    // Request headers for a mock 200 response
    const response = await fetch(decodeURIComponent(queryStringParameters.href), {
      method: 'HEAD'
    });

    return createResponse(200, {
      url: response.url,
      status: response.status,
      statusText: response.statusText
    });
  } catch (error) {
    return createResponse(500, {error: {message: error.message}});
  }
};
