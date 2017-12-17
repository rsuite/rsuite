/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';

type Props = {
  className?: string,
  children?: React.Node,
  renderTitle?: (children?: React.Node) => React.Node,
}


class DorpdownToggle extends React.Component<Props> {
  render() {
    const { className, renderTitle, children, ...props } = this.props;
    let title: React.Node = <span>{children}<span className="caret" /></span>;

    if (renderTitle) {
      title = renderTitle(children);
    }

    return (
      <SafeAnchor
        {...props}
        className={classNames('dropdown-toggle', className)}
        role="button"
      >
        {title}
      </SafeAnchor>
    );
  }
}

export default DorpdownToggle;
