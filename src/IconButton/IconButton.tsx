import React from 'react';
import PropTypes from 'prop-types';
import Button, { ButtonProps } from '../Button';
import { useClassNames } from '../utils';
import { IconProps } from '@rsuite/icons/lib/Icon';

export interface IconButtonProps extends ButtonProps {
  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Set circle button */
  circle?: boolean;

  /** The placement of icon */
  placement?: 'left' | 'right';
}

const defaultProps: Partial<IconButtonProps> = {
  classPrefix: 'btn-icon',
  placement: 'left'
};

const IconButton = React.forwardRef((props: IconButtonProps, ref) => {
  const { icon, placement, children, circle, classPrefix, className, ...rest } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(`placement-${placement}`, {
      circle,
      'with-text': typeof children !== 'undefined'
    })
  );

  return (
    <Button {...rest} ref={ref} className={classes}>
      {icon}
      {children}
    </Button>
  );
});

IconButton.displayName = 'IconButton';
IconButton.defaultProps = defaultProps;
IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  circle: PropTypes.bool,
  children: PropTypes.node,
  placement: PropTypes.oneOf(['left', 'right'])
};

export default IconButton;
