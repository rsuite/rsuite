import React from 'react';
import PropTypes from 'prop-types';
import { IconProps } from '@rsuite/icons/Icon';
import { RsRefForwardingComponent } from '@/internals/types';
import { oneOf } from '@/internals/propTypes';
import { useClassNames } from '@/internals/hooks';
import Button, { ButtonProps } from '../Button';

export interface IconButtonProps extends ButtonProps {
  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Set circle button */
  circle?: boolean;

  /** The placement of icon */
  placement?: 'left' | 'right';
}

/**
 * The `IconButton` component is used to specify a button with icon.
 * @see https://rsuitejs.com/components/button
 */
const IconButton: RsRefForwardingComponent<
  typeof Button,
  IconButtonProps & {
    ref?: React.Ref<HTMLElement>;
  }
> = React.forwardRef((props: IconButtonProps, ref) => {
  const {
    icon,
    placement = 'left',
    children,
    circle,
    classPrefix = 'btn-icon',
    className,
    ...rest
  } = props;

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
IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  circle: PropTypes.bool,
  children: PropTypes.node,
  placement: oneOf(['left', 'right'])
};

export default IconButton;
