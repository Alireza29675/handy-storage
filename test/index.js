const HandyStorage = require('../lib/index');

const storage = new HandyStorage({
    beautify: true
});

storage.connect('./test/information.json');

storage.data.name = 'Alireza';
storage.data.skills = ['Art', 'Programming'];

storage.data.friends = storage.data.friends || [];

storage.data.friends.push('John');
storage.data.friends.push('Jack');

storage.save();