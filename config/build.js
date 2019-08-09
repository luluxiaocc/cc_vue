module.exports = {
  mode: 'production'
  //  plugins: [
  //  压缩js代码
  //  new UglifyJsPlugin(/* ... */),
  //  改环境变量
  //  new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
  //  过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，这个插件 可以提升或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
  //  new webpack.optimize.ModuleConcatenationPlugin(),
  //  在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 emitted 标识都是 false。
  //   new webpack.NoEmitOnErrorsPlugin()
  //  ]
};
