module.exports = {
  "testEnvironment": "node",

  "verbose": false,

  "globals": {
    "__DEV__": true
  },

  "transformIgnorePatterns": [
    "/node_modules/"
  ],

  "setupFiles": [
    "./jest.globals.js"
  ],

  "rootDir": "./"
}