// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  children?: React.ChildrenArray<React.Element<any>>,
  classPrefix?: string
};

class Container extends React.Component<Props> {
  render() {
    const { className, children = [], classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    let hasSidebar = false;

    React.Children.forEach(children, item => {
      if (_.get(item, 'type.displayName') === 'Sidebar') {
        hasSidebar = true;
      }
    });

    const classes = classNames(classPrefix, className, {
      [addPrefix('has-sidebar')]: hasSidebar
    });

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'container'
})(Container);
