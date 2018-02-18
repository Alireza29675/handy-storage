const fs = require('fs')
const beautify = require('json-beautify')

class HandyStorage {

    /**
     * Handy Storage constructor function
     * @param {string | object} path - Path of JSON file | Options objects including {path, autoSave}
     * @param {boolean} autoSave
     */
    constructor (path) {
        if (path !== undefined) this.load(path)
    }

    /**
     * Select and loads a JSON file
     * @param {string} path - Path of JSON file you want to load
     * @return {HandyStorage} returns this
     */
    load (path) {
        this.path = path
        const content = fs.readFileSync(path, 'utf8')
        this.data = JSON.parse(content == '' ? '{}' : content)
        return this;
    }

    /**
     * Saves the current storage into the selected JSON file
     * @return {Promise} saving promise
     */
    save () {
        return new Promise ((resolve, reject) => {
            fs.writeFile(this.path, beautify(this.data, null, 4, 50), (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }

}

module.exports = HandyStorage