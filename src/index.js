const fs = require('fs')
const beautify = require('json-beautify')

class HandyStorage {

    /**
     * Represents a Handy storage
     * @constructor
     * @param {String} path - Path of JSON file
     */
    constructor (path) {

        // Initial variables
        this.savingInProgress = false;

        // If path was initialized load it immediately 
        if (path !== undefined) {
            this.load(path)
        }

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
            // Reject if saving is in progress
            if (this.savingInProgress) return reject()

            // Save it if saving was not in progress
            this.savingInProgress = true;

            fs.writeFile(this.path, beautify(this.data, null, 4, 50), (err) => {
                this.savingInProgress = false;
                if (err) return reject(err)
                resolve(this.data)
            })
        })
    }

}

module.exports = HandyStorage