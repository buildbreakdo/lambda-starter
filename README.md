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
Run API Gateway locally using `template.yml` configuration. This configuration points to `build/index.js`.

`npm run start`

Navigate to `localhost:5000` to see your function live locally. Changes are automatically watched for.

#### Local Development
Prerequisites. Running Serverless projects and functions locally with SAM Local requires Docker to be installed and running.

 - macOS: [Docker for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
 - Windows: [Docker Toolbox](https://download.docker.com/win/stable/DockerToolbox.exe)
 - Linux: Check your distro’s package manager (e.g. yum install docker)

```
npm install -g aws-sam-local
npm start
```

Starts the AWS SAM Local development server on `http://127.0.0.1:3000`. This server is like running API Gateway Locally (historically we had to upload the code, painful experience no more!).

Open `http://127.0.0.1:3000` in your browser to execute your Lambda function.

`Note: You only need to restart SAM CLI if you update your AWS SAM template.`

#### Watch file changes
SAM Local will watch your `build` directory for changes and reload when changes
occur. To watch your `src` directory (where you will edit code) run `npm run watch`,
after any changes are made in `src` webpack will recompile and output to `build`
where AWS Sam Local will pickup the code changes.


#### License
MIT.
