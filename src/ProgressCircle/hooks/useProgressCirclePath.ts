import { useMemo } from 'react';

interface ProgressCirclePathOptions {
  /** Circular progress bar degree */
  gapDegree: number;
  /** Circular progress bar Notch position */
  gapPosition: 'top' | 'bottom' | 'left' | 'right';
  /** Total percent of progress */
  totalPercent: number;
  /** Line color */
  strokeColor?: string;
  /** Line width */
  strokeWidth: number;
  /** Tail color */
  trailColor?: string;
}

interface ProgressCirclePathResult {
  /** SVG path string for the circle */
  pathString: string;
  /** Style object for the trail path */
  trailPathStyle: React.CSSProperties;
  /** Style object for the stroke path */
  strokePathStyle: React.CSSProperties;
}

/**
 * Custom hook to calculate path string and styles for ProgressCircle
 */
const useProgressCirclePath = (options: ProgressCirclePathOptions): ProgressCirclePathResult => {
  const { gapDegree, gapPosition, totalPercent, strokeColor, strokeWidth, trailColor } = options;

  return useMemo(() => {
    const radius = 50 - strokeWidth / 2;

    let x1 = 0;
    let y1 = -radius;
    let x2 = 0;
    let y2 = -2 * radius;

    switch (gapPosition) {
      case 'left':
        x1 = -radius;
        y1 = 0;
        x2 = 2 * radius;
        y2 = 0;
        break;
      case 'right':
        x1 = radius;
        y1 = 0;
        x2 = -2 * radius;
        y2 = 0;
        break;
      case 'bottom':
        y1 = radius;
        y2 = 2 * radius;
        break;
      default:
      // 'top' is the default, values are already set
    }

    const pathString = `M 50,50 m ${x1},${y1} a ${radius},${radius} 0 1 1 ${x2},${-y2} a ${radius},${radius} 0 1 1 ${-x2},${y2}`;

    const len = Math.PI * 2 * radius;
    // Convert gapDegree from degrees to a proportion of the circumference
    const gapLength = (gapDegree / 360) * len;

    const trailPathStyle = {
      stroke: trailColor,
      strokeDasharray: `${len - gapLength}px ${len}px`,
      strokeDashoffset: `-${gapLength / 2}px`
    };

    const strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(totalPercent / 100) * (len - gapLength)}px ${len}px`,
      strokeDashoffset: `-${gapLength / 2}px`
    };

    return {
      pathString,
      trailPathStyle,
      strokePathStyle
    };
  }, [gapDegree, gapPosition, totalPercent, strokeColor, strokeWidth, trailColor]);
};

export default useProgressCirclePath;
