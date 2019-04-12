import * as React from 'react';
import { StandardProps } from '.';

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

declare const Steps: React.ComponentType<StepsProps>;

export default Steps;
