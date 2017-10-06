const fs = require('fs')
const beautify = require('json-beautify')

class HandyStorage {

    /**
     * Handy Storage constructor function
     * @param {string | object} path - Path of JSON file | Options objects including {path, autoSave}
     * @param {boolean} autoSave
     */
    constructor (path, autoSave = false) {
        if (typeof path === 'object') {
            if (path.autoSave !== undefined) autoSave = path.autoSave
            path = path.path || path.url || undefined
        }
        if (path !== undefined) this.load(path)
        this.autoSave = autoSave
    }

    /**
     * Select and loads a JSON file
     * @param {string} path - Path of JSON file you want to load
     */
    load (path) {
        this.path = path
        const content = fs.readFileSync(path, 'utf8')
        this.data = JSON.parse(content == '' ? '{}' : content)
    }

    /**
     * Saves the current storage into the selected JSON file
     */
    save () {
        return new Promise ((resolve, reject) => {
            fs.writeFile(this.path, beautify(this.data, null, 4, 50), (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }

    /**
     * autoSave variable setter
     * @param (boolean) mustAutoSave
     */
    set autoSave (mustAutoSave) {
        if (typeof mustAutoSave === 'boolean') {
            this._autoSave = mustAutoSave
            if (mustAutoSave) {
                
            }
            else {

            }
        }
    }

    /**
     * autoSave variable getter
     */
    get autoSave () {
        return this._autoSave
    }
}

module.exports = HandyStorage