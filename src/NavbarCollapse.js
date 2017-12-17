// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';

import prefix from './utils/prefix';


type Props = {
  classPrefix?: string,
  className?: string,
  children?: React.Node
}

class NavbarCollapse extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'navbar'
  };

  static contextTypes = {
    expanded: PropTypes.bool
  };

  render() {
    const {
      children,
      classPrefix,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames('collapse', addPrefix('collapse'));
    const expanded = this.context.expanded;

    return (
      <Collapse
        {...props}
        in={expanded}
      >
        <div className={classes}>
          {children}
        </div>
      </Collapse>
    );
  }
}

export default NavbarCollapse;
