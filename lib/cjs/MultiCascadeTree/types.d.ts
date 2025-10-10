/// <reference types="react" />
import type { CascadeTreeProps } from '../CascadeTree/types';
import type { ItemDataType, ToArray, WithAsProps } from '../internals/types';
export interface ItemKeys {
    valueKey: string;
    labelKey: string;
    childrenKey: string;
}
export interface MultiCascadeTreeProps<T = any, V = T[], L = any> extends WithAsProps, CascadeTreeProps<T, V> {
    /**
     * When set to true, selecting a child node will update the state of the parent node.
     */
    cascade?: boolean;
    /**
     * Disabled items
     */
    disabledItemValues?: ToArray<NonNullable<T>>;
    /**
     * Set the option value for the check box not to be rendered
     */
    uncheckableItemValues?: T[];
    /**
     * A collection of localized strings.
     */
    locale?: Partial<L>;
    /**
     * Called after the checkbox state changes.
     */
    onCheck?: (value: T[], node: ItemDataType<T>, checked: boolean, event: React.SyntheticEvent) => void;
}
