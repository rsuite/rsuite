import React from 'react';
import StatLabel from './StatLabel';
import StatValue from './StatValue';
import StatValueUnit from './StatValueUnit';
import StatHelpText from './StatHelpText';
import StatTrend from './StatTrend';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

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
    as: Component = 'div',
    classPrefix = 'stat',
    className,
    children,
    bordered,
    icon,
    ...rest
  } = propsWithDefaults;
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ bordered }));

  return (
    <Component className={classes} ref={ref} {...rest}>
      {icon && <div className={prefix('icon')}>{icon}</div>}
      <dl className={prefix('body')}>{children}</dl>
    </Component>
  );
}, Subcomponents);

Stat.displayName = 'Stat';

export default Stat;
