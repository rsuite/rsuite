/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';


type Props = {
  className?: string,
  classPrefix?: string
};

class ButtonToolbar extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}btn-toolbar`
  };
  render() {

    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return (
      <div
        role="toolbar"
        className={classes}
        {...props}
      />
    );
  }
}

export default ButtonToolbar;
