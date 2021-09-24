import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';

export interface BadgeProps extends WithAsProps {
  /** Main content */
  content?: React.ReactNode;

  /** Max count */
  maxCount?: number;

  /** A badge can have different colors */
  color?: TypeAttributes.Color;
}

const defaultProps: Partial<BadgeProps> = {
  as: 'div',
  maxCount: 99,
  classPrefix: 'badge'
};

const Badge: RsRefForwardingComponent<'div', BadgeProps> = React.forwardRef(
  (props: BadgeProps, ref) => {
    const {
      as: Component,
      content: contentText,
      color,
      className,
      classPrefix,
      children,
      maxCount,
      ...rest
    } = props;

    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const dot = contentText === undefined || contentText === null;
    const classes = merge(
      className,
      withClassPrefix(color, {
        independent: !children,
        wrapper: children,
        dot
      })
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
  }
);

Badge.displayName = 'Badge';
Badge.defaultProps = defaultProps;
Badge.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  maxCount: PropTypes.number,
  color: PropTypes.oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'])
};

export default Badge;
