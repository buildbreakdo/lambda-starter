import fetch from 'node-fetch';

exports.handler = async (event, context, callback) => {
  const request = fetch('https://google.com', {
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
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}