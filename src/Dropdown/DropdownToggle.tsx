import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Ripple from '../Ripple';
import Button from '../Button';
import { prefix, defaultProps } from '../utils';
import { IconProps } from '../Icon/Icon.d';

export interface DorpdownToggleProps {
  className?: string;
  classPrefix?: string;
  children?: React.ReactNode;
  icon?: React.ReactElement<IconProps>;
  noCaret?: boolean;
  componentClass: React.ElementType;
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;
}

class DorpdownToggle extends React.Component<DorpdownToggleProps> {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    icon: PropTypes.node,
    classPrefix: PropTypes.string,
    noCaret: PropTypes.bool,
    componentClass: PropTypes.elementType,
    renderTitle: PropTypes.func
  };
  render() {
    const {
      className,
      classPrefix,
      renderTitle,
      children,
      icon,
      noCaret,
      componentClass: Component,
      ...props
    } = this.props;
    const addPrefix = prefix(classPrefix);

    if (renderTitle) {
      return (
        <span {...props} className={classNames(classPrefix, addPrefix('custom-title'), className)}>
          {renderTitle(children)}
          <Ripple />
        </span>
      );
    }

    let buttonProps = {};
    if (Component === Button) {
      buttonProps = {
        componentClass: 'a',
        appearance: 'subtle'
      };
    }

    return (
      <Component {...buttonProps} {...props} className={classNames(classPrefix, className)}>
        {icon}
        {children}
        {noCaret ? null : <span className={addPrefix('caret')} />}
      </Component>
    );
  }
}

export default defaultProps<DorpdownToggleProps>({
  componentClass: Button,
  classPrefix: 'dropdown-toggle'
})(DorpdownToggle);
