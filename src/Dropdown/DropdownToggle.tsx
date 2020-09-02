import React from 'react';
import PropTypes from 'prop-types';
import Ripple from '../Ripple';
import Button from '../Button';
import { useClassNames } from '../utils';
import { IconProps } from '../Icon';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface DorpdownToggleProps extends WithAsProps {
  icon?: React.ReactElement<IconProps>;
  noCaret?: boolean;
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;
}

const defaultProps: Partial<DorpdownToggleProps> = {
  as: Button,
  classPrefix: 'dropdown-toggle'
};

const DorpdownToggle: RsRefForwardingComponent<'a', DorpdownToggleProps> = React.forwardRef(
  (props: DorpdownToggleProps, ref) => {
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
  }
);

DorpdownToggle.displayName = 'DorpdownToggle';
DorpdownToggle.defaultProps = defaultProps;
DorpdownToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  classPrefix: PropTypes.string,
  noCaret: PropTypes.bool,
  as: PropTypes.elementType,
  renderTitle: PropTypes.func
};

export default DorpdownToggle;
