"use strict";

exports.__esModule = true;
exports.shouldOnlyTime = exports.shouldDate = exports.shouldMonth = exports.shouldTime = void 0;

var shouldTime = function shouldTime(format) {
  return /(H|h|m|s)/.test(format);
};

exports.shouldTime = shouldTime;

var shouldMonth = function shouldMonth(format) {
  return /Y/.test(format) && /M/.test(format);
};

exports.shouldMonth = shouldMonth;

var shouldDate = function shouldDate(format) {
  return /Y/.test(format) && /M/.test(format) && /D/.test(format);
};

exports.shouldDate = shouldDate;

var shouldOnlyTime = function shouldOnlyTime(format) {
  return /(H|h|m|s)/.test(format) && !/(Y|M|D)/.test(format);
};

exports.shouldOnlyTime = shouldOnlyTime;