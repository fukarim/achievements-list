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

  async create(newData) {
    const list = await this.get();
    const newList = [...list, newData];

    await fsPromise.writeFile(this.filename, JSON.stringify(newList, null, 2))

    return true
  }

  async update(uid, dataToUpdate) {
    const list = await this.get();
    const elemIndex = list.findIndex(el => el.uid === uid);

    if (elemIndex === -1) {
      throw new Error(`Element with uid ${uid} doesn't found`)
    }

    const updatedElem = {
      ...list[elemIndex],
      ...dataToUpdate
    };
    const newList = [
      ...list.slice(0, elemIndex),
      updatedElem,
      ...list.slice(elemIndex + 1)
    ];

    await fsPromise.writeFile(this.filename, JSON.stringify(newList, null, 2));

    return true
  }
}

module.exports = JsonFileStorage;