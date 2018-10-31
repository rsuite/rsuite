import * as React from 'react';
import ProgressLine from './ProgressLine';
import ProgressCircle from './ProgressCircle';

interface Progress {
  ProgressLine: typeof ProgressLine;
  ProgressCircle: typeof ProgressCircle;
}

export default Progress;
