const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          "plugins": ["transform-object-rest-spread"],
          presets: [
            [
              'env',
              {
                target: { node: 6.10 }, // Node version on AWS Lambda
                useBuiltIns: false,
                loose: false,
                exclude: [],
                debug: false
              },
            ],
          ],
        },
      }
    ],
  }
};
