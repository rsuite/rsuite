"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = function _default(file, callback) {
  var reader = new FileReader();

  reader.onloadend = function () {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
};

exports.default = _default;
module.exports = exports.default;