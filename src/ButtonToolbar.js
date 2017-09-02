import React from 'react';
import classNames from 'classnames';

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

export default ButtonToolbar;
