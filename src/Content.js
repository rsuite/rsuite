// @flow

import * as React from 'react';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import { defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string
};

class Content extends React.Component<Props> {
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return <div {...props} className={classes} />;
  }
}

const EnhancedContent = defaultProps({
  classPrefix: 'content'
})(Content);

const Component: EnhancedContent = setDisplayName('Content')(EnhancedContent);

export default Component;
