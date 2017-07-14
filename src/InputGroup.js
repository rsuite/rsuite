import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import decorate, { getClassNames } from './utils/decorate';

const propTypes = {
  prefixClass: PropTypes.string,
  inside: PropTypes.bool
};

const defaultProps = {
  prefixClass: 'input-group',
  inside: false
};

class InputGroup extends React.Component {
  render() {
    const {
      className,
      prefixClass,
      inside,
      ...props
    } = this.props;

    const classes = classNames({
      ...getClassNames(this.props),
      [`${prefixClass}-inside`]: inside,
    }, className);

    return (
      <div
        {...props}
        className={classes}
      />

    );
  }
}

InputGroup.propTypes = propTypes;
InputGroup.defaultProps = defaultProps;

InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;

export default decorate({
  size: true
})(InputGroup);
