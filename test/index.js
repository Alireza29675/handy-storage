var Handy = require('../lib/index')

const storage = new Handy('./test/db.json', true)
const { data } = storage

data.d = true
data.c = 1
data.f = {}
data.f.name = 'alireza'

console.log(storage)