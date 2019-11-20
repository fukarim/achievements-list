const fsPromise = require('fs').promises;

const uuidv4 = require('uuid/v4');

const Storage = require('./Storage');

class JsonFileStorage extends Storage {
  constructor(filename) {
    super();
    this.filename = filename
  }

  async read({id}) {
    const data = await this._getData();
    if (id) {
      return data.find(el => el.id === id);
    }
    return data;
  }

  async create(newData) {
    if ('id' in newData) {
      throw new Error('JsonFileStorage: Property id cannot be passed to new recording. It used internally.')
    }

    const data = await this._getData();
    const id = uuidv4();

    await this._saveData([...data, {...newData, id}]);

    return id
  }

  async update(id, dataToUpdate) {
    const list = await this._getData();
    const elemIndex = list.findIndex(el => el.id === id);

    if (elemIndex === -1) {
      throw new Error(`Element with id ${id} doesn't found`)
    }

    const updatedElem = {
      ...list[elemIndex],
      ...dataToUpdate
    };

    return this._saveData([...list.slice(0, elemIndex), updatedElem, ...list.slice(elemIndex + 1)])
  }

  async delete(id) {
    // TODO: change to soft deleting
    const list = await this._getData();
    return this._saveData(list.filter(item => item.id !== id))
  }

  async _getData() {
    if (this.data) {
      return this.data
    }
    const data = await fsPromise.readFile(this.filename);
    this.data = JSON.parse(data.toString());
    return this.data;
  }

  async _saveData(newData) {
    try {
      await fsPromise.writeFile(this.filename, JSON.stringify(newData, null, 2));
      this.data = newData;
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = JsonFileStorage;