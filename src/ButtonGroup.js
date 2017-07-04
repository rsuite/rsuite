import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorate, { getClassNames } from './utils/decorate';

const propTypes = {
  prefixClass: PropTypes.string,
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  className: null,
  block: false,
  justified: false,
  vertical: false,
  prefixClass: 'btn-group'
};

class ButtonGroup extends React.Component {

  render() {
    const { className, vertical, block, justified, prefixClass, ...props } = this.props;
    const classes = classNames({
      ...getClassNames(this.props),
      'btn-block': block,
      [`${prefixClass}-vertical`]: vertical,
      [`${prefixClass}-justified`]: justified
    }, className);

    return (
      <div
        {...props}
        className={classes}
      />
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default decorate({
  size: true
})(ButtonGroup);
