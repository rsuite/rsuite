import React from 'react';
interface FocusEventOptions {
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function useIsFocused({ onFocus: onFocusProp, onBlur: onBlurProp }: FocusEventOptions): [boolean, FocusEventOptions];
export default useIsFocused;
