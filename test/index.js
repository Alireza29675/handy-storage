const HandyStorage = require('../lib/index');

const storage = new HandyStorage({
    beautify: true
});

storage.connect('./test/information.json');

storage.state.name = 'Alireza';
storage.state.skills = ['Art', 'Programming'];

storage.state.friends = storage.state.friends || [];

storage.state.friends.push('John');
storage.state.friends.push('Jack');

storage.save();