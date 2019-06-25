import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';
import { InputGroupAddonProps } from './InputGroupAddon.d';

class InputGroupAddon extends React.Component<InputGroupAddonProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    disabled: PropTypes.bool
  };
  render() {
    const { className, classPrefix, disabled, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('disabled')]: disabled
    });

    return <span {...props} className={classes} />;
  }
}

export default defaultProps<InputGroupAddonProps>({
  classPrefix: 'input-group-addon'
})(InputGroupAddon);
