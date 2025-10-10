import React from 'react';
import { ListProps, ListHandle } from '../Windowing';
import { RSUITE_PICKER_GROUP_KEY } from '../symbols';
import { StandardProps, ItemDataType, DataProps } from '../types';
interface InnerItemDataType extends ItemDataType {
    [RSUITE_PICKER_GROUP_KEY]?: boolean;
}
/**
 * Props for the Listbox component.
 */
/**
 * Props for the Listbox component.
 * @template Multiple - Whether multiple selection is enabled.
 */
export interface ListboxProps<Multiple = false> extends StandardProps, Partial<DataProps<InnerItemDataType>>, Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    groupBy?: string;
    disabledItemValues?: any[];
    activeItemValues?: any[];
    focusItemValue?: any;
    maxHeight?: number;
    listItemAs: React.ElementType | string;
    listItemClassPrefix?: string;
    listItemProps?: any;
    rowHeight?: number;
    /** */
    rowGroupHeight?: number;
    /** */
    virtualized?: boolean;
    /** */
    listProps?: Partial<ListProps>;
    /** */
    listRef?: React.Ref<ListHandle>;
    /**
     * Query string for filtering.
     */
    query?: string;
    /**
     * Custom function to render a selected option.
     * @param itemLabel - The label of the item.
     * @param item - The selected item.
     * @returns The rendered React node.
     */
    renderMenuItem?: (itemLabel: React.ReactNode, item: any) => React.ReactNode;
    /**
     * Custom function to render a menu group.
     * @param title - The title of the group.
     * @param item - The group item.
     * @returns The rendered React node.
     */
    renderMenuGroup?: (title: React.ReactNode, item: any) => React.ReactNode;
    /**
     * Event handler for selecting an option.
     * @param value - The selected value.
     * @param item - The selected item.
     * @param event - The mouse event.
     * @param checked - The checked state (only applicable for multiple selection).
     */
    onSelect?: Multiple extends true ? (value: any, item: any, event: React.MouseEvent, checked: boolean) => void : Multiple extends false ? (value: any, item: any, event: React.MouseEvent) => void : any;
    /**
     * Event handler for clicking on a group title.
     * @param event - The mouse event.
     */
    onGroupTitleClick?: (event: React.MouseEvent) => void;
}
export type ListboxComponent = React.ForwardRefExoticComponent<ListboxProps> & {
    <Multiple = false>(props: ListboxProps<Multiple>): React.ReactElement | null;
};
declare const Listbox: ListboxComponent;
export default Listbox;
