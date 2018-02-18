<a name="beginning"></a>

![handy-storage logo](https://user-images.githubusercontent.com/2771377/36355655-d20e813a-14fb-11e8-8c15-4741799c9090.png)

# HandyStorage
**HandyStorage** is a simple way to store your data in a JSON file

<a name="Installation"></a>
## Installation
```bash
npm install --save handy-storage
```

<a name="Usage"></a>
## Example of Usage
```javascript
const HandyStorage = require('handy-storage');

const storage = new HandyStorage({
    beautify: true
});

storage.connect('./information.json');

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
```

<a name="Refrence"></a>

## Manual Refrence

<a name="HandyStorage"></a>

### HandyStorage
**Kind**: global class

* [HandyStorage](#HandyStorage)
    * [new HandyStorage([path])](#new_HandyStorage_new)
    * [.connect(path)](#HandyStorage+connect)
    * [.state](#HandyStorage+state)
    * [.setState([changes])](#HandyStorage+setState)
    * [.save([options])](#HandyStorage+save) ⇒ <code>Promise</code>

<a name="new_HandyStorage_new"></a>

### new HandyStorage([path], [options])
Represents a "Handy" storage



| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>string</code> | Path of JSON file |
| [options] | <code>Object</code> | Additional Configurations |
| [options.beautify] | <code>boolean</code> | Should storage beautify JSON before storing? _(Default: **false**)_ |
| [options.autoSave] | <code>boolean</code> | Should storage auto save when you use **.setState()** method? _(Default: **true**)_ |


<a name="HandyStorage+connect"></a>

### handyStorage.connect(path)
Connects storage to a JSON file

**Kind**: instance method of [<code>HandyStorage</code>](#HandyStorage)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path of JSON file |

<a name="HandyStorage+state"></a>

### handyStorage.state
State object of storage, including all stored data

**Kind**: instance property of [<code>HandyStorage</code>](#HandyStorage)

> **Tip 1**: you can change this object and call [.save()](#HandyStorage+save) to store it into JSON file.

> **Tip 2**: try to use [.setState()](#HandyStorage+setState) method instead of changing **.state** directly! it's much safer, also it supports **autoSave** mode.

<a name="HandyStorage+setState"></a>

### handyStorage.setState(changes) ⇒ <code>Promise</code>
Sets some changes on "state" object then saves it into the file

**Kind**: instance method of [<code>HandyStorage</code>](#HandyStorage)

| Param | Type | Description |
| --- | --- | --- |
| changes | <code>Object</code> | State changes |

**Returns**: <code>Promise</code> - State change callback promise


<a name="HandyStorage+save"></a>

### handyStorage.save([options]) ⇒ <code>Promise</code>
Saves current state into the connected JSON file

**Kind**: instance method of [<code>HandyStorage</code>](#HandyStorage)

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Additional save configurations |
| [options.sync] | <code>boolean</code> | Should save synchronous? _(Default: **false**)_ |

**Returns**: <code>Promise</code> - Saving state callback promise
