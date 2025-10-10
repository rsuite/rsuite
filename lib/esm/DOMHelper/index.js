'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import * as helpers from 'dom-lib';
import isElement from "./isElement.js";
export * from 'dom-lib';

/**
 * a wrapper of dom-lib with some custom methods.
 * @see https://rsuitejs.com/components/dom-helper/
 */
var DOMHelper = _extends({}, helpers, {
  isElement: isElement
});
export default DOMHelper;