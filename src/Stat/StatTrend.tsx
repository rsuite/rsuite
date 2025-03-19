import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';

const svgProps: React.SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const ArrowUp = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...svgProps} {...props}>
      <path d="M17 7l-10 10"></path>
      <path d="M8 7l9 0l0 9"></path>
    </svg>
  );
};

const ArrowDown = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...svgProps} {...props}>
      <path d="M7 7l10 10"></path>
      <path d="M17 8l0 9l-9 0"></path>
    </svg>
  );
};

export interface StatTrendProps extends BoxProps {
  indicator?: 'up' | 'down';
  appearance?: 'default' | 'subtle';
}

const StatTrend = forwardRef<'dd', StatTrendProps>((props, ref) => {
  const {
    as = 'span',
    appearance = 'default',
    classPrefix = 'stat-trend',
    indicator = 'up',
    className,
    children,
    ...rest
  } = props;

  const { merge, prefix, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(appearance, indicator));
  const IndicatorIcon = indicator === 'up' ? ArrowUp : ArrowDown;

  return (
    <Box as={as} ref={ref} className={classes} {...rest}>
      {children}
      {<IndicatorIcon className={prefix('indicator')} />}
    </Box>
  );
});

StatTrend.displayName = 'StatTrend';

export default StatTrend;
