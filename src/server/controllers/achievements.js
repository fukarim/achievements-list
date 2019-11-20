const Router = require('koa-router');

const Achievement = require('../models/achievement');

const router = new Router({
  prefix: '/achievements'
});

router.get("/", async (ctx) => {
  try {
    const list = await Achievement.all();
    ctx.status = 200;
    ctx.body = list;
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

router.post("/", async (ctx) => {
  try {
    const {title, description = "", date = null, type} = ctx.request.body;
    const {logo, photos} = ctx.request.files;
    const photosArr = photos ? Array.isArray(photos) ? photos : [photos] : [];

    await Achievement.create({title, description, date, type, logo, photos: photosArr, unlocked: !!date});

    ctx.status = 200;
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

router.get("/:id", async (ctx) => {
  try {
    const {id} = ctx.params;
    const achievement = await Achievement.getById(id);
    ctx.status = 200;
    ctx.body = achievement;
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

router.put("/:id", async (ctx) => {
  try {
    const {id} = ctx.params;
    const {title, description, date, type, unlocked} = ctx.request.body;

    const fileData = {};
    if (ctx.request.files) {
      const {logo, photos} = ctx.request.files;
      fileData.logo = logo;
      if (photos) {
        fileData.photos = Array.isArray(photos) ? photos : [photos];
      }
    }

    await Achievement.update(id, {title, description, date, type, unlocked, ...fileData});
    ctx.status = 200;
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

router.del("/:id", async (ctx) => {
  try {
    const {id} = ctx.params;
    await Achievement.delete(id);
    ctx.status = 204;
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

module.exports = router;