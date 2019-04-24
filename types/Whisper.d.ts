import * as React from 'react';
import { AnimationEventProps, PropTypes } from '.';
import { TooltipProps } from './Tooltip';
import { PopoverProps } from './Popover';

export interface WhisperProps extends AnimationEventProps {
  /** Triggering events */
  trigger?: 'click' | 'hover' | 'focus' | 'active';

  /** Ref of trigger */
  triggerRef?: React.Ref<any>;

  /** Display placement */
  placement?: PropTypes.Placement | PropTypes.Placement4;

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
