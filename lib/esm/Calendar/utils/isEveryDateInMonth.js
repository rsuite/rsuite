'use client';
import { getDaysInMonth } from "../../internals/utils/date/index.js";
export function isEveryDateInMonth(year, month, predicate) {
  var days = getDaysInMonth(new Date(year, month));
  for (var i = 1; i <= days; i++) {
    if (!predicate(new Date(year, month, i))) {
      return false;
    }
  }
  return true;
}