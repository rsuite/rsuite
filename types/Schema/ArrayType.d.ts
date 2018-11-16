import { Type } from "./Type";

declare class ArrayType extends Type {
  constructor(errorMessage?: string);
  rangeLength: (minLength: number, maxLength: number, errorMessage: string) => this;
  minLength: (minLength: number, errorMessage: string) => this;
  maxLength: (maxLength: number, errorMessage: string) => this;
  unrepeatable: (errorMessage: string) => this;
  of: (type: any, errorMessage: string) => this;
}

declare function getArrayType(errorMessage?: string): ArrayType;

type exportType = typeof getArrayType;

export {
  exportType,
  ArrayType
};
