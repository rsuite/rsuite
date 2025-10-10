'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _utils = require("../internals/utils");
/**
 * The Content component is used to wrap content in a themed container with a max-width.
 * @see https://rsuitejs.com/components/container/
 *
 * For Internet Explorer 11 and lower, it's suggested that an ARIA role of "main"
 * be added to the <main> element to ensure it is accessible
 */
var Content = (0, _utils.createComponent)({
  name: 'Content',
  componentAs: 'main'
});
var _default = exports.default = Content;