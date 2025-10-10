import React from 'react';
import { MaskType, MaskFunctionType, ConfigType } from './types';
/**
 * https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#guide
 */
interface TextMaskBaseProps {
    /**
     * `guide` is a boolean that tells the component whether to be in guide or no guide mode.
     */
    guide?: boolean;
    /**
     * `mask` is an array or a function that defines how the user input is going to be masked.
     */
    mask?: MaskType | MaskFunctionType | boolean;
    /**
     * `showMask` is a boolean that tells the Text Mask component to display the mask as a placeholder
     * in place of the regular placeholder when the input element value is empty.
     */
    showMask?: boolean;
    /** The placeholder character represents the fillable spot in the mask. The default placeholder character is underscore, _. */
    placeholderChar?: string;
    /** `keepCharPositions` changes the general behavior of the Text Mask component. */
    keepCharPositions?: boolean;
    /** You can provide a `pipe` function that will give you the opportunity to modify the conformed value before it is displayed on the screen. */
    pipe?: (conformedValue: string, config: ConfigType) => string;
}
export type TextMaskProps = TextMaskBaseProps & React.HTMLAttributes<HTMLInputElement> & {
    /** Custom rendering DOM */
    render?: (ref: React.Ref<HTMLInputElement>, props: React.HTMLAttributes<HTMLInputElement>) => any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    readOnly?: boolean;
    disabled?: boolean;
};
/**
 * The `TextMask` component is used to format the user input data.
 * @see https://rsuitejs.com/components/input/#masked-input
 */
declare const TextMask: React.ForwardRefExoticComponent<TextMaskBaseProps & React.HTMLAttributes<HTMLInputElement> & {
    /** Custom rendering DOM */
    render?: ((ref: React.Ref<HTMLInputElement>, props: React.HTMLAttributes<HTMLInputElement>) => any) | undefined;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    value?: string | number | undefined;
    readOnly?: boolean | undefined;
    disabled?: boolean | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export default TextMask;
