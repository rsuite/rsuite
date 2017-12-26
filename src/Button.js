/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';
import withStyleProps from './utils/withStyleProps';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';

export type Props = {
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost',
  classPrefix: string,
  className?: string,
  active?: boolean,
  block?: boolean,
  href?: string,
  loading?: boolean,
  disabled?: boolean
};

const Component = createComponent('button');

class Button extends React.Component<Props> {

  static defaultProps = {
    appearance: 'default',
    classPrefix: `${globalKey}btn`
  };

  render() {

    const {
      href,
      active,
      disabled,
      loading,
      block,
      className,
      classPrefix,
      appearance,
      ...props
    } = this.props;

    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
      [addPrefix('loading')]: loading,
      [addPrefix('block')]: block
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

