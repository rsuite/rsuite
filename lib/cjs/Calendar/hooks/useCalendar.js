'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useCalendar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = require("react");
var _CalendarProvider = require("../CalendarProvider");
var _excluded = ["locale", "showWeekNumbers", "isoWeek", "weekStart"];
var useCalendar = exports.useCalendar = function useCalendar() {
  var _locale$dateLocale2;
  var _useContext = (0, _react.useContext)(_CalendarProvider.CalendarContext),
    locale = _useContext.locale,
    showWeekNumbers = _useContext.showWeekNumbers,
    isoWeek = _useContext.isoWeek,
    weekStartProp = _useContext.weekStart,
    rest = (0, _objectWithoutPropertiesLoose2.default)(_useContext, _excluded);

  // Determine the start of the week based on various conditions
  var weekStart = (0, _react.useMemo)(function () {
    var _locale$dateLocale;
    // If weekStartProp is explicitly provided, use it
    if (typeof weekStartProp !== 'undefined') {
      return weekStartProp;
    }
    // If using ISO week, start on Monday (1)
    else if (isoWeek) {
      return 1;
    }
    // If locale specifies a weekStartsOn option, use it
    else if ((locale === null || locale === void 0 || (_locale$dateLocale = locale.dateLocale) === null || _locale$dateLocale === void 0 || (_locale$dateLocale = _locale$dateLocale.options) === null || _locale$dateLocale === void 0 ? void 0 : _locale$dateLocale.weekStartsOn) !== undefined) {
      return locale.dateLocale.options.weekStartsOn;
    }
    // Default to Sunday (0) if no other condition is met
    return 0;
  }, [weekStartProp, isoWeek, locale === null || locale === void 0 || (_locale$dateLocale2 = locale.dateLocale) === null || _locale$dateLocale2 === void 0 || (_locale$dateLocale2 = _locale$dateLocale2.options) === null || _locale$dateLocale2 === void 0 ? void 0 : _locale$dateLocale2.weekStartsOn]);
  return (0, _extends2.default)({
    locale: locale,
    showWeekNumbers: showWeekNumbers,
    isoWeek: isoWeek,
    weekStart: weekStart
  }, rest);
};