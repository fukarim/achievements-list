const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;

const transliterateRusToEng = require('./transliterateRusToEng');
const saveImage = require('./saveImage');
const getExtensionFormMimeType = require('./getExtensionFormMimeType');

const imagesFolderPath = `${process.cwd()}\\static\\imgs`;

async function getOrCreateImagesSubFolder(name, isTemp) {
  const imagePath = `${imagesFolderPath}\\${name}${isTemp ? '-temp' : ''}`;
  if (!fs.existsSync(imagePath)) {
    await fsPromise.mkdir(imagePath);
  }

  return imagePath
}

async function processImages({id, title, logo, photos, updating}) {
  if (!logo && !photos || photos.length === 0) {
    return {}
  }

  const imagesSubFolderPath = await getOrCreateImagesSubFolder(id, updating);
  const imagesPrefix = transliterateRusToEng(title) || id;
  const logoFilePath = logo && logo.size > 0
    ? `${imagesPrefix}-logo.${getExtensionFormMimeType(logo.type)}`
    : "";

  if (logoFilePath) {
    await saveImage(logo, path.resolve(imagesSubFolderPath, logoFilePath));
  }

  let photosFilePaths;
  if (photos) {
    photosFilePaths = await Promise.all(photos.map(async (photo, index) => {
      const photoFilePath = `${imagesPrefix}-image${index + 1}.${getExtensionFormMimeType(photo.type)}`;
      await saveImage(photo, path.resolve(imagesSubFolderPath, photoFilePath));
      return photoFilePath
    }));
  }

  if (updating) {
    const prevImagesSubFolderPath = await getOrCreateImagesSubFolder(id);
    await fsPromise.rmdir(prevImagesSubFolderPath, {recursive: true});
    await fsPromise.rename(imagesSubFolderPath, prevImagesSubFolderPath)
  }

  return {
    ...logoFilePath ? {logoFilePath: path.join(id, logoFilePath)} : {},
    ...photosFilePaths ? {photosFilePaths: photosFilePaths.map(imgPath => path.join(id, imgPath))} : {}
  }
}

module.exports = {
  processImages,
  imagesFolderPath
};