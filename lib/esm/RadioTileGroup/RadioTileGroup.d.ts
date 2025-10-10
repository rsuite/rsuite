import React from 'react';
import type { WithAsProps, FormControlBaseProps, RsRefForwardingComponent } from '../internals/types';
import type { ValueType } from '../RadioTile';
export interface RadioTileContextProps {
    name?: string;
    value?: ValueType | null;
    controlled?: boolean;
    disabled?: boolean;
    onChange?: (value: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface RadioTileGroupProps<T = ValueType> extends WithAsProps, FormControlBaseProps<T> {
    /** Name to use for form */
    name?: string;
    /** Inline layout */
    inline?: boolean;
    /** Whether radio is disabled */
    disabled?: boolean;
    /** Primary content */
    children?: React.ReactNode;
}
export declare const RadioTileContext: React.Context<RadioTileContextProps>;
/**
 * The `RadioTileGroup` component is used to group a collection of `RadioTile` components.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
declare const RadioTileGroup: RsRefForwardingComponent<'div', RadioTileGroupProps>;
export default RadioTileGroup;
