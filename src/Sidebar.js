// @flow

import * as React from 'react';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  width: number | string,
  collapsible?: boolean,
  style?: Object
};

class Sidebar extends React.Component<Props> {
  static defaultProps = {
    width: 260
  };
  render() {
    const { className, classPrefix, collapsible, width, style, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('collapse')]: collapsible
    });

    const styles = {
      flex: `0 0 ${width}px`,
      width,
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
