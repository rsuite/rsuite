// @flow

import * as React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string,
}


class InputGroupAddon extends React.Component<Props> {
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
