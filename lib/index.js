'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var beautify = require('json-beautify');

var DB = function () {
    function DB(path) {
        _classCallCheck(this, DB);

        this.path = path;
        var content = fs.readFileSync(this.path, 'utf8');
        this.json = JSON.parse(content == '' ? '{}' : content);
    }

    _createClass(DB, [{
        key: 'save',
        value: function save() {
            var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

            fs.writeFile(this.path, beautify(this.json, null, 4, 50), cb);
        }
    }]);

    return DB;
}();

module.exports = DB;