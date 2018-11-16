import { Type } from "./Type";
import { CheckType } from ".";

export declare class ObjectType extends Type {
  constructor(errorMessage?: string);
  shape: (types: {[key: string]: CheckType}) => this;
}

declare function getObjectType(errorMessage?: string): ObjectType;

type exportType = typeof getObjectType;

export default exportType;
