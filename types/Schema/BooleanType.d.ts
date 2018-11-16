import { Type } from './Type';

declare class BooleanType extends Type {
  constructor(errorMessage?: string);
}

declare function getBooleanType(errorMessage?: string): BooleanType;

type exportType = typeof getBooleanType;

export {
  exportType,
  BooleanType,
};
