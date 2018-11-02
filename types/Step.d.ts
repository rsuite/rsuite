import * as React from 'react';
import { StandardProps } from '.';

export interface StepProps extends StandardProps {
  /** Vertical display */
  vertical?: boolean;

  /** Small size Step Bar */
  small?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Current execution step */
  current?: number;

  /** CUrrent execution step status */
  currentStatus?: 'finish' | 'wait' | 'process' | 'error';
}

declare const Step: React.ComponentType<StepProps>;

export default Step;
