'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _PlaceholderGraph = _interopRequireDefault(require("./PlaceholderGraph"));
var _PlaceholderGrid = _interopRequireDefault(require("./PlaceholderGrid"));
var _PlaceholderParagraph = _interopRequireDefault(require("./PlaceholderParagraph"));
/**
 * The `Placeholder` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
var Placeholder = _PlaceholderParagraph.default;
Placeholder.Paragraph = _PlaceholderParagraph.default;
Placeholder.Grid = _PlaceholderGrid.default;
Placeholder.Graph = _PlaceholderGraph.default;
var _default = exports.default = Placeholder;