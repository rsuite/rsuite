'use client';
import ProgressCircle from "./ProgressCircle.js";
import ProgressLine from "./ProgressLine.js";
/**
 * The `Progress` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress
 */
var Progress = ProgressLine;
Progress.Line = ProgressLine;
Progress.Circle = ProgressCircle;
export default Progress;