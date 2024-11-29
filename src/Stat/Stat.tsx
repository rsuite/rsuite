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

const Stat: StatComponent = React.forwardRef((props: StatProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'stat',
    className,
    children,
    bordered,
    icon,
    ...rest
  } = props;
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ bordered }));

  return (
    <Component className={classes} ref={ref} {...rest}>
      {icon && <div className={prefix('icon')}>{icon}</div>}
      <dl className={prefix('body')}>{children}</dl>
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
