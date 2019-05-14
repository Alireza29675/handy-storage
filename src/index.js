const fs = require('fs');
const beautify = require('json-beautify');

class HandyStorage {

    /**
     * Represents a "Handy" storage
     * @constructor
     * @param {string} [path] - Path of JSON file
     * @param {Object} [options] - Additional Configurations
     * @param {boolean} [options.beautify] - Should storage beautify JSON before storing? (Default: false)
     * @param {boolean} [options.autoSave] - Should storage auto save when you use .setState() method? (Default: true)
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
        this.autoSave = (typeof options.autoSave === 'boolean') ? options.autoSave : true;

        // If path was initialized connect it to the file immediately 
        if (path) this.connect(path);
    }

    /**
     * Connects storage to a JSON file
     * @param {string} path - Path of JSON file
     */
    connect (path) {
        this.path = path;
        const content = fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : (() => {
            fs.writeFileSync(path, '{}')
            return '{}'
        })()
        this.state = JSON.parse(content || '{}');
    }

    /**
     * Sets some changes on "state" object then saves it into the file
     * @param {Object} changes - State changes
     * @return {Promise} State change callback promise
     */
    setState (changes = {}) {
        return new Promise((resolve, reject) => {
            // changes validation
            if (typeof changes !== 'object') {
                return reject(`Given parameter in .setState() must be an object, you gave a ${typeof changes}`)
            }

            // assigning changes to current state
            Object.assign(this.state, changes)

            // resolving promise
            resolve(this.state)

            // if autoSave is enabled should save the file
            if (this.autoSave) {
                // avoiding saving volley
                clearTimeout(this.savingTimeout)
                this.savingTimeout = setTimeout(() => this.save({ sync: true }), 30)
            }
        })
    }

    /**
     * Saves current state into the connected JSON file
     * @param {Object} [options] - Additional save configurations
     * @param {boolean} [options.sync] - Should save synchronous? (Default: false)
     * @return {Promise} Saving state callback promise
     */
    save (options = {}) {
        // additional saving configuration variables
        const sync = options.sync || false;

        // making a promise to store data in the file
        return new Promise ((resolve, reject) => {
            // Reject if saving is in progress
            if (this.savingInProgress) return reject();

            // Save it if saving was not in progress
            this.savingInProgress = true;

            // beutify state object if required
            const data = this.beautify ? beautify(this.state, null, 4, 50) : JSON.stringify(this.state);

            const fileWriteOptions = { flag: 'w', encoding: 'utf8' }

            // writing data to file asynchronous
            if (!sync) fs.writeFile(this.path, data, fileWriteOptions, (err) => {
                this.savingInProgress = false;
                if (err) return reject(err);
                resolve(this.state);
            })

            // writing data synchronous
            else try {
                fs.writeFileSync(this.path, data, fileWriteOptions);
                this.savingInProgress = false;
                resolve(this.state);
            } catch (err) {
                this.savingInProgress = false;
                reject(err);
            }
        })
    }

}

module.exports = HandyStorage