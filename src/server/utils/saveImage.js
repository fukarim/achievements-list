const fs = require('fs');

function saveImage(image, path) {
  const reader = fs.createReadStream(image.path);
  const stream = fs.createWriteStream(path);
  reader.pipe(stream);
}

module.exports = saveImage;