import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps, TypeAttributes } from '../@types/common';

export interface BadgeProps extends StandardProps, React.HTMLAttributes<HTMLDivElement> {
  /** Main content */
  content?: React.ReactNode;

  /** Max count */
  maxCount?: number;

  /** A badge can have different colors */
  color?: TypeAttributes.Color;
}

const defaultProps: Partial<BadgeProps> = {
  maxCount: 99,
  classPrefix: 'badge'
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const {
    className,
    classPrefix,
    children,
    as: Component = 'div',
    content: contentText,
    maxCount,
    color,
    ...rest
  } = props;
  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const dot = contentText === undefined || contentText === null;
  const classes = merge(
    className,
    withClassPrefix(
      {
        independent: !children,
        wrapper: children,
        dot
      },
      color
    )
  );

  if (contentText === false) {
    return React.cloneElement(children as React.ReactElement, { ref });
  }

  const content =
    typeof contentText === 'number' && contentText > maxCount ? `${maxCount}+` : contentText;
  if (!children) {
    return (
      <Component {...rest} ref={ref} className={classes}>
        {content}
      </Component>
    );
  }
  return (
    <Component {...rest} ref={ref} className={classes}>
      {children}
      <div className={prefix('content')}>{content}</div>
    </Component>
  );
});

Badge.displayName = 'Badge';
Badge.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  maxCount: PropTypes.number,
  color: PropTypes.oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'])
};
Badge.defaultProps = defaultProps;

export default Badge;
