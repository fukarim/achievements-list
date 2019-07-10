const fs = require("fs");
const Router = require('koa-router');

const convertToId = require('../utils/convertToId');

const router = new Router();

// TODO: add abstraction over reading and write into DB

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

router.post("/achievements", async (ctx) => {
  try {
    const {title, desc, id, date, type} = ctx.request.body;

    const newAchievement = {
      id: id || convertToId(title),
      title,
      description: desc || "",
      logo: "", // TODO down
      photos: [], // TODO: add photo
      date: date ? new Date(date) : new Date(),
      unlocked: false,
      type: parseInt(type, 10)
    };

    const list = await new Promise((resolve, reject) => {
      fs.readFile(process.cwd() + '/data/list.json', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data.toString()))
      });
    });

    const newList = [...list, newAchievement];

    await new Promise((resolve, reject) => {
      fs.writeFile(process.cwd() + '/data/list.json', JSON.stringify(newList, null, 2), (err) => {
        if (err) {
          reject(err);
        }
        resolve()
      });
    });

    ctx.status = 200;
  }
  catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }

});

module.exports = router;