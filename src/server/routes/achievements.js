const fs = require("fs-extra");
const path = require("path");
const Router = require('koa-router');
const uuidv4 = require('uuid/v4');

const JsonFileStorage = require('../database/JsonFileStorage');
const convertToId = require('../utils/convertToId');
const saveImage = require('../utils/saveImage');

const router = new Router();

const listFileName = process.env.NODE_ENV === 'production'
  ? process.env.DATA_FILE || 'list.json'
  : 'default-list.json';

const imagesFolderPath = `${process.cwd()}/static/imgs`;

const dataStorage = new JsonFileStorage(`${process.cwd()}/data/${listFileName}`);

function getEmptyImagesSubFolder(id) {
  if (fs.existsSync(`${imagesFolderPath}/${id}`)) {
    // TODO: do it more properly
    // fs.emptyDirSync(`${imagesFolderPath}/${id}`, {recursive: true})
  } else {
    fs.mkdirSync(`${imagesFolderPath}/${id}`);
  }

  return id
}

function getImagesSubFolder(id) {
  if (!fs.existsSync(`${imagesFolderPath}/${id}`)) {
    fs.mkdirSync(`${imagesFolderPath}/${id}`);
  }

  return id
}

router.get("/achievements/:id", async (ctx) => {
  try {
    const {id} = ctx.params;
    const achievement = await dataStorage.get({id});
    ctx.status = 200;
    ctx.body = achievement;
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

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
    const {title, description = "", id, date = null, type} = ctx.request.body;
    const uid = uuidv4();
    // TODO: make id more simple or remove at all
    const generatedId = id || convertToId(title) || uid;

    const {logo, photos} = ctx.request.files;

    const imagesSubFolder = getImagesSubFolder(uid);
    const actualPhotos = photos
      ? Array.isArray(photos) ? photos : [photos]
      : [];
    const photosNames = actualPhotos.map((photo, index) => {
        const photoName = `${generatedId}-image${index + 1}${path.extname(photo.name)}`;
        saveImage(photo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, photoName));
        return `${imagesSubFolder}/${photoName}`
      });

    const logoName = logo && logo.size > 0 ? `${generatedId}-logo${path.extname(logo.name)}` : "";

    if (logoName) {
      saveImage(logo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, logoName));
    }

    const newAchievement = {
      uid,
      id: generatedId,
      title,
      description,
      logo: logoName ? `${imagesSubFolder}/${logoName}` : logoName,
      photos: photosNames,
      date,
      unlocked: !!date,
      type
    };

    await dataStorage.create(newAchievement);

    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }

});

router.put("/achievements/:id", async (ctx) => {
  try {
    const {id} = ctx.params;
    // TODO: check data shape
    const data = ctx.request.body;

    const fileData = {};

    if (ctx.request.files) {
      const {logo, photos} = ctx.request.files;

      // TODO: more generic
      const imagesSubFolder = getEmptyImagesSubFolder(id);

      const actualPhotos = photos
        ? Array.isArray(photos) ? photos : [photos]
        : [];

      // TODO: this code do not remove redundant photos
      const photosNames = actualPhotos.map((photo, index) => {
          const photoName = `${id}-image${index + 1}${path.extname(photo.name)}`;
          saveImage(photo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, photoName));
          return `${imagesSubFolder}/${photoName}`
        });

      const logoName = logo && logo.size > 0 ? `${id}-logo${path.extname(logo.name)}` : "";

      if (logoName) {
        saveImage(logo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, logoName));
      }

      fileData.logo = logoName ? `${imagesSubFolder}/${logoName}` : '';
      fileData.photos = photosNames;
    }

    await dataStorage.update(id, {
      ...data,
      ...fileData
    });

    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

router.del("/achievements/:id", async (ctx) => {
  try {
    const {id} = ctx.params;

    // TODO: remove images before removing achievemnt
    // const currentAchievement = dataStorage.get({id});
    await dataStorage.delete(id);

    ctx.status = 204;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }
});

module.exports = router;