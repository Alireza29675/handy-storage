const fs = require('fs')
const beautify = require('json-beautify')

class HandyStorage {

    /**
     * Represents a "Handy" storage
     * @constructor
     * @param {String} [path] - Path of JSON file
     */
    constructor (path) {
        // Initial variables
        this.savingInProgress = false;

        // If path was initialized connect it to the file immediately 
        if (path !== undefined) this.connect(path)
    }

    /**
     * Connects storage to a JSON file
     * @param {string} path - Path of JSON file
     */
    connect (path) {
        this.path = path
        const content = fs.readFileSync(path, 'utf8')
        this.data = JSON.parse(content == '' ? '{}' : content)
    }

    /**
     * Saves current data into the connected JSON file
     * @return {Promise} Saving data callback promise
     */
    save () {
        return new Promise ((resolve, reject) => {
            // Reject if saving is in progress
            if (this.savingInProgress) return reject()

            // Save it if saving was not in progress
            this.savingInProgress = true;

            // fileData
            const fileData = beautify(this.data, null, 4, 50)

            // writing fileData to file
            fs.writeFile(this.path, fileData, { flag: 'w' }, (err) => {
                this.savingInProgress = false;
                if (err) return reject(err)
                resolve(this.data)
            })
        })
    }

}

module.exports = HandyStorage