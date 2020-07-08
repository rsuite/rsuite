import * as React from 'react';
import { TriggerProps } from '../Overlay/OverlayTrigger.d';
import { TooltipProps } from '../Tooltip/Tooltip.d';
import { PopoverProps } from '../Popover/Popover.d';

export interface WhisperProps extends TriggerProps {
  /** display element */
  speaker?:
    | React.ReactElement<TooltipProps | PopoverProps>
    | ((props: any, ref: React.RefObject<any>) => React.ReactElement);

  /** @deprecated Use `ref` instead */
  triggerRef?: React.Ref<any>;
}

export interface WhisperInstance extends React.Component<WhisperProps> {
  open: (delay?: number) => void;
  close: (delay?: number) => void;

  /** @deprecated Use `open` instead */
  show: (delay?: number) => void;
  /** @deprecated Use `close` instead */
  hide: (delay?: number) => void;
}

declare const Whisper: React.ComponentType<WhisperProps>;
export default Whisper;
