"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require('fs');

var beautify = require('json-beautify');

var HandyStorage =
/*#__PURE__*/
function () {
  /**
   * Represents a "Handy" storage
   * @constructor
   * @param {string} [path] - Path of JSON file
   * @param {Object} [options] - Additional Configurations
   * @param {boolean} [options.beautify] - Should storage beautify JSON before storing? (Default: false)
   * @param {boolean} [options.autoSave] - Should storage auto save when you use .setState() method? (Default: true)
   */
  function HandyStorage(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, HandyStorage);

    // If options was the first argument
    if (_typeof(path) === 'object') {
      options = path;
      path = undefined;
    } // defining state


    this.state = null; // Initial variables

    this.savingInProgress = false;
    this.beautify = options.beautify || false;
    this.autoSave = typeof options.autoSave === 'boolean' ? options.autoSave : true; // If path was initialized connect it to the file immediately 

    if (path) this.connect(path);
  }
  /**
   * Connects storage to a JSON file
   * @param {string} path - Path of JSON file
   */


  _createClass(HandyStorage, [{
    key: "connect",
    value: function connect(path) {
      this.path = path;
      var content = fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : function () {
        fs.writeFileSync(path, '{}');
        return '{}';
      }();
      this.state = JSON.parse(content || '{}');
      return this;
    }
    /**
     * Sets some changes on "state" object then saves it into the file
     * @param {Object} changes - State changes
     * @return {Promise} State change callback promise
     */

  }, {
    key: "setState",
    value: function setState() {
      var _this = this;

      var changes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        // changes validation
        if (_typeof(changes) !== 'object') {
          return reject("Given parameter in .setState() must be an object, you gave a ".concat(_typeof(changes)));
        } // assigning changes to current state


        Object.assign(_this.state, changes); // resolving promise

        resolve(_this.state); // if autoSave is enabled should save the file

        if (_this.autoSave) {
          // avoiding saving volley
          clearTimeout(_this.savingTimeout);
          _this.savingTimeout = setTimeout(function () {
            return _this.save({
              sync: true
            });
          }, 30);
        }
      });
    }
    /**
     * Saves current state into the connected JSON file
     * @param {Object} [options] - Additional save configurations
     * @param {boolean} [options.sync] - Should save synchronous? (Default: false)
     * @return {Promise} Saving state callback promise
     */

  }, {
    key: "save",
    value: function save() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // additional saving configuration variables
      var sync = options.sync || false; // making a promise to store data in the file

      return new Promise(function (resolve, reject) {
        // Reject if saving is in progress
        if (_this2.savingInProgress) return reject(); // Save it if saving was not in progress

        _this2.savingInProgress = true; // beutify state object if required

        var data = _this2.beautify ? beautify(_this2.state, null, 4, 50) : JSON.stringify(_this2.state);
        var fileWriteOptions = {
          flag: 'w',
          encoding: 'utf8' // writing data to file asynchronous

        };
        if (!sync) fs.writeFile(_this2.path, data, fileWriteOptions, function (err) {
          _this2.savingInProgress = false;
          if (err) return reject(err);
          resolve(_this2.state);
        }); // writing data synchronous
        else try {
            fs.writeFileSync(_this2.path, data, fileWriteOptions);
            _this2.savingInProgress = false;
            resolve(_this2.state);
          } catch (err) {
            _this2.savingInProgress = false;
            reject(err);
          }
      });
    }
  }]);

  return HandyStorage;
}();

module.exports = HandyStorage;