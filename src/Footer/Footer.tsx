import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { FooterProps } from './Footer.d';

class Footer extends React.Component<FooterProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string
  };
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return <footer {...props} className={classes} />;
  }
}

export default defaultProps({
  classPrefix: 'footer'
})(Footer);
