import React from 'react';
import StatLabel from './StatLabel';
import StatValue from './StatValue';
import StatValueUnit from './StatValueUnit';
import StatHelpText from './StatHelpText';
import StatTrend from './StatTrend';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';

export interface StatProps extends BoxProps {
  /**
   * Add a border to the component.
   */
  bordered?: boolean;

  /**
   * The icon displayed on the left side of the component.
   */
  icon?: React.ReactNode;
}

const Subcomponents = {
  Label: StatLabel,
  Value: StatValue,
  Trend: StatTrend,
  ValueUnit: StatValueUnit,
  HelpText: StatHelpText
};

const Stat = forwardRef<'div', StatProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('Stat', props);
  const {
    as,
    classPrefix = 'stat',
    className,
    children,
    bordered,
    icon,
    ...rest
  } = propsWithDefaults;
  const { merge, prefix, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ bordered }));

  return (
    <Box as={as} className={classes} ref={ref} {...rest}>
      {icon && <div className={prefix('icon')}>{icon}</div>}
      <dl className={prefix('body')}>{children}</dl>
    </Box>
  );
}, Subcomponents);

Stat.displayName = 'Stat';

export default Stat;
