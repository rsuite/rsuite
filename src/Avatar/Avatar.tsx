import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { defaultProps, prefix, withStyleProps } from '../utils';
import { SIZE } from '../constants';
import { AvatarProps } from './Avatar.d';

class Avatar extends React.Component<AvatarProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf(SIZE),
    src: PropTypes.string,
    circle: PropTypes.bool,
    alt: PropTypes.string
  };
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

export default compose<any, AvatarProps>(
  withStyleProps<AvatarProps>({
    hasSize: true
  }),
  defaultProps<AvatarProps>({
    classPrefix: 'avatar'
  })
)(Avatar);
