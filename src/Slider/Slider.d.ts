import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface SliderProps<ValueType = number> extends StandardProps {
  /** Minimum value of sliding range */
  min?: number;

  /** Maximum sliding range */
  max?: number;

  /** Slide the value of one step */
  step?: number;

  /** Value (Controlled) */
  value?: ValueType;

  /** Default value */
  defaultValue?: ValueType;

  /** A css class to apply to the Handle node. */
  handleClassName?: string;

  /** Customizing what is displayed inside a handle */
  handleTitle?: React.ReactNode;

  /** 	A css class to apply to the Bar DOM node */
  barClassName?: string;

  /** custom style */
  handleStyle?: React.CSSProperties;

  /** The disabled of component */
  disabled?: boolean;

  /** Show Ticks */
  graduated?: boolean;

  /** Whether to show Tooltip when sliding */
  tooltip?: boolean;

  /** Show sliding progress bar */
  progress?: boolean;

  /** Vertical Slide */
  vertical?: boolean;

  /** Callback function that changes data */
  onChange?: (value: ValueType, event: React.MouseEvent) => void;

  /** Customize labels on the render ruler */
  renderMark?: (mark: number) => React.ReactNode;
}

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
