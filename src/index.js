const fs = require('fs');
const beautify = require('json-beautify');

class HandyStorage {

    /**
     * Represents a "Handy" storage
     * @constructor
     * @param {string} [path] - Path of JSON file
     * @param {Object} [options] - Additional Configurations
     * @param {boolean} [options.beautify] - Should storage beautify JSON before storing
     */
    constructor (path, options = {}) {
        // If options was the first argument
        if (typeof path === 'object') {
            options = path;
            path = undefined;
        }

        // defining state
        this.state = null;

        // Initial variables
        this.savingInProgress = false;
        this.beautify = options.beautify || false;

        // If path was initialized connect it to the file immediately 
        if (path) this.connect(path);
    }

    /**
     * Connects storage to a JSON file
     * @param {string} path - Path of JSON file
     */
    connect (path) {
        this.path = path;
        const content = fs.readFileSync(path, 'utf8');
        this.state = JSON.parse(content || '{}');
    }

    /**
     * Saves current state into the connected JSON file
     * @return {Promise} Saving state callback promise
     */
    save () {
        return new Promise ((resolve, reject) => {
            // Reject if saving is in progress
            if (this.savingInProgress) return reject();

            // Save it if saving was not in progress
            this.savingInProgress = true;

            // beutify state object if required
            const data = this.beautify ? beautify(this.state, null, 4, 50) : JSON.stringify(this.state);

            // writing data to file
            fs.writeFile(this.path, data, { flag: 'w' }, (err) => {
                this.savingInProgress = false;
                if (err) return reject(err);
                resolve(this.state);
            })
        })
    }

}

module.exports = HandyStorage