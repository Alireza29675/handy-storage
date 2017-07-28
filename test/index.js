var HandyStorage = require('../lib/index')

const storage = new HandyStorage('./test/db.json')

storage.json.a = 1
storage.json.b = 1
storage.save()

console.log(storage)