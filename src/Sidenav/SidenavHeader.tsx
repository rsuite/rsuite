import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { SidenavHeaderProps } from './SidenavHeader.d';

class SidenavHeader extends React.Component<SidenavHeaderProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return <div {...props} className={classes} />;
  }
}

export default defaultProps<SidenavHeaderProps>({
  classPrefix: 'sidenav-header'
})(SidenavHeader);
