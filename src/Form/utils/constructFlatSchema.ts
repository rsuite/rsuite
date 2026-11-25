import { ObjectType, ArrayType } from 'schema-typed';

import set from 'lodash/set';

/**
 * combine flat schema to nested schema
 */
export function constructFlatSchema(schema) {
  const shape = {};

  Object.keys(schema).forEach(key => {
    set(shape, key, {
      schema: schema[key],
      primitiveType: true
    });
  });
  function convertShapeToSchema(shape, result, internal?: boolean) {
    Object.keys(shape).forEach(key => {
      const currentShape = shape[key];
      if (Array.isArray(currentShape)) {
        result[key] = ArrayType().of(
          ...currentShape.map(v => {
            if (v.primitiveType) {
              return v.schema;
            }
            return convertShapeToSchema(v, {}, true);
          })
        );
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
