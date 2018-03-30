/* @flow */

import * as React from 'react';
import classNames from 'classnames';

import Button from './Button';
import Icon from './Icon';
import { prefix, defaultProps } from './utils';

type Props = {
  className?: string,
  children?: React.Node,
  icon?: React.Element<typeof Icon>,
  renderTitle?: (children?: React.Node) => React.Node,
  classPrefix?: string
};

class DorpdownToggle extends React.Component<Props> {
  render() {
    const { className, classPrefix, renderTitle, children, icon, ...props } = this.props;
    const addPrefix = prefix(classPrefix);

    if (renderTitle) {
      return (
        <span {...props} className={classNames(classPrefix, addPrefix('custom-title'), className)}>
          {renderTitle(children)}
        </span>
      );
    }

    return (
      <Button
        {...props}
        componentClass="a"
        appearance="subtle"
        className={classNames(classPrefix, className)}
      >
        {icon}
        <span>
          {children}
          <span className={addPrefix('caret')} />
        </span>
      </Button>
    );
  }
}

export default defaultProps({
  classPrefix: 'dropdown-toggle'
})(DorpdownToggle);
