import { Type } from './Type';

export declare class BooleanType extends Type {
  constructor(errorMessage?: string);
}

declare function getBooleanType(errorMessage?: string): BooleanType;

type exportType = typeof getBooleanType;

export default exportType;
