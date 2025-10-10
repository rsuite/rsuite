'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.isImage = isImage;
exports.previewFile = previewFile;
// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
var MIME = ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
function isImage(file) {
  return MIME.includes(file === null || file === void 0 ? void 0 : file.type);
}
function previewFile(file, callback) {
  if (!isImage(file)) {
    return callback(null);
  }
  var reader = new FileReader();
  reader.onloadend = function () {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}
var _default = exports.default = previewFile;