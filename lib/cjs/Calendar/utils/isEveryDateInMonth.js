'use client';
"use strict";

exports.__esModule = true;
exports.isEveryDateInMonth = isEveryDateInMonth;
var _date = require("../../internals/utils/date");
function isEveryDateInMonth(year, month, predicate) {
  var days = (0, _date.getDaysInMonth)(new Date(year, month));
  for (var i = 1; i <= days; i++) {
    if (!predicate(new Date(year, month, i))) {
      return false;
    }
  }
  return true;
}