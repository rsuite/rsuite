/// <reference types="react" />
import { TypeAttributes } from '../internals/types';
export type ModalSize = TypeAttributes.Size | 'full' | number | string;
export declare const useBodyStyles: (ref: React.RefObject<HTMLElement>, options: {
    overflow: boolean;
    size?: ModalSize | undefined;
    prefix: (...classes: any) => string;
}) => [import("react").CSSProperties | null, (entering?: boolean) => void, () => void];
