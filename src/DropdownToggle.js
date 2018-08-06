/* @flow */

import * as React from 'react';
import classNames from 'classnames';

import Ripple from './Ripple';
import Button from './Button';
import Icon from './Icon';
import { prefix, defaultProps } from './utils';

type Props = {
  className?: string,
  children?: React.Node,
  icon?: React.Element<typeof Icon>,
  renderTitle?: (children?: React.Node) => React.Node,
  classPrefix?: string,
  noCaret?: boolean,
  componentClass: React.ElementType
};

class DorpdownToggle extends React.Component<Props> {
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
        <Ripple />
      </Component>
    );
  }
}

export default defaultProps({
  componentClass: Button,
  classPrefix: 'dropdown-toggle'
})(DorpdownToggle);
