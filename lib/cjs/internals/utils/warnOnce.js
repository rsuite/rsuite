'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.warnOnce = warnOnce;
var warned = {};

/**
 * Logs a warning message
 * but dont warn a same message twice
 */
function warnOnce(message) {
  if (!warned[message]) {
    console.warn(message);
    warned[message] = true;
  }
}
warnOnce._resetWarned = function () {
  for (var message in warned) {
    delete warned[message];
  }
};
var _default = exports.default = warnOnce;