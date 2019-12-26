"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _PlaceholderGraph = _interopRequireDefault(require("./PlaceholderGraph"));

var _PlaceholderGrid = _interopRequireDefault(require("./PlaceholderGrid"));

var _PlaceholderParagraph = _interopRequireDefault(require("./PlaceholderParagraph"));

var _default = {
  Paragraph: _PlaceholderParagraph.default,
  Grid: _PlaceholderGrid.default,
  Graph: _PlaceholderGraph.default
};
exports.default = _default;
module.exports = exports.default;