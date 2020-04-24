import * as React from 'react';
import { AnimationEventProps, StandardProps, TypeAttributes } from '../@types/common';

export type OverlayTriggerTrigger = 'click' | 'hover' | 'focus' | 'active';

export interface TriggerProps extends AnimationEventProps, StandardProps {
  /** Triggering events */
  trigger?: OverlayTriggerTrigger | OverlayTriggerTrigger[];

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
  speaker?:
    | React.ReactElement<any>
    | ((props: any, ref: React.RefObject<any>) => React.ReactElement);

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

  /** Mouse over callback function */
  onMouseOver?: () => void;
}

export interface OverlayTriggerProps extends TriggerProps {
  containerPadding?: number;
  show?: boolean;
  rootClose?: boolean;
  onHide?: () => void;
  transition?: React.ElementType;
  animation?: React.ElementType | boolean;
  delay?: number;
  delayShow?: number;
  delayHide?: number;
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
}

declare const OverlayTrigger: React.ComponentType<OverlayTriggerProps>;
export default OverlayTrigger;
