'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var beautify = require('json-beautify');
var watch = require('watchjs');

var HandyStorage = function () {

    /**
     * Handy Storage constructor function
     * @param {string | object} path - Path of JSON file | Options objects including {path, autoSave}
     * @param {boolean} autoSave
     */
    function HandyStorage(path) {
        var autoSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, HandyStorage);

        if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
            if (path.autoSave !== undefined) autoSave = path.autoSave;
            path = path.path || path.url || undefined;
        }
        this._autoSave = autoSave;
        if (path !== undefined) this.load(path);
    }

    /**
     * Select and loads a JSON file
     * @param {string} path - Path of JSON file you want to load
     */


    _createClass(HandyStorage, [{
        key: 'load',
        value: function load(path) {
            this.path = path;
            var content = fs.readFileSync(path, 'utf8');
            this.data = JSON.parse(content == '' ? '{}' : content);
        }

        /**
         * Saves the current storage into the selected JSON file
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

        /**
         * autoSave variable setter
         * @param (boolean) to
         */

    }, {
        key: 'autoSave',
        set: function set(to) {
            if (typeof to === 'boolean') this._autoSave = to;
        }

        /**
         * autoSave variable getter
         */
        ,
        get: function get() {
            return this._autoSave;
        }
    }]);

    return HandyStorage;
}();

module.exports = HandyStorage;