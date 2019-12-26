"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _defaultProps = _interopRequireDefault(require("recompose/defaultProps"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _rsuiteTable = require("rsuite-table");

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var _TablePagination = _interopRequireDefault(require("./TablePagination"));

var EnhancedLocaleTable = (0, _compose.default)((0, _withLocale.default)(['Table']), (0, _defaultProps.default)({
  loadAnimation: true
}))(_rsuiteTable.Table);
(0, _setStatic.default)('Column', _rsuiteTable.Column)(EnhancedLocaleTable);
(0, _setStatic.default)('Cell', _rsuiteTable.Cell)(EnhancedLocaleTable);
(0, _setStatic.default)('HeaderCell', _rsuiteTable.HeaderCell)(EnhancedLocaleTable);
(0, _setStatic.default)('Pagination', _TablePagination.default)(EnhancedLocaleTable);
var _default = EnhancedLocaleTable;
exports.default = _default;
module.exports = exports.default;