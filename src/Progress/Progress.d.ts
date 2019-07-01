import ProgressLine from './ProgressLine';
import ProgressCircle from './ProgressCircle';

interface Progress {
  Line: typeof ProgressLine;
  Circle: typeof ProgressCircle;
}

declare const Progress: Progress;

export default Progress;
