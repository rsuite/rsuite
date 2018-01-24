// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';
import Button from './Button';

type Props = {
  className?: string,
  classPrefix?: string
}

class InputGroupButton extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}input-group-btn`,
  }
  render() {
    const {
      className,
      classPrefix,
      ...props
    } = this.props;
    return (
      <Button
        {...props}
        componentClass="a"
        className={classNames(classPrefix, className)}
      />
    );
  }
}

export default InputGroupButton;
