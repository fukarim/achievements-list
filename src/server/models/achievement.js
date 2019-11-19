const fsPromise = require('fs').promises;

const JsonFileStorage = require('../database/JsonFileStorage');
const {processImages, imagesFolderPath} = require('../utils/processImages');
const omitUndefined = require('../utils/omitUndefined');

const achievementsFileName = process.env.NODE_ENV === 'production'
  ? process.env.DATA_FILE || 'list.json'
  : 'default-list.json';
const dataStorage = new JsonFileStorage(`${process.cwd()}/data/${achievementsFileName}`);

exports.all = async function () {
  return dataStorage.read({})
};

exports.getById = async function(id) {
  return dataStorage.read({id})
};

exports.create = async function (settings) {
  const {title, description, date, type, logo, photos = [], unlocked} = settings;
  const id = await dataStorage.create({});

  const {logoFilePath = '', photosFilePaths = []} = await processImages({id, title, logo, photos});

  return dataStorage.update(id, {
    title,
    description,
    date,
    type,
    logo: logoFilePath || '',
    photos: photosFilePaths,
    unlocked
  })
};

exports.update = async function (id, newSettings) {
  const {title, description, date, type, logo, photos, unlocked} = newSettings;

  const {logoFilePath, photosFilePaths} = await processImages({id, title, logo, photos, updating: true});

  return dataStorage.update(id, omitUndefined({
    title,
    description,
    date,
    type,
    logo: logoFilePath,
    photos: photosFilePaths,
    unlocked
  }))
};

exports.delete = async function (id) {
  return Promise.all([
    fsPromise.rmdir(`${imagesFolderPath}\\${id}`, {recursive: true}),
    dataStorage.delete(id)
  ])
};