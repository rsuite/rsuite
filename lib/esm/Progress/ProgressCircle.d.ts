import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface ProgressCircleProps extends WithAsProps {
    /** Line color */
    strokeColor?: string;
    /** The end of different types of open paths */
    strokeLinecap?: 'butt' | 'round' | 'square';
    /** Tail color */
    trailColor?: string;
    /** Percent of progress */
    percent?: number;
    /** Line width */
    strokeWidth?: number;
    /** Tail width */
    trailWidth?: number;
    /** Diameter of the circle */
    width?: number;
    /** Circular progress bar degree */
    gapDegree?: number;
    /** Circular progress bar Notch position */
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
    /** Show text */
    showInfo?: boolean;
    /** Progress status */
    status?: 'success' | 'fail' | 'active';
}
/**
 * The `Progress.Circle` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress/#circle
 */
declare const ProgressCircle: RsRefForwardingComponent<'div', ProgressCircleProps>;
export default ProgressCircle;
