// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  disabled?: boolean
};

class InputGroupAddon extends React.Component<Props> {
  render() {
    const { className, classPrefix, disabled, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('disabled')]: disabled
    });

    return <span {...props} className={classes} />;
  }
}

export default defaultProps({
  classPrefix: 'input-group-addon'
})(InputGroupAddon);
