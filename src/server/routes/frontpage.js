const fs = require('fs');
const Router = require('koa-router');

const app = require("../../../public/App.js");

const router = new Router();

router.get("*", async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('public/index.html');

  // TODO: fix SSR
  // const { html } = app.render({ url: req.url });
  //
  // ctx.request.write(`
  //   <!DOCTYPE html>
  //   <link rel='stylesheet' href='/global.css'>
  //   <link rel='stylesheet' href='/bundle.css'>
  //   <div id="app">${html}</div>
  //   <script src="/bundle.js"></script>
  // `);
  //
  // ctx.request.end();
});

module.exports = router;
