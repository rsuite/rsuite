import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

export interface HeadingProps extends WithAsProps {
  /**
   * Sets heading level, h1 through h6.
   * @default 3
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 *
 * The `Heading` component is used to display a heading.
 *
 * @see https://rsuitejs.com/components/heading
 */
const Heading: RsRefForwardingComponent<'h3', HeadingProps> = React.forwardRef(
  (props: HeadingProps, ref) => {
    const { as, classPrefix = 'heading', className, level = 3, ...rest } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const Component = as || `h${level}`;

    return <Component {...rest} ref={ref} className={classes} />;
  }
);

Heading.displayName = 'Heading';
Heading.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

export default Heading;
