const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin()
    ]
  },
  externals: {
    'aws-sdk': 'aws-sdk'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [ './src/index.js' ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    // Node-Postgres.js is the cononical SQL postgres library; when bundling
    // pg-native must be ignored to build
    // See: https://github.com/serverless-heaven/serverless-webpack/issues/78
    new webpack.IgnorePlugin(/^pg-native$/),

    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
    //
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          configFile: './babel.config.js'
        }
      }
    ],
  }
};
