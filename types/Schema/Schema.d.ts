import { CheckType } from '.';
import { CheckResult } from './Type';

declare class Schema {
  constructor(schema: { [key: string]: CheckType });
  getFieldType: (fieldName: string) => CheckType;
  getKeys: () => string[];
  checkForField: (fieldName: string, fieldValue: any, data: object) => CheckResult;
  check: (data: object) => CheckResult;
}

declare function SchemaModel(schema: { [key: string]: CheckType }): Schema;

declare namespace SchemaModel {
  const combine: (...models: { [key: string]: CheckType }[]) => Schema;
}

export default SchemaModel;
export { Schema };
