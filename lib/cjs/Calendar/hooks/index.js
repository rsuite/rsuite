'use client';
"use strict";

exports.__esModule = true;
var _exportNames = {
  useCalendar: true
};
exports.useCalendar = void 0;
var _useCalendarState = require("./useCalendarState");
Object.keys(_useCalendarState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useCalendarState[key]) return;
  exports[key] = _useCalendarState[key];
});
var _useCalendarDate = require("./useCalendarDate");
Object.keys(_useCalendarDate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useCalendarDate[key]) return;
  exports[key] = _useCalendarDate[key];
});
var _useCalendar = require("./useCalendar");
exports.useCalendar = _useCalendar.useCalendar;