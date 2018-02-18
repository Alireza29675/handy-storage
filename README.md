<a name="beginning"></a>

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

const storage = new HandyStorage();
storage.connect('./information.json');

storage.state.name = 'Alireza';
storage.state.skills = ['Art', 'Programming'];

storage.state.friends = storage.state.friends || [];

storage.state.friends.push('John');
storage.state.friends.push('Jack');

storage.save();
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
    * [.save()](#HandyStorage+save) ⇒ <code>Promise</code>

<a name="new_HandyStorage_new"></a>

### new HandyStorage([path], [options])
Represents a "Handy" storage



| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>string</code> | Path of JSON file |
| [options] | <code>Object</code> | Additional Configurations |
| [options.beautify] | <code>boolean</code> | Should storage beautify JSON before storing? |


<a name="HandyStorage+connect"></a>

### handyStorage.connect(path)
Connects storage to a JSON file

**Kind**: instance method of [<code>HandyStorage</code>](#HandyStorage)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path of JSON file |

<a name="HandyStorage+state"></a>

### handyStorage.state
Mirror object of file's data

**Kind**: instance property of [<code>HandyStorage</code>](#HandyStorage)

**Tip**: you can change this object and call [.save()](#HandyStorage+save) to store it into JSON file.


<a name="HandyStorage+save"></a>

### handyStorage.save() ⇒ <code>Promise</code>
Saves current state into the connected JSON file

**Kind**: instance method of [<code>HandyStorage</code>](#HandyStorage)
**Returns**: <code>Promise</code> - Saving state callback promise