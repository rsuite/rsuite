import * as React from 'react';
import ProgressLine from './ProgressLine';
import ProgressCircle from './ProgressCircle';

interface Progress {
  Line: typeof ProgressLine;
  Circle: typeof ProgressCircle;
}

declare var Progress: Progress;

export default Progress;
