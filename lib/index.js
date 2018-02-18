'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var beautify = require('json-beautify');

var HandyStorage = function () {

    /**
     * Handy Storage constructor function
     * @param {string | object} path - Path of JSON file | Options objects including {path, autoSave}
     * @param {boolean} autoSave
     */
    function HandyStorage(path) {
        _classCallCheck(this, HandyStorage);

        if (path !== undefined) this.load(path);
    }

    /**
     * Select and loads a JSON file
     * @param {string} path - Path of JSON file you want to load
     * @return {HandyStorage} returns this
     */


    _createClass(HandyStorage, [{
        key: 'load',
        value: function load(path) {
            this.path = path;
            var content = fs.readFileSync(path, 'utf8');
            this.data = JSON.parse(content == '' ? '{}' : content);
            return this;
        }

        /**
         * Saves the current storage into the selected JSON file
         * @return {Promise} saving promise
         */

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