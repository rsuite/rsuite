import ProgressCircle from './ProgressCircle';
import ProgressLine, { ProgressLineProps } from './ProgressLine';
import { RsRefForwardingComponent } from '../internals/types';
export interface Progress extends RsRefForwardingComponent<'div', ProgressLineProps> {
    Line: typeof ProgressLine;
    Circle: typeof ProgressCircle;
}
/**
 * The `Progress` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress
 */
declare const Progress: Progress;
export default Progress;
