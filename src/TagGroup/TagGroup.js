// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  children?: React.Node
};

class TagGroup extends React.Component<Props> {
  render() {
    const { className, classPrefix, children, ...rest } = this.props;
    const classes = classNames(classPrefix, className);
    return (
      <div {...rest} className={classes}>
        {children}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'tag-group'
})(TagGroup);
