// @flow

import * as React from 'react';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import { defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  width: number,
  style?: Object
};

class Sidebar extends React.Component<Props> {
  static defaultProps = {
    width: 260
  };
  render() {
    const { className, classPrefix, width, style, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    const styles = {
      flex: `0 0 ${width}px`,
      maxWidth: `${width}px`,
      minWidth: `${width}px`,
      width: `${width}px`,
      ...style
    };
    return <div {...props} className={classes} style={styles} />;
  }
}

export default setDisplayName('Sidebar')(
  defaultProps({
    classPrefix: 'sidebar'
  })(Sidebar)
);
