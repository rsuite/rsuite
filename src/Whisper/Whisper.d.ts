import * as React from 'react';
import { AnimationEventProps, StandardProps, TypeAttributes } from '../@types/common';
import { TooltipProps } from '../Tooltip/Tooltip.d';
import { PopoverProps } from '../Popover/Popover.d';

export type WhisperTrigger = 'click' | 'hover' | 'focus' | 'active';

export interface WhisperProps extends AnimationEventProps, StandardProps {
  /** Triggering events */
  trigger?: WhisperTrigger | WhisperTrigger[];

  /** Ref of trigger */
  triggerRef?: React.Ref<any>;

  /** Display placement */
  placement?: TypeAttributes.Placement | TypeAttributes.Placement4;

  /** Delay Time */
  delay?: number;

  /** Show delay Time */
  delayShow?: number;

  /** Hidden delay Time */
  delayHide?: number;

  /** Sets the rendering container */
  container?: HTMLElement | (() => HTMLElement);

  /** display element */
  speaker?: React.ReactElement<TooltipProps | PopoverProps>;

  /**
   * Prevent floating element overflow
   */
  preventOverflow?: boolean;

  /** Show speaker */
  open?: boolean;

  /** Lose Focus callback function */
  onBlur?: () => void;

  /** Click on the callback function */
  onClick?: () => void;

  /** Callback function to get focus */
  onFocus?: () => void;

  /** Mouse leave callback function */
  onMouseOut?: () => void;
}

declare const Whisper: React.ComponentType<WhisperProps>;
export default Whisper;
