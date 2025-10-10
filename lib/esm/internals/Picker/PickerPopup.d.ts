import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../types';
import type { OverlayTriggerHandle } from './PickerToggleTrigger';
export interface PickerPopupProps extends WithAsProps {
    placement?: string;
    autoWidth?: boolean;
    children?: React.ReactNode;
    target?: React.RefObject<OverlayTriggerHandle>;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}
declare const PickerPopup: RsRefForwardingComponent<'div', PickerPopupProps>;
export default PickerPopup;
