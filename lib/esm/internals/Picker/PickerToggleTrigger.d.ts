import React from 'react';
import { OverlayTriggerHandle, OverlayTriggerProps, OverlayTriggerType } from '../Overlay/OverlayTrigger';
import { PositionChildProps } from '../Overlay/Position';
import type { TypeAttributes, AnimationEventProps } from '../types';
export type { OverlayTriggerHandle, PositionChildProps };
export interface PickerToggleTriggerProps extends Omit<AnimationEventProps, 'onEntering' | 'onExiting'>, Pick<OverlayTriggerProps, 'speaker' | 'onOpen' | 'onClose'> {
    id?: string;
    /**
     * Identifies the combobox has having a popout, and indicates the type.
     *
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
     */
    popupType?: 'listbox' | 'tree' | 'grid' | 'dialog' | 'menu';
    multiple?: boolean;
    placement?: TypeAttributes.Placement;
    pickerProps: any;
    open?: boolean;
    trigger?: OverlayTriggerType | OverlayTriggerType[];
    children: React.ReactElement | ((props: any, ref: any) => React.ReactElement);
}
export declare const omitTriggerPropKeys: string[];
export declare const pickTriggerPropKeys: string[];
export interface ComboboxContextProps {
    id?: string;
    multiple?: boolean;
    hasLabel?: boolean;
    popupType?: 'listbox' | 'tree' | 'grid' | 'dialog' | 'menu';
}
export declare const ComboboxContextContext: React.Context<ComboboxContextProps>;
declare const PickerToggleTrigger: React.ForwardRefExoticComponent<PickerToggleTriggerProps & React.RefAttributes<any>>;
export default PickerToggleTrigger;
