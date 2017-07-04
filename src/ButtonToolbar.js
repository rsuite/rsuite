import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: null
};

class ButtonToolbar extends React.Component {
  render() {

    const { className, ...props } = this.props;
    const classes = classNames('btn-toolbar', className);
    return (
      <div
        role="toolbar"
        className={classes}
        {...props}
      />
    );
  }
}

ButtonToolbar.propTypes = propTypes;
ButtonToolbar.defaultProps = defaultProps;

export default ButtonToolbar;
