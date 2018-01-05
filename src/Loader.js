// @flow

import * as React from 'react';
import classNames from 'classnames';
import withStyleProps from './utils/withStyleProps';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  classPrefix: string,
  center?: boolean,
  backdrop?: boolean,
  inverse?: boolean,
  vertical?: boolean,
  content?: React.Node,
  speed: 'normal' | 'fast' | 'slow'
};

class Loader extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}loader`,
    speed: 'normal'
  };

  addPrefix(name: string) {
    return prefix(this.props.classPrefix)(name);
  }

  render() {

    const {
      classPrefix,
      className,
      inverse,
      backdrop,
      speed,
      center,
      vertical,
      content,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(`speed-${speed}`), {
      [`${addPrefix('backdrop')}-wrapper`]: backdrop,
      [addPrefix('vertical')]: vertical,
      [addPrefix('inverse')]: inverse,
      [addPrefix('center')]: center
    }, className);

    return (
      <div
        {...props}
        className={classes}
      >
        {backdrop && <div className={addPrefix(backdrop)} />}
        <span className={addPrefix('spin')} />
        <span className={addPrefix('content')}>{content}</span>
      </div>
    );
  }
}

export default withStyleProps({
  hasSize: true
})(Loader);
