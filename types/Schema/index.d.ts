import { ArrayType, exportType as ArrayExportType } from './ArrayType';
import { BooleanType, exportType as BooleanExportType} from './BooleanType';
import { DateType, exportType as DateExportType } from './DateType';
import { NumberType, exportType as NumberExportType } from './NumberType';
import { StringType, exportType as StringExportType } from './StringType';
import { ObjectType, exportType as ObjectExportType } from './ObjectType';
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
