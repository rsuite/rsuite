// @flow

import * as React from 'react';
import classNames from 'classnames';
import { getWidth, addStyle } from 'dom-lib';
import compose from 'recompose/compose';

import { withStyleProps, defaultProps, prefix } from './utils';
import { isIE11, isEdge } from './utils/BrowserDetection';

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
    speed: 'normal'
  };

  componentDidMount() {
    const { center, backdrop } = this.props;

    if (center || backdrop) {
      const width = getWidth(this.loader);
      addStyle(this.loader, {
        display: isIE11() || isEdge() ? 'block' : 'table',
        width: `${width}px`
      });
    }
  }

  loader = null;

  loaderRef = ref => {
    this.loader = ref;
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

    const hasContent = !!content;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('wrapper'), addPrefix(`speed-${speed}`), className, {
      [addPrefix('backdrop-wrapper')]: backdrop,
      [addPrefix('vertical')]: vertical,
      [addPrefix('inverse')]: inverse,
      [addPrefix('center')]: center,
      [addPrefix('has-content')]: hasContent
    });

    return (
      <div {...props} className={classes}>
        {backdrop && <div className={addPrefix('backdrop')} />}
        <div className={classPrefix} ref={this.loaderRef}>
          <span className={addPrefix('spin')} />
          {hasContent && <span className={addPrefix('content')}>{content}</span>}
        </div>
      </div>
    );
  }
}

export default compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'loader'
  })
)(Loader);
