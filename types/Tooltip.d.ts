import * as React from 'react';
import { PropTypes, StandardProps } from './';

type PlacementFourSides = 'top' | 'right' | 'bottom' | 'left';
type PlacementEightPoints =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom'
  | 'auto'
  | 'autoVertical'
  | 'autoVerticalLeft'
  | 'autoVerticalRight'
  | 'autoHorizontal'
  | 'autoHorizontalTop'
  | 'autoHorizontalBottom';

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
