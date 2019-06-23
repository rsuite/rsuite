import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
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

    return <div {...props} className={classes} />;
  }
}

const EnhancedFooter = defaultProps({
  classPrefix: 'footer'
})(Footer);

export default setDisplayName('Footer')(EnhancedFooter);
