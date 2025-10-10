'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _schemaTyped = require("schema-typed");
var _react = require("react");
var _constructFlatSchema = require("../utils/constructFlatSchema");
function useSchemaModel(formModel, nestedField) {
  var subRulesRef = (0, _react.useRef)([]);
  var pushFieldRule = (0, _react.useCallback)(function (name, fieldRule) {
    subRulesRef.current.push({
      name: name,
      fieldRule: fieldRule
    });
  }, []);
  var removeFieldRule = (0, _react.useCallback)(function (name) {
    var index = subRulesRef.current.findIndex(function (v) {
      return v.name === name;
    });
    subRulesRef.current.splice(index, 1);
  }, []);
  var getCombinedModel = (0, _react.useCallback)(function () {
    var realSubRules = subRulesRef.current.filter(function (v) {
      return Boolean(v.fieldRule.current);
    });

    // If there is no sub rule, return the original form model
    if (realSubRules.length === 0) {
      return formModel;
    }
    var subRuleObject = realSubRules.map(function (_ref) {
      var _ref2;
      var name = _ref.name,
        fieldRule = _ref.fieldRule;
      return _ref2 = {}, _ref2[name] = fieldRule.current, _ref2;
    }).reduce(function (a, b) {
      return Object.assign(a, b);
    }, {});
    return _schemaTyped.SchemaModel.combine(formModel, (0, _schemaTyped.SchemaModel)(nestedField ? (0, _constructFlatSchema.constructFlatSchema)(subRuleObject) : subRuleObject));
  }, [formModel, nestedField]);
  return {
    getCombinedModel: getCombinedModel,
    pushFieldRule: pushFieldRule,
    removeFieldRule: removeFieldRule
  };
}
var _default = exports.default = useSchemaModel;