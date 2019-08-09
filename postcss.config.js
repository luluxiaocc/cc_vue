module.exports = {
  plugins: [
    require('autoprefixer')({
        // 1: 最新版的话 browsers改成overrideBrowserslist就不报错了
        // 2: 部分用户出现不写[]里面的内容就不编译的bug
      overrideBrowserslist: [
          'iOS 7.1', 
          'ff > 31', 
          'ie >= 8',
          'Chrome > 31', 
          'Android 4.1', 
        ]
    })
  ]
};
