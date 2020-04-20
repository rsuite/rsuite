import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface ProgressLineProps extends StandardProps {
  /** Line color */
  strokeColor?: string;

  /** Percent of progress */
  percent?: number;

  /** Line width */
  strokeWidth?: number;

  /** Trail color */
  trailColor?: string;

  /** Trail width */
  trailWidth?: number;

  /** Show text */
  showInfo?: boolean;

  /** Progress status */
  status?: 'success' | 'fail' | 'active';

  /**  The progress bar is displayed vertically */
  vertical?: boolean;
}

declare const ProgressLine: React.ComponentType<ProgressLineProps>;

export default ProgressLine;
