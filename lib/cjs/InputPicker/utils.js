'use client';
"use strict";

exports.__esModule = true;
exports.convertSize = void 0;
var convertSize = exports.convertSize = function convertSize(size) {
  switch (size) {
    case 'lg':
      return 'lg';
    case 'sm':
    case 'xs':
      return 'sm';
    default:
      return 'md';
  }
};