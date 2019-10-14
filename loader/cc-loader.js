// 解析cc文件模板
let fs = require('fs');
let path = require('path');

function loader(source) {
  let template = fs.readFileSync(
    path.resolve(__dirname, './index.html'),
    'utf8'
  );
  source = source.replace(/\s+/g, ' ');
  let s = /<style>(.*)<\/style>/gm.exec(source)[1];
  let j = /<script>(.*)<\/script>/gm.exec(source)[1];
  let t = /<template>(.*)<\/template>/gm.exec(source)[1];
  template = template.replace(/(#--template-->)/, t);
  template = template.replace(/(#--style-->)/, `<style> ${s||''}</style>`);
  fs.writeFileSync(
    path.resolve(__dirname, '../public/index.html'),
    `${template}`,
    err => console.log(err)
  );

  return j;
}

module.exports = loader;
