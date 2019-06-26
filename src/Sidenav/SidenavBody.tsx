import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { SidenavBodyProps } from './SidenavBody.d';

class SidenavBody extends React.Component<SidenavBodyProps> {
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

export default defaultProps<SidenavBodyProps>({
  classPrefix: 'sidenav-body'
})(SidenavBody);
