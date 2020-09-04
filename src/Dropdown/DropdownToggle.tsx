import React from 'react';
import PropTypes from 'prop-types';
import Ripple from '../Ripple';
import Button from '../Button';
import { useClassNames } from '../utils';
import { IconProps } from '../Icon';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface DropdownToggleProps extends WithAsProps {
  icon?: React.ReactElement<IconProps>;
  noCaret?: boolean;
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;
}

const defaultProps: Partial<DropdownToggleProps> = {
  as: Button,
  classPrefix: 'dropdown-toggle'
};

const DropdownToggle: RsRefForwardingComponent<
  typeof Button,
  DropdownToggleProps
> = React.forwardRef((props: DropdownToggleProps, ref) => {
  const {
    as: Component,
    className,
    classPrefix,
    renderTitle,
    children,
    icon,
    noCaret,
    ...rest
  } = props;
  const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);

  const classes = merge(
    className,
    withClassPrefix({
      'custom-title': typeof renderTitle === 'function'
    })
  );
  if (renderTitle) {
    return (
      <Component {...rest} ref={ref} className={classes}>
        {renderTitle(children)}
        <Ripple />
      </Component>
    );
  }

  const buttonProps = Component === Button ? { as: 'a', appearance: 'subtle' } : null;

  return (
    <Component {...buttonProps} {...rest} ref={ref} className={classes}>
      {icon}
      {children}
      {noCaret ? null : <span className={prefix('caret')} />}
    </Component>
  );
});

DropdownToggle.displayName = 'DropdownToggle';
DropdownToggle.defaultProps = defaultProps;
DropdownToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  classPrefix: PropTypes.string,
  noCaret: PropTypes.bool,
  as: PropTypes.elementType,
  renderTitle: PropTypes.func
};

export default DropdownToggle;
