/// <reference types="react" />
interface FocusItemValueProps<T = unknown> {
    target: HTMLElement | null | (() => HTMLElement | null);
    data?: T[];
    /**
     *  When the down arrow key is pressed, whether to automatically focus on the option
     */
    focusToOption?: boolean;
    valueKey?: string;
    focusableQueryKey?: string;
    defaultLayer?: number;
    rtl?: boolean;
    callback?: (value: any, event: React.KeyboardEvent) => void;
    getParent?: (node: T) => T | undefined;
}
/**
 * A hook that manages the focus state of the option.
 * @param defaultFocusItemValue
 * @param props
 */
declare const useFocusItemValue: <T, D>(defaultFocusItemValue: T | null | undefined, props: FocusItemValueProps<D>) => {
    focusItemValue: T | null | undefined;
    setFocusItemValue: import("react").Dispatch<import("react").SetStateAction<T | null | undefined>>;
    layer: number;
    setLayer: import("react").Dispatch<import("react").SetStateAction<number>>;
    keys: any[];
    setKeys: import("react").Dispatch<import("react").SetStateAction<any[]>>;
    onKeyDown: (...args: any[]) => any;
};
export default useFocusItemValue;
