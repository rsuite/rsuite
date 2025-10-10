import { MaskType, MaskFunctionType } from './types';
export declare const defaultPlaceholderChar = "_";
export declare function convertMaskToPlaceholder(mask?: MaskType | MaskFunctionType | any, placeholderChar?: string): string;
export declare function processCaretTraps(mask: any): {
    maskWithoutCaretTraps: any;
    indexes: number[];
};
