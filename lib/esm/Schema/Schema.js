'use client';
import { SchemaModel, StringType, NumberType, ArrayType, DateType, ObjectType, BooleanType, MixedType } from 'schema-typed';

/**
 * SchemaTyped is a wrapper of schema-typed library to provide a more friendly API.
 * It is used to validate the data of the model.
 *
 * @see https://github.com/rsuite/schema-typed#schema-typed
 */
var SchemaTyped = {
  Model: SchemaModel,
  Types: {
    StringType: StringType,
    NumberType: NumberType,
    ArrayType: ArrayType,
    DateType: DateType,
    ObjectType: ObjectType,
    BooleanType: BooleanType,
    MixedType: MixedType
  }
};
export default SchemaTyped;