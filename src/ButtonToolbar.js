/* @flow */

import React from 'react';
import classNames from 'classnames';


type Props = {
  className?: string
};

class ButtonToolbar extends React.Component<Props> {
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
