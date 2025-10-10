import { MaskType, ConfigType, MaskFunctionType } from './types';
export declare function isArray(value: any): boolean;
export default function conformToMask(rawValue?: string, mask?: MaskType | MaskFunctionType | any, config?: ConfigType): {
    conformedValue: string;
    meta: {
        someCharsRejected: boolean;
    };
};
