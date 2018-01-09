// @flow

import * as React from 'react';
import classNames from 'classnames';
import withStyleProps from './utils/withStyleProps';
import { getWidth } from 'dom-lib';
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

type States = {
  width?: number
};

class Loader extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${globalKey}loader`,
    speed: 'normal'
  };

  state = {
    width: undefined
  };

  componentDidMount() {
    const { center, backdrop } = this.props;

    if (center || backdrop) {
      this.setState({
        width: getWidth(this.loader)
      });
    }
  }

  loader = null;

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

    const { width } = this.state;

    const hasContent = !!content;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('wrapper'), addPrefix(`speed-${speed}`), {
      [`${addPrefix('backdrop')}-wrapper`]: backdrop,
      [addPrefix('vertical')]: vertical,
      [addPrefix('inverse')]: inverse,
      [addPrefix('center')]: center,
      [addPrefix('has-content')]: hasContent
    }, className);

    const loaderStyle = { width };

    return (
      <div
        {...props}
        className={classes}
      >
        {backdrop && <div className={addPrefix('backdrop')} />}
        <div
          className={classPrefix}
          style={loaderStyle}
          ref={(ref) => {
            this.loader = ref;
          }}
        >
          <span className={addPrefix('spin')} />
          {hasContent && <span className={addPrefix('content')}>{content}</span>}
        </div>
      </div>
    );
  }
}

export default withStyleProps({
  hasSize: true
})(Loader);
