// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';
import createComponent from './utils/createComponent';

const Component = createComponent('div');

type Props = {
  className?: string,
  classProfix?: string
}

class Row extends React.Component<Props> {
  static defaultProps = {
    classProfix: `${globalKey}row`
  }
  render() {

    const {
      className,
      classProfix,
      ...props
    } = this.props;

    const classes = classNames(classProfix, className);

    return (
      <Component
        {...props}
        className={classes}
      />
    );
  }
}

export default Row;
