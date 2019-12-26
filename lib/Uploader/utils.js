"use strict";

exports.__esModule = true;
exports.getFiles = exports.guid = void 0;

var guid = function guid(num) {
  if (num === void 0) {
    num = 8;
  }

  return (Math.random() * 1e18).toString(36).slice(0, num);
};

exports.guid = guid;

var getFiles = function getFiles(event) {
  if (typeof (event === null || event === void 0 ? void 0 : event['dataTransfer']) === 'object') {
    var _event$dataTransfer;

    return event === null || event === void 0 ? void 0 : (_event$dataTransfer = event['dataTransfer']) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.files;
  }

  if (event.target) {
    return event.target['files'];
  }

  return [];
};

exports.getFiles = getFiles;