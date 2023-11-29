import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import CloseButton from '../CloseButton';
import CheckButton from '../CheckButton';

export interface TagProps extends WithAsProps {
  /** Different sizes */
  size?: 'lg' | 'md' | 'sm';

  /** A tag can have different colors */
  color?: TypeAttributes.Color;

  /** Whether to close */
  closable?: boolean;

  /** Whether it is checkable */
  checkable?: boolean;

  /** The content of the component */
  children?: React.ReactNode;

  /** Click the callback function for the Close button */
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Click the callback function for the Check button */
  onCheck?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Tag: RsRefForwardingComponent<'div', TagProps> = React.forwardRef((props: TagProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'tag',
    size = 'md',
    color = 'default',
    children,
    closable,
    checkable,
    className,
    onClose,
    onCheck,
    ...rest
  } = props;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, color, { closable }));

  return (
    <Component {...rest} ref={ref} className={classes}>
      <span className={prefix`text`}>{children}</span>
      {closable && <CloseButton className={prefix`icon-close`} onClick={onClose} />}
      {checkable && <CheckButton className={prefix`icon-check`} onClick={onCheck} />}
    </Component>
  );
});

Tag.displayName = 'Tag';
Tag.propTypes = {
  closable: PropTypes.bool,
  checkable: PropTypes.bool,
  classPrefix: PropTypes.string,
  onClose: PropTypes.func,
  onCheck: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType
};

export default Tag;
