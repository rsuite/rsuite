import ArrayExportType, { ArrayType } from './ArrayType';
import BooleanExportType, { BooleanType } from './BooleanType';
import DateExportType, { DateType } from './DateType';
import NumberExportType, { NumberType } from './NumberType';
import StringExportType, { StringType } from './StringType';
import ObjectExportType, { ObjectType } from './ObjectType';
import SchemaModel from './Schema';

export type CheckType = ArrayType | BooleanType | DateType | NumberType | StringType;

declare namespace Schema {
  const Model: typeof SchemaModel;
  const Types: {
    StringType: StringExportType;
    NumberType: NumberExportType;
    ArrayType: ArrayExportType;
    DateType: DateExportType;
    ObjectType: ObjectExportType;
    BooleanType: BooleanExportType;
  };
}

export default Schema;
