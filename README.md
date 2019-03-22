## <img height="30" title="AWS" src="https://raw.githubusercontent.com/github/explore/fbceb94436312b6dacde68d122a5b9c7d11f9524/topics/aws/aws.png" /> Lambda Starter Kit <img align="right" title="Maintenance Status" src="https://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square" />
- <img width="40" title="Babel" src="https://raw.githubusercontent.com/babel/logo/master/babel.png" /> to enable ES6 and class syntax
- <img width="40" title="Webpack" src="https://camo.githubusercontent.com/d18f4a7a64244f703efcb322bf298dcb4ca38856/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667" /> Webpack to bundle only production dependencies to a single file, watch for changes and eliminate dead code
- <img width="40" title="AWS Sam Local" src="https://github.com/buildbreakdo/aws-sam-local/blob/develop/media/sam-local-banner.png" /> AWS Sam Local to emulate API Gateway locally so you can test your Lambda functions without deploying to AWS
- <img width="40" title="AWS Sam Local" src="https://github.com/buildbreakdo/jest/raw/master/website/static/img/jest-readme-headline.png" /> Jest to test and confirm code works during development and before deploying to production

## Installation
```
cd YourLambdaFunctionDirectory
git clone git@github.com:buildbreakdo/aws-api-lambda.git .
npm install
```

## Create
To ensure correct assignment of IAM, role and permissions the recomendation is to initialize the lambda function manually on AWS.

1) [Create a Lambda Function using the AWS Console](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html)
2) Update function-name in `package.json` with the name of the function you just created:
```
// package.json
...
  "scripts": {
    ...
    "update": "aws lambda update-function-code --function-name MyNewLambdaFunctionName --zip-file fileb://dist.zip --publish",
    ...
  }
...
```
3) [Install `aws-cli`](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
4) `npm run deploy` to build, run tests and update your function to the latest code

## Run Scripts

### Build
Use webpack to build/index.js:

`npm run build`

### Deploy
Build, execute tests in continuous integration mode (bail on failure) and update your Lambda function with the latest code:

`npm run deploy`

### Test
##### Run jest tests:

`npm run test`

##### Run jest tests in continuous integration mode (hard exit on test failure):

`npm run test:ci`

##### Run Jest tests continuously and watch for changes:

`npm run test:watch`

##### Debug Jest tests with Chrome browser:

1) Insert `debugger` on a line in your test
2) `npm run test:debug`
3) Open Chrome and navigate to about:inspect

### Watch
Monitor `src` folder for changes and rebuild when changes occur.

`npm run watch`

### Start
Used to be the case that we had to deploy a lambda function to test what would actually happen in a production environment. This is no longer the case, now we can emulate API Gateway locally using SAM Local. The `template.yml` file in the root of the repository is the configuration used by SAM Local (points to code in `build/index.js`).

Local Development Prerequisites. Running functions locally with SAM Local requires Docker to be installed and running.

 - macOS: [Docker for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
 - Windows: [Docker Toolbox](https://download.docker.com/win/stable/DockerToolbox.exe)
 - Linux: Check your distro’s package manager (e.g. yum install docker)

```
npm install -g aws-sam-local
npm start
```

Starts the AWS SAM Local development server on `http://127.0.0.1:3000`. Open `http://127.0.0.1:3000` in your browser to execute your Lambda function.

`Note: You only need to restart SAM CLI if you update your AWS SAM template.`

SAM Local will watch your `build` directory for changes and reload when changes
occur. Be sure to run `npm run watch` to monitor your `src` directory (where you will be writing code) to ensure SAM Local
always has the latest `build/index.js`. Happy coding!

#### License
MIT
