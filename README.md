# AWS API Gateway & Lambda Starter Kit
- Babel
  - Presets
    - Env (Babel preset that automatically determines the Babel plugins you need based on your supported environments)
  - Plugins
    - Object rest spread transform (e.g., enables `{ ...someObj }`)
- Webpack
- AWS Sam Local

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

## Prerequisites
Running Serverless projects and functions locally with SAM Local requires Docker to be installed and running. 
- macOS: Docker for Mac
- Windows: Docker Toolbox
- Linux: Check your distro’s package manager (e.g. yum install docker)

Read more about that from Amazon here: https://github.com/awslabs/aws-sam-local. 


# Watch file changes with `npm run watch`
SAM Local will watch your `build` directory for changes and reload when changes occur. To watch your `src` directory (where you will edit code) run `npm run watch`, after any changes are made in `src` webpack will recompile and output to `build` where AWS Sam Local will pickup the code changes. 

# Test with `npm test`
Invoke the mock API Gateway event.json. Change this as needed. To generate another mock event.json type: `sam local generate-event > anotherEvent.json`

### Invoking function with event via stdin
`echo '{"queryStringParameters": { "message": "Hey, are you there?" }}' | sam local invoke "Example"`

# Happy Coding!
