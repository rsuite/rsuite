import React from 'react';
import PropTypes from 'prop-types';
import StatLabel from './StatLabel';
import StatValue from './StatValue';
import StatValueUnit from './StatValueUnit';
import StatHelpText from './StatHelpText';
import StatTrend from './StatTrend';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

export interface StatProps extends WithAsProps {
  /**
   * Add a border to the component.
   */
  bordered?: boolean;
}

interface StatComponent extends RsRefForwardingComponent<'dl', StatProps> {
  Label: typeof StatLabel;
  Value: typeof StatValue;
  Trend: typeof StatTrend;
  ValueUnit: typeof StatValueUnit;
  HelpText: typeof StatHelpText;
}

const Stat: StatComponent = React.forwardRef((props: StatProps, ref) => {
  const {
    as: Component = 'dl',
    classPrefix = 'stat',
    className,
    children,
    bordered,
    ...rest
  } = props;
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ bordered }));

  return (
    <Component className={classes} ref={ref} {...rest}>
      {children}
    </Component>
  );
}) as unknown as StatComponent;

Stat.displayName = 'Stat';
Stat.propTypes = {
  bordered: PropTypes.bool
};

Stat.Label = StatLabel;
Stat.Value = StatValue;
Stat.Trend = StatTrend;
Stat.ValueUnit = StatValueUnit;
Stat.HelpText = StatHelpText;

export default Stat;
