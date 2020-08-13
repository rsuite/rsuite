import {
  SchemaModel,
  StringType,
  NumberType,
  ArrayType,
  DateType,
  ObjectType,
  BooleanType
} from 'schema-typed';

export interface SchemaType {
  /** Defining Data Model objects */
  Model: typeof SchemaModel;

  /** Provides a set of data types */
  Types: {
    StringType: typeof StringType;
    NumberType: typeof NumberType;
    ArrayType: typeof ArrayType;
    DateType: typeof DateType;
    ObjectType: typeof ObjectType;
    BooleanType: typeof BooleanType;
  };
}

const Schema: SchemaType = {
  Model: SchemaModel,
  Types: {
    StringType,
    NumberType,
    ArrayType,
    DateType,
    ObjectType,
    BooleanType
  }
};

export default Schema;
