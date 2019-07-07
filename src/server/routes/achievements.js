const fs = require("fs");
const Router = require('koa-router');

const router = new Router();

router.get("/achievements", async (ctx) => {
  try {
    const list = await new Promise((resolve, reject) => {
      fs.readFile(process.cwd() + '/data/list.json', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data.toString()))
      });
    });

    ctx.status = 200;
    ctx.body = list;
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }

});

// TODO: add post method with achievement creation

module.exports = router;