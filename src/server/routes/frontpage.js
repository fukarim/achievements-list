const Router = require('koa-router');

const app = require("../../../public/App.js");

const router = new Router();

router.get("*", async (ctx) => {
  const { html } = app.render({ url: ctx.request.url });

  ctx.type = 'html';
  ctx.body = `
    <!doctype html>
    <html>
    <head>
        <meta charset='utf8'>
        <meta name='viewport' content='width=device-width'>
    
        <link rel='stylesheet' href='/global.css'>
        <link rel='stylesheet' href='/bundle.css'>
    </head>
    
    <body>
    <div id="app">${html}</div>
    <script src='/bundle.js'></script>
    </body>
    </html>
  `;
});

module.exports = router;
