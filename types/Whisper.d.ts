import * as React from 'react';
import { AnimationEventProps, PropTypes } from '.';

export interface WhisperProps extends AnimationEventProps {
  /** Ref of trigger */
  trigger?: React.Ref<any>;

  /** Display placement */
  placement: PropTypes.Placement | PropTypes.Placement4;

  /** Delay Time */
  delay: number;

  /** Show delay Time */
  delayShow: number;

  /** Hidden delay Time */
  delayHide: number;

  /** Sets the rendering container */
  container: HTMLElement | (() => HTMLElement);

  /** Lose Focus callback function */
  onBlur: () => void;

  /** Click on the callback function */
  onClick: () => void;

  /** Callback function to get focus */
  onFocus: () => void;

  /** Mouse leave callback function */
  onMouseOut: () => void;
}

declare const Whisper: React.ComponentType<WhisperProps>;
export default Whisper;
