import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '@/internals/types';
import { oneOf } from '@/internals/propTypes';
import { useCustom } from '../CustomProvider';

export interface BadgeProps extends WithAsProps {
  /** Main content */
  content?: React.ReactNode;

  /** Max count */
  maxCount?: number;

  /** A badge can have different colors */
  color?: TypeAttributes.Color;
}

/**
 * The Badge component is usually used to mark or highlight the status or quantity of an object.
 * @see https://rsuitejs.com/components/badge
 */
const Badge: RsRefForwardingComponent<'div', BadgeProps> = React.forwardRef(
  (props: BadgeProps, ref) => {
    const { propsWithDefaults } = useCustom('Badge', props);
    const {
      as: Component = 'div',
      content: contentText,
      color,
      className,
      classPrefix = 'badge',
      children,
      maxCount = 99,
      ...rest
    } = propsWithDefaults;

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
Badge.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  maxCount: PropTypes.number,
  color: oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'])
};

export default Badge;
