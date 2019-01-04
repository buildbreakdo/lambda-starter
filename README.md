## AWS Lambda Starter Kit
-Babel to enable ES6 and class syntax
-Webpack to bundle, watch for changes and eliminate dead code
-AWS Sam Local to run API Gateway locally so you can test your Lambda functions without deploying to AWS

## Installation
```
cd YourLambdaFunctionDirectory
git clone git@github.com:buildbreakdo/aws-api-lambda.git .
npm install
```

## Create
To ensure correct assignment of IAM and role with permissions the recomendation is to initially create the AWS lambda function manually.

1) [Install `aws-cli`](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
2) [Create a Lambda Function with the Console](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html)
3) Update function-name in `package.json` with the name of the function you just created:
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
4) `npm run deploy` to deploy

## Scripts (package.json)

### Build
Use webpack to build build/index.js:

`npm run build`

### Deploy
Build, execute tests in continuous integration mode (bail on failure) and update your Lambda function with the latest code:

`npm run update`

### Test
Run jest tests:

`npm run test`

Run jest tests in continuous integration mode (hard exit on test failure):

`npm run test:ci`

Run Jest tests continuously and watch for changes:

`npm run test:watch`

### Watch
Monitor `src` folder for changes and rebuild when changes occur.

`npm run watch`

### Start
Used to be the case that we had to deploy a lambda function to test what would actually happen in a production environment. This is no longer the case, now we can emulate API Gateway locally using SAM Local. The `template.yml` file in the root of the repository is the configuration used by SAM Local (points to code in `build/index.js`).

Local Development Prerequisites. Running Serverless projects and functions locally with SAM Local requires Docker to be installed and running.

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
MIT.
