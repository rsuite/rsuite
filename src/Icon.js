// @flow

import * as React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  icon: string | { viewBox: string, id: string },
  className?: string,
  classPrefix?: string,
  componentClass?: React.ElementType,
  size?: 'lg' | '2x' | '3x' | '4x' | '5x',
  flip?: 'horizontal' | 'vertical',
  stack?: '1x' | '2x',
  rotate?: number,
  fixedWidth?: boolean,
  svgStyle?: Object,
  spin?: boolean,
  pulse?: boolean
}

const Component = createComponent('i');

class Icon extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}icon`
  }

  render() {
    const {
      className,
      classPrefix,
      icon,
      size,
      fixedWidth,
      spin,
      pulse,
      rotate,
      flip,
      stack,
      svgStyle,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const isSvgIcon = (
      typeof icon === 'object' &&
      get(icon, ['constructor', 'name']) === 'BrowserSpriteSymbol'
    );


    const classes = classNames('icon', {
      [addPrefix(icon)]: !isSvgIcon,
      [addPrefix(size)]: size,
      [addPrefix('fw')]: fixedWidth,
      [addPrefix('spin')]: spin,
      [addPrefix('pulse')]: pulse,
      [addPrefix(`flip-${flip || ''}`)]: flip,
      [addPrefix(`rotate-${rotate || ''}`)]: rotate,
      [addPrefix(`stack-${stack || ''}`)]: stack
    }, className);

    if (isSvgIcon) {
      return (
        <Component {...props} className={classes}>
          <svg style={svgStyle} viewBox={icon.viewBox}>
            <use xlinkHref={`#${icon.id}`} />
          </svg>
        </Component>
      );
    }

    return (
      <Component {...props} className={classes} />
    );

  }
}

export default Icon;

