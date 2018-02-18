'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var beautify = require('json-beautify');

var HandyStorage = function () {

    /**
     * Represents a "Handy" storage
     * @constructor
     * @param {string} [path] - Path of JSON file
     * @param {Object} [options] - Additional Configurations
     * @param {boolean} [options.beautify] - Should storage beautify JSON before storing
     */
    function HandyStorage(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, HandyStorage);

        // If options was the first argument
        if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
            options = path;
            path = undefined;
        }

        // defining state
        this.state = null;

        // Initial variables
        this.savingInProgress = false;
        this.beautify = options.beautify || false;

        // If path was initialized connect it to the file immediately 
        if (path) this.connect(path);
    }

    /**
     * Connects storage to a JSON file
     * @param {string} path - Path of JSON file
     */


    _createClass(HandyStorage, [{
        key: 'connect',
        value: function connect(path) {
            this.path = path;
            var content = fs.readFileSync(path, 'utf8');
            this.state = JSON.parse(content || '{}');
        }

        /**
         * Saves current state into the connected JSON file
         * @return {Promise} Saving state callback promise
         */

    }, {
        key: 'save',
        value: function save() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                // Reject if saving is in progress
                if (_this.savingInProgress) return reject();

                // Save it if saving was not in progress
                _this.savingInProgress = true;

                // beutify state object if required
                var data = _this.beautify ? beautify(_this.state, null, 4, 50) : JSON.stringify(_this.state);

                // writing data to file
                fs.writeFile(_this.path, data, { flag: 'w' }, function (err) {
                    _this.savingInProgress = false;
                    if (err) return reject(err);
                    resolve(_this.state);
                });
            });
        }
    }]);

    return HandyStorage;
}();

module.exports = HandyStorage;