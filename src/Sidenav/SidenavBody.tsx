import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { StandardProps } from '../@types/common';

class SidenavBody extends React.Component<StandardProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    const { classPrefix, className, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return <div {...props} className={classes} />;
  }
}

export default defaultProps<StandardProps>({
  classPrefix: 'sidenav-body'
})(SidenavBody);
