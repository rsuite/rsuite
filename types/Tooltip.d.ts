import * as React from 'react';
import { PropTypes, StandardProps } from './';

export interface TooltipProps extends StandardProps {
  /** Dispaly placement */
  placement?: PropTypes.Placement;

  /** Value of positionLeft */
  positionLeft?: number;

  /** Value of positionTop */
  positionTop?: number;

  /** Wheather visible */
  visible?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

declare const Tooltip: React.ComponentType<TooltipProps>;

export default Tooltip;
