const childProcess = require('child_process');
const fetch = require('node-fetch');

let samProcess;
const port = 5000;
let lambdaUrl = `http://127.0.0.1:${port}/`;
function localApiStarted(processOutput) {
  // Example output when local function started - "Running on http://127.0.0.1:5000/"
  const urlRegex = /(Running on )(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gm;
  const matches = urlRegex.exec(processOutput);
  return matches && matches.length >= 3;
}

function startLambda(done) {
  samProcess = childProcess.spawn(
    'sam',
    ['local', 'start-api', '--port', port]
  );
  // The runtime output (for example, logs) is output to stderr, and the Lambda function result is output to stdout.
  // https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-invoke.html
  samProcess.stderr.on('data', data => {
    if (localApiStarted(data.toString())) {
      done();
    }
  });
  samProcess.on('error', error => {
    done(new Error(`SAM invoke error: ${error}`));
  });
}

function stopLambda() {
  samProcess.kill();
}

beforeAll((done) => {
  startLambda(done);
});

afterAll(() => {
  stopLambda();
});

test('returns error when href is not passed', (done) => {
  fetch(`${lambdaUrl}`)
    .then(res => {
      expect(res.status).toEqual(500);
      return res.json();
    })
    .then(res => {
      expect(res).toMatchSnapshot();
      done();
    });
});

test('returns error when href is invalid', (done) => {
  const qs = new URLSearchParams({ href: 'google.com' });
  fetch(`${lambdaUrl}?${qs}`)
    .then(res => {
      expect(res.status).toEqual(500);
      return res.json();
    })
    .then(res => {
      expect(res).toMatchSnapshot();
      done();
    });
});

test('fetches google.com', (done) => {
  const qs = new URLSearchParams({ href: 'https://google.com' });
  fetch(`${lambdaUrl}?${qs}`)
    .then(res => {
      expect(res.status).toEqual(200);
      return res.json();
    })
    .then(res => {
      expect(res).toMatchSnapshot();
      done();
    });
});
