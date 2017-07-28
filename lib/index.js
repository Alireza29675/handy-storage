'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var beautify = require('json-beautify');

var HandyStorage = function () {
    function HandyStorage(path) {
        _classCallCheck(this, HandyStorage);

        this.path = path;
        this.init();
    }

    _createClass(HandyStorage, [{
        key: 'init',
        value: function init() {
            var content = fs.readFileSync(this.path, 'utf8');
            this.data = JSON.parse(content == '' ? '{}' : content);
        }
    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                fs.writeFile(_this.path, beautify(_this.data, null, 4, 50), function (err) {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }
    }]);

    return HandyStorage;
}();

module.exports = HandyStorage;