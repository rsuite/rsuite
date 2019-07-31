import * as React from 'react';
import { StandardProps } from '../@types/common';
import { IconProps } from '../Icon/Icon.d';

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
