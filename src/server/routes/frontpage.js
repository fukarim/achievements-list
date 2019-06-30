const fs = require('fs');
const Router = require('koa-router');

const router = new Router();

router.get("*", async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('public/index.html');
});

module.exports = router;
