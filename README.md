# AWS API Gateway & Lambda Starter Kit
Project uses Babel to enable ES6 and the spread operator (e.g., `{...someObject}`). Webpack to create a single bundle and by resolving import/require statements and watch for changes. AWS Sam Local is used to run API Gateway locally so you can test your Lambda functions. Hot reloading is supported out of the box from webpack and AWS SAM Local.

# Installation
```
cd YourLambdaFunctionDirectory
git clone git@github.com:buildbreakdo/aws-api-lambda.git .
npm install
npm build
npm install -g aws-sam-local
npm start
```

# Develop Locally with `npm start`
Starts the AWS SAM Local development server on `http://127.0.0.1:3000`. This server is like running API Gateway Locally (historically we had to upload the code, painful experience no more!). 

Open `http://127.0.0.1:3000` in your browser to execute your Lambda function.

`Note: You only need to restart SAM CLI if you update your AWS SAM template.`

### Prerequisites
Running Serverless projects and functions locally with SAM Local requires Docker to be installed and running.

 - macOS: [Docker for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
 - Windows: [Docker Toolbox](https://download.docker.com/win/stable/DockerToolbox.exe)
 - Linux: Check your distro’s package manager (e.g. yum install docker)

# Watch file changes with `npm run watch`
SAM Local will watch your `build` directory for changes and reload when changes occur. To watch your `src` directory (where you will edit code) run `npm run watch`, after any changes are made in `src` webpack will recompile and output to `build` where AWS Sam Local will pickup the code changes. 

# Test with `npm test`
Invoke the mock API Gateway event.json. Change this as needed. To generate another mock event.json type: `sam local generate-event > anotherEvent.json`

### Invoking function with event via stdin
`echo '{"queryStringParameters": { "message": "Hey, are you there?" }}' | sam local invoke "Example"`

# License
MIT.
