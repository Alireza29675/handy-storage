const fs = require('fs')
const beautify = require('json-beautify')

class HandyStorage {
    constructor (path) {
        if (path !== undefined) this.load(path)
    }
    load (path) {
        this.path = path
        const content = fs.readFileSync(this.path, 'utf8')
        this.data = JSON.parse(content == '' ? '{}' : content)
    }
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