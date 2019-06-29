const path = require('path');
const HandyStorage = require('../lib/index');

const storage = new HandyStorage({
    beautify: true
});

storage.connect(path.resolve(__dirname, './information.json'));

storage.setState({
    name: 'Alireza',
    lastname: 'Sh',
    friends: [
        'Jane',
        'John'
    ],
    visited: storage.state.visited || 0
})

storage.setState({
    visited: storage.state.visited + 1
})