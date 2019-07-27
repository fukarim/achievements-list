const fs = require("fs");
const path = require("path");
const Router = require('koa-router');

const convertToId = require('../utils/convertToId');
const saveImage = require('../utils/saveImage');

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
  } catch (err) {
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }

});

router.post("/achievements", async (ctx) => {
  try {
    const {title, desc, id, date, type} = ctx.request.body;

    // TODO: use id instead of generated if it exists
    const generatedId = convertToId(title);

    // TODO: добавление папки (предварительная проверка)
    // Добавлять папку, если есть картинки (не только картинка)
    const {logo, photos} = ctx.request.files;

    // TODO: refactor usage of this two variables
    const imagesFolderPath = `${process.cwd()}/static/imgs`;
    let imagesSubFolder = "";
    let photosNames = [];
    if (Array.isArray(photos)) {
      // TODO: change to promise
      imagesSubFolder = generatedId;
      if (!fs.existsSync(`${imagesFolderPath}/${imagesSubFolder}`)) {
        fs.mkdirSync(`${imagesFolderPath}/${imagesSubFolder}`);
      }

      photosNames = photos.map((photo, index) => {
        const photoName = `${generatedId}-image${index + 1}${path.extname(photo.name)}`;
        saveImage(photo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, photoName));
        return `${imagesSubFolder}/${photoName}`
      })
    }

    const logoName = logo.size > 0 ? `${generatedId}-logo${path.extname(logo.name)}` : "";

    if (logoName) {
      saveImage(logo, path.join(`${imagesFolderPath}/${imagesSubFolder}`, logoName));
    }

    const newAchievement = {
      // remove ?
      id: id || generatedId,
      title,
      description: desc || "",
      logo: logoName ? `${imagesSubFolder}/${logoName}`: logoName,
      photos: photosNames,
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

    // TODO: change to fsPromise (update node version)
    await new Promise((resolve, reject) => {
      fs.writeFile(process.cwd() + '/data/list.json', JSON.stringify(newList, null, 2), (err) => {
        if (err) {
          reject(err);
        }
        resolve()
      });
    });

    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {error: "400 Bad Request"}
  }

});

module.exports = router;