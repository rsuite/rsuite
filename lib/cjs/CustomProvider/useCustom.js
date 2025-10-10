'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useCustom = useCustom;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = require("react");
var _assign = _interopRequireDefault(require("lodash/assign"));
var _en_GB = _interopRequireDefault(require("../locales/en_GB"));
var _date = require("../internals/utils/date");
var _CustomContext = require("./CustomContext");
var _excluded = ["locale"];
function getDefaultRTL() {
  return typeof document !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl';
}

/**
 * Maps a component name to its corresponding locale key
 * @param componentName - The name of the component
 * @returns The locale key for the component
 */
function getComponentLocaleKey(componentName) {
  // Define mappings for components that share locale keys
  var localeKeyMappings = {
    // All picker components use the Combobox locale
    Cascader: 'Combobox',
    CheckTreePicker: 'Combobox',
    MultiCascader: 'Combobox',
    SelectPicker: 'Combobox',
    TreePicker: 'Combobox',
    CheckPicker: 'Combobox',
    // Time components use date components locales
    TimePicker: 'DatePicker',
    TimeRangePicker: 'DateRangePicker'
  };

  // Return the mapped locale key or the component name itself if no mapping exists
  return localeKeyMappings[componentName] || componentName;
}

/**
 * A hook to get custom configuration of `<CustomProvider>`
 * @param componentName - The name of the component
 * @param componentProps - The props of the component
 */
function useCustom(componentName, componentProps) {
  var _globalLocale$DateTim;
  var _useContext = (0, _react.useContext)(_CustomContext.CustomContext),
    _useContext$component = _useContext.components,
    components = _useContext$component === void 0 ? {} : _useContext$component,
    _useContext$locale = _useContext.locale,
    globalLocale = _useContext$locale === void 0 ? _en_GB.default : _useContext$locale,
    _useContext$rtl = _useContext.rtl,
    rtl = _useContext$rtl === void 0 ? getDefaultRTL() : _useContext$rtl,
    formatDate = _useContext.formatDate,
    parseDate = _useContext.parseDate,
    classPrefix = _useContext.classPrefix,
    toasters = _useContext.toasters,
    disableRipple = _useContext.disableRipple;
  var _ref = componentProps || {},
    componentLocale = _ref.locale,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  var dateLocale = globalLocale === null || globalLocale === void 0 || (_globalLocale$DateTim = globalLocale.DateTimeFormats) === null || _globalLocale$DateTim === void 0 ? void 0 : _globalLocale$DateTim.dateLocale;
  var code = globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale.code;
  var getLocale = (0, _react.useCallback)(function (key, overrideLocale) {
    // Initialize with common locale
    var publicLocale = (globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale.common) || {};

    // Merge component-specific locale(s) based on key type
    var specificLocale = typeof key === 'string' ? globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale[key] : Array.isArray(key) ? _assign.default.apply(void 0, [{}].concat(key.map(function (k) {
      return globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale[k];
    }))) : {};

    // Merge all parts: public locale, specific locale, custom component locale
    return (0, _assign.default)({}, publicLocale, specificLocale, componentLocale, overrideLocale);
  }, [globalLocale, componentLocale]);
  var propsWithDefaults = (0, _react.useMemo)(function () {
    var _components$component;
    if (!componentName) {
      return;
    }

    //Memoize the global default props based on component name
    var globalDefaultProps = ((_components$component = components[componentName]) === null || _components$component === void 0 ? void 0 : _components$component.defaultProps) || {};
    var mergedProps = (0, _assign.default)({}, globalDefaultProps, restProps);
    var localeKey = getComponentLocaleKey(componentName);

    // If the default locale has the component name, then merge the locale.
    if (Object.keys(_en_GB.default).includes(localeKey)) {
      return (0, _extends2.default)({}, mergedProps, {
        locale: getLocale(localeKey)
      });
    }
    return mergedProps;
  }, [componentName, components, getLocale, restProps]);
  var _formatDate = (0, _react.useCallback)(function (date, formatStr, options) {
    try {
      if (formatDate) {
        return formatDate(date, formatStr, options);
      }
      return (0, _date.format)((0, _date.isValid)(date) ? date : new Date(), formatStr, (0, _extends2.default)({
        locale: dateLocale
      }, options));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error: Invalid date format', error);
      }
      return 'Error: Invalid date format';
    }
  }, [dateLocale, formatDate]);
  var _parseDate = (0, _react.useCallback)(function (dateString, formatString, referenceDate, options) {
    if (parseDate) {
      return parseDate(dateString, formatString, referenceDate, options);
    }
    return (0, _date.parse)(dateString, formatString, referenceDate || new Date(), (0, _extends2.default)({
      locale: dateLocale
    }, options));
  }, [parseDate, dateLocale]);
  return {
    code: code,
    rtl: rtl,
    toasters: toasters,
    disableRipple: disableRipple,
    classPrefix: classPrefix,
    propsWithDefaults: propsWithDefaults,
    getLocale: getLocale,
    formatDate: _formatDate,
    parseDate: _parseDate
  };
}
var _default = exports.default = useCustom;