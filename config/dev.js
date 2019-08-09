const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 知识点1: mode的区别
    // ## development
    // 1. 不压缩
    // 2. 不摇树
    // 3. 有完善的错误提示
    // 4. 可以设完备的source-map
    // new webpack.NamedModulesPlugin(),
    // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    // 记住，只设置 NODE_ENV，则不会自动设置 mode。
  mode: 'development', // 不要模式可以设置 "none"
  // 知识点2: map的各种选项
  devtool: 'source-map',
  // 知识点3: 各种配置
  devServer: {
    port: 9999,
    hot: true
  },
  resolve: {
    // 引用包时候的路径
    // 比如说require('cc'), 那么会从如下配置路径去找有没有cc模块
    // 使自己写的导出方法, 也可以不指定路径, 直接引用
    // modules: [path.resolve(__dirname, '../node_modules')],
    // alias: { // 别名
    //   '@': './dist/home.js'
    // },
    // mainFiles: ['index', 'main'], // 先找index, 没有再找main文件
    // extensions: ['js', 'css'] // 扩展名先找js, 没有的话再找css
  },
  plugins: [
    // 这个插件的作用是在热加载时直接返回更新文件名，而不是文件的id。
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    // development已经开启了
    // new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../use/1:模板.html'),
      inject: 'head' // 插入头部
    })
  ]
};
