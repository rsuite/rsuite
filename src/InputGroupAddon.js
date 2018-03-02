// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string
};

class InputGroupAddon extends React.Component<Props> {
  render() {
    const { className, classPrefix, ...props } = this.props;

    return <span {...props} className={classNames(classPrefix, className)} />;
  }
}

export default defaultProps({
  classPrefix: 'input-group-addon'
})(InputGroupAddon);
