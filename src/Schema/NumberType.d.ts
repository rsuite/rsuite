import { Type } from './Type';

export declare class NumberType extends Type {
  constructor(errorMessage?: string);
  isInteger: (errorMessage: string) => this;
  pattern: (regexp: RegExp, errorMessage: string) => this;
  isOneOf: (numLst: number[], errorMessage: string) => this;
  range: (min: number, max: number, errorMessage: string) => this;
  min: (min: number, errorMessage: string) => this;
  max: (max: number, errorMessage: string) => this;
}

declare function getNumberType(errorMessage?: string): NumberType;

type exportType = typeof getNumberType;

export default exportType;
