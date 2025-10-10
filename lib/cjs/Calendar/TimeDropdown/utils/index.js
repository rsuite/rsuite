'use client';
"use strict";

exports.__esModule = true;
var _exportNames = {
  getTimeLimits: true,
  formatWithLeadingZero: true,
  scrollToTime: true
};
exports.scrollToTime = exports.getTimeLimits = exports.formatWithLeadingZero = void 0;
var _getTimeLimits = require("./getTimeLimits");
exports.getTimeLimits = _getTimeLimits.getTimeLimits;
var _formatWithLeadingZero = require("./formatWithLeadingZero");
exports.formatWithLeadingZero = _formatWithLeadingZero.formatWithLeadingZero;
var _scrollToTime = require("./scrollToTime");
exports.scrollToTime = _scrollToTime.scrollToTime;
var _getClockTime = require("./getClockTime");
Object.keys(_getClockTime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _getClockTime[key]) return;
  exports[key] = _getClockTime[key];
});