import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import CloseButton from '../CloseButton';

export interface TagProps extends WithAsProps {
  /** A tag can have different colors */
  color?: TypeAttributes.Color;

  /** Whether to close */
  closable?: boolean;

  /** The content of the component */
  children?: React.ReactNode;

  /** Click the callback function for the Close button */
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Tag: RsRefForwardingComponent<'div', TagProps> = React.forwardRef((props: TagProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'tag',
    color = 'default',
    children,
    closable,
    className,
    onClose,
    ...rest
  } = props;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(color, { closable }));

  return (
    <Component {...rest} ref={ref} className={classes}>
      <span className={prefix`text`}>{children}</span>
      {closable && <CloseButton className={prefix`icon-close`} onClick={onClose} />}
    </Component>
  );
});

Tag.displayName = 'Tag';
Tag.propTypes = {
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType
};

export default Tag;
