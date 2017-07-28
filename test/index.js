var Handy = require('../lib/index')

const storage = new Handy('./test/db.json')

storage.data.a = 1
storage.data.b = 1
storage.save()

console.log(storage)