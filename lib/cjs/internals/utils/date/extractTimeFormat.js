'use client';
"use strict";

exports.__esModule = true;
exports.extractTimeFormat = extractTimeFormat;
/**
 * Extracts the time format from a given date format.
 */
function extractTimeFormat(format) {
  var match = format.match(/([hH]{1,2}[:.]mm(?:[:.]ss)?(?: ?aa)?|(?:aa )?[hH]{1,2}[:.]mm(?:[:.]ss)?)/);
  return match ? match[0] : null;
}