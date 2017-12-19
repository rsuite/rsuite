// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  classPrefix?: string
}


class InputGroupAddon extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}input-group-addon`,
  }

  render() {
    const {
      className,
      classPrefix,
      ...props
    } = this.props;

    return (
      <span
        {...props}
        className={classNames(classPrefix, className)}
      />
    );
  }
}

export default InputGroupAddon;
