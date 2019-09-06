import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface ProgressLineProps extends StandardProps {
  /** Line color */
  strokeColor?: string;

  /** Percent of progress */
  percent?: number;

  /** Line width */
  strokeWidth?: number;
  
  /** Tail color */
  trailColor?: string;

  /** Tail width */
  trailWidth?: number;

  /** Show text */
  showInfo?: boolean;

  /** Progress status */
  status?: 'success' | 'fail' | 'active';
}

declare const ProgressLine: React.ComponentType<ProgressLineProps>;

export default ProgressLine;
