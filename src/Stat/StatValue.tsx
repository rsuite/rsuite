import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { FormattedNumber } from '../CustomProvider';

interface StatValueProps extends WithAsProps {
  value?: number;
  formatOptions?: Intl.NumberFormatOptions;
}

const StatValue: RsRefForwardingComponent<'dd', StatValueProps> = React.forwardRef(
  (props: StatValueProps, ref) => {
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
  }
);

StatValue.displayName = 'StatValue';
StatValue.propTypes = {
  value: PropTypes.number,
  formatOptions: PropTypes.object
};

export default StatValue;
