export interface ConfigType {
    guide?: boolean;
    previousConformedValue?: string;
    placeholderChar?: string;
    placeholder?: string;
    currentCaretPosition?: number;
    keepCharPositions?: boolean;
}
export type MaskType = string | (string | RegExp)[];
export type MaskFunctionType = (rawValue: string, config: ConfigType) => MaskType;
