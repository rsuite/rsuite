import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
interface StatLabelProps extends WithAsProps {
    /**
     * The info tip of the label
     */
    info?: React.ReactNode;
    /**
     * Uppercase the label
     */
    uppercase?: boolean;
}
declare const StatLabel: RsRefForwardingComponent<'dt', StatLabelProps>;
export default StatLabel;
