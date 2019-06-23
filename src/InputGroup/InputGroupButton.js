// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';
import Button from './Button';

type Props = {
  className?: string,
  classPrefix?: string
};

class InputGroupButton extends React.Component<Props> {
  render() {
    const { className, classPrefix, ...props } = this.props;
    return <Button {...props} componentClass="a" className={classNames(classPrefix, className)} />;
  }
}

export default defaultProps({
  classPrefix: 'input-group-btn'
})(InputGroupButton);
