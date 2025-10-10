import React from 'react';
import { IconProps } from '@rsuite/icons/Icon';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface StepItemProps extends WithAsProps {
    /** The width of each item. */
    itemWidth?: number | string;
    /** Step status */
    status?: 'finish' | 'wait' | 'process' | 'error';
    /** Set icon */
    icon?: React.ReactElement<IconProps>;
    /** Number of Step */
    stepNumber?: number;
    /** The description of Steps item */
    description?: React.ReactNode;
    /** The title of Steps item */
    title?: React.ReactNode;
}
/**
 * The `Step.Item` component is used to set the layout of the child element in the `Steps` component.
 *
 * @see https://rsuitejs.com/components/steps
 */
declare const StepItem: RsRefForwardingComponent<'div', StepItemProps>;
export default StepItem;
