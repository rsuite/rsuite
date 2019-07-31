import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import { defaultProps, prefix } from '../utils';
import { ContainerProps } from './Container.d';

class Container extends React.Component<ContainerProps> {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    classPrefix: PropTypes.string
  };
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

export default defaultProps<ContainerProps>({
  classPrefix: 'container'
})(Container);
