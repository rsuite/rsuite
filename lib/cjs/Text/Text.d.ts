import type { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../internals/types';
declare const fontSizeMap: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
};
export interface TextProps extends WithAsProps {
    /**
     * The font color of the text.
     */
    color?: TypeAttributes.Color;
    /**
     * The font size of the text.
     */
    size?: keyof typeof fontSizeMap | number | string;
    /**
     * To set the text to be muted.
     */
    muted?: boolean;
    /**
     * To set the text transformation of the element.
     */
    transform?: 'uppercase' | 'lowercase' | 'capitalize';
    /**
     * To set the text alignment of the element
     */
    align?: 'left' | 'center' | 'right' | 'justify';
    /**
     * The font weight of the text.
     * @default 'regular'
     */
    weight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    /**
     * The number of lines to limit the provided text to. Text will be truncated with an ellipsis.
     */
    maxLines?: number;
}
/**
 *
 * The `Text` component is used to display text.
 *
 * @see https://rsuitejs.com/components/text
 */
declare const Text: RsRefForwardingComponent<'p', TextProps>;
export default Text;
