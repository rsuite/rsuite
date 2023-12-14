import {
  SchemaModel,
  StringType,
  NumberType,
  ArrayType,
  DateType,
  ObjectType,
  BooleanType,
  MixedType
} from 'schema-typed';

/**
 * SchemaTyped is a wrapper of schema-typed library to provide a more friendly API.
 * It is used to validate the data of the model.
 *
 * @see https://github.com/rsuite/schema-typed#schema-typed
 */
const SchemaTyped = {
  Model: SchemaModel,
  Types: {
    StringType,
    NumberType,
    ArrayType,
    DateType,
    ObjectType,
    BooleanType,
    MixedType
  }
};

export default SchemaTyped;
