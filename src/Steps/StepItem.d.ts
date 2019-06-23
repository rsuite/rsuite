import * as React from 'react';
import { StandardProps } from '.';
import { IconProps } from './Icon';

export interface StepItemProps extends StandardProps {
  itemWidth?: number | string;

  /** Step status */
  status?: 'finish' | 'wait' | 'process' | 'error';

  /** Set icon */
  icon?: React.ReactElement<IconProps>;

  /** Number of Step */
  stepNumber?: number;

  /** The description of Steps item */
  description?: React.ReactNode;

  /** The title of Steps item */
  title?: React.ReactNode;
}

declare const StepItem: React.ComponentType<StepItemProps>;

export default StepItem;
