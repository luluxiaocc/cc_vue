const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 9999,
    hot: true,
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // template: path.resolve(__dirname, '../use/1:模板解析/index.html'),
      // template: path.resolve(__dirname, '../use/2:双向绑定/index.html'),
      // template: path.resolve(__dirname, '../use/3:指令/index.html'),
      // template: path.resolve(__dirname, '../use/4:事件/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      // chunks: ['main']
    })
  ]
};
