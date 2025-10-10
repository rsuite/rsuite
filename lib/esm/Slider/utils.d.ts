/// <reference types="react" />
export declare const precisionMath: (value: any) => number;
export declare function checkValue<T extends number | undefined | null>(value: T, min: number, max: number): number | T;
export declare function getPosition(e: React.MouseEvent | React.TouchEvent): {
    pageX: number;
    pageY: number;
};
