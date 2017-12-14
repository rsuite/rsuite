/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';
import withStyleProps from './utils/withStyleProps';
import createComponent from './utils/createComponent';
import prefix from './utils/prefix';

type Props = {
  active?: boolean,
  disabled?: boolean,
  block?: boolean,
  href?: string,
  className?: string,
  classPrefix: string
};

const Component = createComponent('button');

class Button extends React.Component<Props> {

  static defaultProps = {
    classPrefix: 'btn'
  };

  render() {

    const { href, active, disabled, block, className, classPrefix, ...props } = this.props;
    const addPrefix: Function = prefix(classPrefix);

    const classes = classNames({
      active,
      disabled,
      [addPrefix('block')]: block,
    }, className);

    if (href) {
      return (
        <SafeAnchor
          {...props}
          href={href}
          className={classes}
        />
      );
    }

    return (
      <Component
        {...props}
        disabled={disabled}
        className={classes}
      />
    );
  }
}

export default withStyleProps({
  hasSize: true,
  hasStatus: true,
  hasColor: true
})(Button);

