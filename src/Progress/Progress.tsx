import ProgressCircle from './ProgressCircle';
import ProgressLine, { ProgressLineProps } from './ProgressLine';
import { InternalRefForwardingComponent } from '@/internals/types';

export interface Progress extends InternalRefForwardingComponent<'div', ProgressLineProps> {
  Line: typeof ProgressLine;
  Circle: typeof ProgressCircle;
}

/**
 * The `Progress` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress
 */
const Progress: Progress = ProgressLine as unknown as Progress;

Progress.Line = ProgressLine;
Progress.Circle = ProgressCircle;

export default Progress;
