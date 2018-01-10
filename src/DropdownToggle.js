/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import Button from './Button';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  children?: React.Node,
  renderTitle?: (children?: React.Node) => React.Node,
  classPrefix?: string
}

class DorpdownToggle extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-toggle`
  }
  render() {
    const { className, classPrefix, renderTitle, children, ...props } = this.props;
    const addPrefix = prefix(classPrefix);

    if (renderTitle) {
      return (
        <span
          {...props}
          className={classNames(classPrefix, className)}
        >
          {renderTitle(children)}
        </span>
      );
    }

    return (
      <Button
        {...props}
        componentClass="a"
        className={classNames(classPrefix, className)}
        role="button"
      >
        <span>{children}<span className={addPrefix('caret')} /></span>
      </Button>
    );
  }
}

export default DorpdownToggle;
