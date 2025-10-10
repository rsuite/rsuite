import React from 'react';
import StatLabel from './StatLabel';
import StatValue from './StatValue';
import StatValueUnit from './StatValueUnit';
import StatHelpText from './StatHelpText';
import StatTrend from './StatTrend';
import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface StatProps extends WithAsProps {
    /**
     * Add a border to the component.
     */
    bordered?: boolean;
    /**
     * The icon displayed on the left side of the component.
     */
    icon?: React.ReactNode;
}
interface StatComponent extends RsRefForwardingComponent<'div', StatProps> {
    Label: typeof StatLabel;
    Value: typeof StatValue;
    Trend: typeof StatTrend;
    ValueUnit: typeof StatValueUnit;
    HelpText: typeof StatHelpText;
}
declare const Stat: StatComponent;
export default Stat;
