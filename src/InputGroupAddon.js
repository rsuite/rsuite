import React from 'react';
import classNames from 'classnames';

class InputGroupAddon extends React.Component {
  render() {
    const {
      className,
      ...props
    } = this.props;

    return (
      <span
        {...props}
        className={classNames('input-group-addon', className)}
      />
    );
  }
}

export default InputGroupAddon;
