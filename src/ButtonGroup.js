import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorate, { getClassNames } from './utils/decorate';

const propTypes = {
  prefixClass: PropTypes.string,
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  block: PropTypes.bool
};

const defaultProps = {
  block: false,
  justified: false,
  vertical: false,
  prefixClass: 'btn-group',
  shape: 'default'
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
        role="group"
        {...props}
        className={classes}
      />
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;
ButtonGroup.displayName = 'ButtonGroup';

export default decorate({
  size: true
})(ButtonGroup);
