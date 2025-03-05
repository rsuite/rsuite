import { ObjectType, ArrayType } from 'schema-typed';

import set from 'lodash/set';

export function constructFlatSchema(schema) {
  const shape = {};

  Object.keys(schema).forEach(key => {
    set(shape, key, {
      schema: schema[key],
      originalKey: key
    });
  });
  function convertShapeToSchema(shape, result, internal?: boolean) {
    Object.keys(shape).forEach(key => {
      const currentShape = shape[key];
      if (Array.isArray(currentShape)) {
        if ('originalKey' in currentShape[0]) {
          result[key] = ArrayType().of(currentShape[0].schema);
        } else {
          result[key] = ArrayType().of(convertShapeToSchema(currentShape[0], {}, true));
        }
      } else {
        if ('originalKey' in currentShape) {
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
