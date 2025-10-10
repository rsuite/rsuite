import React from 'react';
import StepItem from './StepItem';
import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface StepsProps extends WithAsProps {
    /** Vertical display */
    vertical?: boolean;
    /** Small size Step Bar */
    small?: boolean;
    /** Primary content */
    children?: React.ReactNode;
    /** Current execution step */
    current?: number;
    /** Current execution step status */
    currentStatus?: 'finish' | 'wait' | 'process' | 'error';
}
interface StepsComponent extends RsRefForwardingComponent<'div', StepsProps> {
    Item: typeof StepItem;
}
/**
 * The `Steps` component is used to guide users to complete tasks in accordance with the process.
 *
 * @see https://rsuitejs.com/components/steps
 */
declare const Steps: StepsComponent;
export default Steps;
