const fsPromise = require('fs').promises;

const Storage = require('./Storage');

class JsonFileStorage extends Storage {
  constructor(filename) {
    super();
    this.filename = filename
  }

  async get(options) {
    const data = await fsPromise.readFile(this.filename);

    return JSON.parse(data.toString());
  }

  async crete(newData) {
    const list = await this.get();
    const newList = [...list, newData];

    await fsPromise.writeFile(this.filename, JSON.stringify(newList, null, 2))

    return true
  }
}

module.exports = JsonFileStorage;