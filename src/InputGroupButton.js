import React from 'react';
import classNames from 'classnames';

class InputGroupButton extends React.Component {
  render() {
    const {
      className,
      ...props
    } = this.props;
    return (
      <span
        {...props}
        className={classNames('input-group-btn', className)}
      />
    );
  }
}

export default InputGroupButton;
