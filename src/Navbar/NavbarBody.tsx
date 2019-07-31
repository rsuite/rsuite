import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

export interface NavbarBodyProps {
  classPrefix?: string;
  className?: string;
  children?: React.ReactNode;
}

class NavbarBody extends React.Component<NavbarBodyProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
  };
  render() {
    const { children, classPrefix, className, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    );
  }
}

export default defaultProps<NavbarBodyProps>({
  classPrefix: 'navbar-body'
})(NavbarBody);
