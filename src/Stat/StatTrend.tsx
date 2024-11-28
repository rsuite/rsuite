import React from 'react';
import PropTypes from 'prop-types';
import UpIcon from '@rsuite/icons/SortUp';
import DownIcon from '@rsuite/icons/SortDown';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

interface StatTrendProps extends WithAsProps {
  indicator?: 'up' | 'down';
  appearance?: 'default' | 'subtle';
}

const StatTrend: RsRefForwardingComponent<'dd', StatTrendProps> = React.forwardRef(
  (props: StatTrendProps, ref) => {
    const {
      as: Component = 'span',
      appearance = 'default',
      classPrefix = 'stat-trend',
      indicator = 'up',
      className,
      children,
      ...rest
    } = props;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(appearance, indicator));
    const IndicatorIcon = indicator === 'up' ? UpIcon : DownIcon;

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
        {<IndicatorIcon className={prefix('indicator')} />}
      </Component>
    );
  }
);

StatTrend.displayName = 'StatTrend';
StatTrend.propTypes = {
  indicator: PropTypes.oneOf(['up', 'down']),
  appearance: PropTypes.oneOf(['default', 'subtle'])
};

export default StatTrend;
