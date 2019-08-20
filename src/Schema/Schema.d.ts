import { CheckType } from './index.d';
import { CheckResult } from './Type';

export declare class Schema {
  constructor(schema: { [key: string]: CheckType });
  schema: { [key: string]: CheckType };
  getFieldType: (fieldName: string) => CheckType;
  getKeys: () => string[];
  checkForField: (fieldName: string, fieldValue: any, data: object) => CheckResult;
  checkForFieldAsync: (fieldName: string, fieldValue: any, data: object) => Promise<any>;
  check: (data: object) => CheckResult;
  checkAsync: (data: object) => Promise<any>;
}

declare function SchemaModel(schema: { [key: string]: CheckType }): Schema;

declare namespace SchemaModel {
  const combine: (...models: { [key: string]: CheckType }[]) => Schema;
}

export default SchemaModel;
