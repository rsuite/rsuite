import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps } from '../utils';
import { ButtonToolbarProps } from './ButtonToolbar.d';

class ButtonToolbar extends React.Component<ButtonToolbarProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string
  };
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return <div role="toolbar" className={classes} {...props} />;
  }
}

export default defaultProps({
  classPrefix: 'btn-toolbar'
})(ButtonToolbar);
