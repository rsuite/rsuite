'use client';
import { ObjectType, ArrayType } from 'schema-typed';
import set from 'lodash/set';

/**
 * combine flat schema to nested schema
 */
export function constructFlatSchema(schema) {
  var shape = {};
  Object.keys(schema).forEach(function (key) {
    set(shape, key, {
      schema: schema[key],
      primitiveType: true
    });
  });
  function convertShapeToSchema(shape, result, internal) {
    Object.keys(shape).forEach(function (key) {
      var currentShape = shape[key];
      if (Array.isArray(currentShape)) {
        var _ArrayType;
        result[key] = (_ArrayType = ArrayType()).of.apply(_ArrayType, currentShape.map(function (v) {
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
    return internal ? ObjectType().shape(result) : result;
  }
  return convertShapeToSchema(shape, {});
}