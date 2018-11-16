import { Type } from "./Type";

declare class StringType extends Type {
  constructor(errorMessage?: string);
  containsLetter: (errorMessage: string) => this;
  containsUppercaseLetter: (errorMessage: string) => this;
  containsLowercaseLetter: (errorMessage: string) => this;
  containsLetterOnly: (errorMessage: string) => this;
  containsNumber: (errorMessage: string) => this;
  isOneOf: (strArr: string[], errorMessage: string) => this;
  isEmail: (errorMessage: string) => this;
  isURL: (errorMessage: string) => this;
  isHex: (errorMessage: string) => this;
  pattern: (regexp: RegExp, errorMessage: string) => this;
  rangeLength: (minLength: number, maxLength: number, errorMessage: string) => this;
  minLength: (minLength: number, errorMessage: string) => this;
  maxLength: (maxLength: number, errorMessage: string) => this;
}

declare function getStringType(errorMessage?: string): StringType;

type exportType = typeof getStringType;

export {
  exportType,
  StringType
};
