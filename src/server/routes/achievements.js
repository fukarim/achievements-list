const fs = require("fs");
const path = require("path");
const Router = require('koa-router');

const JsonFileStorage = require('../database/JsonFileStorage');
const convertToId = require('../utils/convertToId');
const saveImage = require('../utils/saveImage');

const router = new Router();

const listFileName = process.env.NODE_ENV === 'production'
  ? process.env.DATA_FILE || 'list.json'
  : 'default-list.json';

const imagesFolderPath = `${process.cwd()}/static/imgs`;

const dataStorage = new JsonFileStorage(`${process.cwd()}/data/${listFileName}`);

function getImagesSubFolder(id) {
  if (!fs.existsSync(`${imagesFolderPath}/${id}`)) {
    fs.mkdirSync(`${imagesFolderPath}/${id}`);
  }

  return id
}

router.get("/achievements", async (ctx) => {
  try {
    const list = await dataStorage.get();
    ctx.status = 200;
    ctx.body = list;
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }

});

router.post("/achievements", async (ctx) => {
  try {
    const {title, desc, id, date, type} = ctx.request.body;
    const generatedId = id || convertToId(title);

    const {logo, photos} = ctx.request.files;

    const imagesSubFolder = Array.isArray(photos) ? getImagesSubFolder(generatedId) : "";

    const photosNames = Array.isArray(photos)
      ? photos.map((photo, index) => {
        const photoName = `${generatedId}-image${index + 1}${path.extname(photo.name)}`;
        saveImage(photo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, photoName));
        return `${imagesSubFolder}/${photoName}`
      })
      : [];

    const logoName = logo.size > 0 ? `${generatedId}-logo${path.extname(logo.name)}` : "";

    if (logoName) {
      saveImage(logo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, logoName));
    }

    const newAchievement = {
      id: generatedId,
      title,
      description: desc || "",
      logo: logoName ? `${imagesSubFolder}/${logoName}` : logoName,
      photos: photosNames,
      date: date ? new Date(date) : new Date(),
      unlocked: false,
      type: Number(type)
    };

    await dataStorage.crete(newAchievement);

    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }

});

module.exports = router;