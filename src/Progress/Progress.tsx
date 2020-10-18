import ProgressCircle from './ProgressCircle';
import ProgressLine, { ProgressLineProps } from './ProgressLine';
import { RsRefForwardingComponent } from '../@types/common';

export interface Progress extends RsRefForwardingComponent<'div', ProgressLineProps> {
  Line?: typeof ProgressLine;
  Circle?: typeof ProgressCircle;
}

const Progress: Progress = ProgressLine;

Progress.Line = ProgressLine;
Progress.Circle = ProgressCircle;

export default Progress;
