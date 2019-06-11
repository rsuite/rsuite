// @flow

import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { defaultProps, prefix, withStyleProps } from './utils';
import Icon from './Icon';
import type { Size } from './utils/TypeDefinition';

type Props = {
  classPrefix: string,
  className?: string,
  children?: string | React.Element<typeof Icon>,
  size?: Size,
  src?: string,
  circle?: boolean,
  alt?: string
};

class Avatar extends React.Component<Props> {
  render() {
    const { classPrefix, className, children, src, circle, alt, ...rest } = this.props;
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('circle')]: circle
    });

    return (
      <div {...rest} className={classes}>
        {src ? <img className={addPrefix('image')} src={src} alt={alt} /> : children}
      </div>
    );
  }
}

export default compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'avatar'
  })
)(Avatar);
