var Handy = require('../lib/index')

const storage = new Handy

storage.load('./test/db.json')
storage.data.c = true
storage.save()

console.log(storage)