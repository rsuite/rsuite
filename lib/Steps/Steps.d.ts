import * as React from 'react';
import { StandardProps } from '../@types/common';
import StepItem from './StepItem';

export interface StepsProps extends StandardProps {
  /** Vertical display */
  vertical?: boolean;

  /** Small size Step Bar */
  small?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Current execution step */
  current?: number;

  /** Current execution step status */
  currentStatus?: 'finish' | 'wait' | 'process' | 'error';
}

interface StepsComponent extends React.ComponentClass<StepsProps> {
  Item: typeof StepItem;
}

declare const Steps: StepsComponent;

export default Steps;
