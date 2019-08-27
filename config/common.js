const dev = require('./dev');
const path = require('path');
const build = require('./build');
const merge = require('webpack-merge');

const common = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      }
    ]
  }
};
module.exports = env => {
  let config = env == 'dev' ? dev : build;
  return merge(common, config);
};
