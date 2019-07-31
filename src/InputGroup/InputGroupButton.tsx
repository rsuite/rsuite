import * as React from 'react';

import classNames from 'classnames';
import { defaultProps } from '../utils';
import Button from '../Button';
import { ButtonProps } from '../Button/Button.d';

class InputGroupButton extends React.Component<ButtonProps> {
  render() {
    const { className, classPrefix, ...props } = this.props;
    return <Button componentClass="a" {...props} className={classNames(classPrefix, className)} />;
  }
}

export default defaultProps<ButtonProps>({
  classPrefix: 'input-group-btn'
})(InputGroupButton);
