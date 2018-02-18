var Handy = require('../lib/index')

const storage = new Handy('./test/db.json')
const { data } = storage

data.d = true
data.c = 1
data.f = {}
data.f.name = 'alireza'

storage.save()

console.log(storage)