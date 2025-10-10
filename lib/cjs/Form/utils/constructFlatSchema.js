'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.constructFlatSchema = constructFlatSchema;
var _schemaTyped = require("schema-typed");
var _set = _interopRequireDefault(require("lodash/set"));
/**
 * combine flat schema to nested schema
 */
function constructFlatSchema(schema) {
  var shape = {};
  Object.keys(schema).forEach(function (key) {
    (0, _set.default)(shape, key, {
      schema: schema[key],
      primitiveType: true
    });
  });
  function convertShapeToSchema(shape, result, internal) {
    Object.keys(shape).forEach(function (key) {
      var currentShape = shape[key];
      if (Array.isArray(currentShape)) {
        var _ArrayType;
        result[key] = (_ArrayType = (0, _schemaTyped.ArrayType)()).of.apply(_ArrayType, currentShape.map(function (v) {
          if (v.primitiveType) {
            return v.schema;
          }
          return convertShapeToSchema(v, {}, true);
        }));
      } else {
        if (currentShape.primitiveType) {
          result[key] = currentShape.schema;
        } else {
          result[key] = convertShapeToSchema(currentShape, {}, true);
        }
      }
    });
    return internal ? (0, _schemaTyped.ObjectType)().shape(result) : result;
  }
  return convertShapeToSchema(shape, {});
}