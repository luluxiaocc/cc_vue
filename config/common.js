const dev = require('./dev');
const path = require('path');
const build = require('./build');
const merge = require('webpack-merge');

// 知识点一: 详谈,path.resolve  与  path.join
// 1: join
// windows下文件路径分隔符使用的是"\"
// Linux下文件路径分隔符使用的是"/"
// path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
// 长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录
// console.log(path.join('a','b','c','..','d')) // a/b/d  被拼接为一体, ..把c干掉了;

// 2: resolve
// 方法会把一个路径或路径片段的序列解析为一个绝对路径。
// 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。
// console.log('路径:',path.resolve('a','b','c'))
//  /Users/lulu/web/cc_vue/a/b/c  精确到了工程
// console.log(__dirname)
// /Users/lulu/web/cc_vue/config 精确到了文件夹

// 知识点二: 每一项的详细解释
const common = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: { // 只有一个key, 还写成value, 估计以后会有所动作
    rules: [
      {
        test: /.(css|sass|scss|less)$/,
        // style-loader 使用<style>标签将css-loader内部样式注入到我们的HTML页面
        // css-loader 主要用于处理图片路径 与 导入css文件的路径 然后义字符串的形式存入js
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        //默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程
        loader: 'babel-loader?cacheDirectory=true'
      }
    ]
  }
};

// 知识点3: 
// 参数就是 --env(参数名) dev(参数值)
// 要叫env..., 不然接不到值
module.exports = env => {
  let config = env == 'dev' ? dev : build;
  // merge的用法, 可以传很多个在后面.
  return merge(common, config);
};
