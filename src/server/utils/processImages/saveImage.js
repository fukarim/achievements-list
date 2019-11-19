const fs = require('fs');

function saveImage(image, path) {
  const reader = fs.createReadStream(image.path);
  const stream = fs.createWriteStream(path);
  reader.pipe(stream);
  return new Promise((resolve, reject) => {
    reader.on('end', () => {
      resolve()
    });
    reader.on('error', (e) => {
      reject(e)
    });
  })
}

module.exports = saveImage;