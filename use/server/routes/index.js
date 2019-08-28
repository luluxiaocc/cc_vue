const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  ctx.body = {
    data: '我是数据'
  };
});

router.post('/', async (ctx, next) => {
  ctx.body = ctx.request.body;
});

module.exports = router;
