## AWS API Gateway & Lambda Starter Kit
Project uses Babel to enable ES6 and the spread operator (e.g., `{...someObject}`). Webpack to create a single bundle and by resolving import/require statements and watch for changes. AWS Sam Local is used to run API Gateway locally so you can test your Lambda functions. Hot reloading is supported out of the box from webpack and AWS SAM Local.

## Installation
```
cd YourLambdaFunctionDirectory
git clone git@github.com:buildbreakdo/aws-api-lambda.git .
npm install
```

## Deploy (manual)
Run `npm run build` and `npm run dist`. Upload the dist.zip to AWS Lambda through the AWS console.

## That is all! Everything below is just a nice to have..
-------

#### Deploy (via aws-cli)
Install the aws-cli instructions can be found https://github.com/aws/aws-cli. Replace the example IAM Role ARN in `package.json` `create` script with your own. From AWS Console > IAM > Role > Select Role Name > See "Role ARN" which should look something like `arn:aws:iam::9999999999:role/ExecuteLambda`. Be sure the proper policies are attached to allow the Lambda function to execute.

Once this is copied over run:

`npm run create` 

This is just syntactic sugar for running the aws-cli command `aws lambda create-function --function-name Example --role arn:aws:iam::9999999999:role/ExecuteLambda --handler index.handler --runtime nodejs6.10 --zip-file fileb://dist.zip --publish`

#### Update
To update your Lambda function with the latest code run:

`npm run update`

#### Invoke
To invoke your Lambda function that is now deployed with the mock event.json:

`npm run invoke`

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

#### Watch file changes with `npm run watch`
SAM Local will watch your `build` directory for changes and reload when changes occur. To watch your `src` directory (where you will edit code) run `npm run watch`, after any changes are made in `src` webpack will recompile and output to `build` where AWS Sam Local will pickup the code changes. 

#### Test
Invoke your Lambda function using the mock API Gateway event.json by running:

`npm test`

Change the event.json as needed. Additional mock events can be generated via: 

`sam local generate-event api > anotherEvent.json`


#### License
MIT.
