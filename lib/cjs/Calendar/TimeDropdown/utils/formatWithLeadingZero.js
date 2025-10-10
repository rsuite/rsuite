'use client';
"use strict";

exports.__esModule = true;
exports.formatWithLeadingZero = void 0;
var formatWithLeadingZero = exports.formatWithLeadingZero = function formatWithLeadingZero(number) {
  return String(number).padStart(2, '0');
};