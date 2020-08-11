import * as React from 'react';
import PropTypes from 'prop-types';
import { defaultProps, useClassNames } from '../utils';
import { StandardProps, TypeAttributes } from '../@types/common';

export interface BadgeProps extends StandardProps, React.HTMLAttributes<HTMLDivElement> {
  /** Main content */
  content?: string | number | React.ReactNode | boolean;

  /** Max count */
  maxCount?: number;

  /** A badge can have different colors */
  color?: TypeAttributes.Color;
}

const Badge = (props: BadgeProps) => {
  const {
    className,
    classPrefix,
    children,
    content: contentText,
    maxCount,
    color,
    ...rest
  } = props;
  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const dot = contentText === undefined || contentText === null;
  const classes: string = merge(
    className,
    withClassPrefix(color, dot, {
      independent: !children,
      wrapper: children
    })
  );

  if (contentText === false) {
    return children;
  }

  const content =
    // $FlowFixMe I'm sure contenxtText is number type and maxCount is number type.
    typeof contentText === 'number' && contentText > maxCount ? `${maxCount}+` : contentText;
  if (!children) {
    return (
      <div {...rest} className={classes}>
        {content}
      </div>
    );
  }
  return (
    <div {...rest} className={classes}>
      {children}
      <div className={prefix('content')}>{content}</div>
    </div>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  maxCount: PropTypes.number,
  color: PropTypes.oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'])
};
Badge.defaultProps = {
  maxCount: 99
};

export default defaultProps<BadgeProps>({
  classPrefix: 'badge'
})(Badge);
