var Handy = require('../lib/index')

const storage = new Handy('./test/db.json')
const { data } = storage

data.d = false

storage.save()

console.log(storage)