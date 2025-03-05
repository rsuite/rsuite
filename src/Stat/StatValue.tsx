import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { FormattedNumber } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface StatValueProps extends WithAsProps {
  value?: number;
  formatOptions?: Intl.NumberFormatOptions;
}

const StatValue = forwardRef<'dd', StatValueProps>((props, ref) => {
  const {
    as: Component = 'dd',
    classPrefix = 'stat-value',
    className,
    children,
    value,
    formatOptions,
    ...rest
  } = props;
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  return (
    <Component ref={ref} className={classes} {...rest}>
      {value && <FormattedNumber value={value} formatOptions={formatOptions} />}
      {children}
    </Component>
  );
});

StatValue.displayName = 'StatValue';

export default StatValue;
