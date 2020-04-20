import * as React from 'react';
import { TriggerProps } from '../Overlay/OverlayTrigger.d';
import { TooltipProps } from '../Tooltip/Tooltip.d';
import { PopoverProps } from '../Popover/Popover.d';

export interface WhisperProps extends TriggerProps {
  /** display element */
  speaker?:
    | React.ReactElement<TooltipProps | PopoverProps>
    | ((props: any, ref: React.RefObject<any>) => React.ReactElement);
}

declare const Whisper: React.ComponentType<WhisperProps>;
export default Whisper;
