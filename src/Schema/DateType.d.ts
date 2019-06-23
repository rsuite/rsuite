import { Type } from "./Type";

export declare class DateType extends Type {
  constructor(errorMessage?: string);
  range: (min: string, max: string, errorMessage: string) => this;
  min: (min: string, errorMessage: string) => this;
  max: (max: string, errorMessage: string) => this;
}

declare function getDateType(errorMessage?: string): DateType;

type exportType = typeof getDateType;

export default exportType;
