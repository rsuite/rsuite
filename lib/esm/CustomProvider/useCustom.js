'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["locale"];
import { useContext, useCallback, useMemo } from 'react';
import assign from 'lodash/assign';
import enGB from "../locales/en_GB.js";
import { format, parse, isValid } from "../internals/utils/date/index.js";
import { CustomContext } from "./CustomContext.js";
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
export function useCustom(componentName, componentProps) {
  var _globalLocale$DateTim;
  var _useContext = useContext(CustomContext),
    _useContext$component = _useContext.components,
    components = _useContext$component === void 0 ? {} : _useContext$component,
    _useContext$locale = _useContext.locale,
    globalLocale = _useContext$locale === void 0 ? enGB : _useContext$locale,
    _useContext$rtl = _useContext.rtl,
    rtl = _useContext$rtl === void 0 ? getDefaultRTL() : _useContext$rtl,
    formatDate = _useContext.formatDate,
    parseDate = _useContext.parseDate,
    classPrefix = _useContext.classPrefix,
    toasters = _useContext.toasters,
    disableRipple = _useContext.disableRipple;
  var _ref = componentProps || {},
    componentLocale = _ref.locale,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var dateLocale = globalLocale === null || globalLocale === void 0 || (_globalLocale$DateTim = globalLocale.DateTimeFormats) === null || _globalLocale$DateTim === void 0 ? void 0 : _globalLocale$DateTim.dateLocale;
  var code = globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale.code;
  var getLocale = useCallback(function (key, overrideLocale) {
    // Initialize with common locale
    var publicLocale = (globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale.common) || {};

    // Merge component-specific locale(s) based on key type
    var specificLocale = typeof key === 'string' ? globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale[key] : Array.isArray(key) ? assign.apply(void 0, [{}].concat(key.map(function (k) {
      return globalLocale === null || globalLocale === void 0 ? void 0 : globalLocale[k];
    }))) : {};

    // Merge all parts: public locale, specific locale, custom component locale
    return assign({}, publicLocale, specificLocale, componentLocale, overrideLocale);
  }, [globalLocale, componentLocale]);
  var propsWithDefaults = useMemo(function () {
    var _components$component;
    if (!componentName) {
      return;
    }

    //Memoize the global default props based on component name
    var globalDefaultProps = ((_components$component = components[componentName]) === null || _components$component === void 0 ? void 0 : _components$component.defaultProps) || {};
    var mergedProps = assign({}, globalDefaultProps, restProps);
    var localeKey = getComponentLocaleKey(componentName);

    // If the default locale has the component name, then merge the locale.
    if (Object.keys(enGB).includes(localeKey)) {
      return _extends({}, mergedProps, {
        locale: getLocale(localeKey)
      });
    }
    return mergedProps;
  }, [componentName, components, getLocale, restProps]);
  var _formatDate = useCallback(function (date, formatStr, options) {
    try {
      if (formatDate) {
        return formatDate(date, formatStr, options);
      }
      return format(isValid(date) ? date : new Date(), formatStr, _extends({
        locale: dateLocale
      }, options));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error: Invalid date format', error);
      }
      return 'Error: Invalid date format';
    }
  }, [dateLocale, formatDate]);
  var _parseDate = useCallback(function (dateString, formatString, referenceDate, options) {
    if (parseDate) {
      return parseDate(dateString, formatString, referenceDate, options);
    }
    return parse(dateString, formatString, referenceDate || new Date(), _extends({
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
export default useCustom;