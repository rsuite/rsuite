/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import SafeAnchor from './SafeAnchor';
import withStyleProps from './utils/withStyleProps';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';
import getUnhandledProps from './utils/getUnhandledProps';

export type Props = {
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost',
  classPrefix: string,
  className?: string,
  active?: boolean,
  block?: boolean,
  href?: string,
  loading?: boolean,
  disabled?: boolean,
  children?: React.Node
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
      children,
      ...props
    } = this.props;

    const unhandled = getUnhandledProps(Button, props);
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
      [addPrefix('loading')]: loading,
      [addPrefix('block')]: block
    }, className);

    const spin = <span className={addPrefix('spin')} />;

    if (href) {
      return (
        <SafeAnchor
          {...unhandled}
          role="button"
          href={href}
          className={classes}
        >
          {loading && spin}
          {children}
        </SafeAnchor>
      );
    }

    return (
      <Component
        {...unhandled}
        disabled={disabled}
        className={classes}
      >
        {loading && spin}
        {children}
      </Component>
    );
  }
}


export default withStyleProps({
  hasSize: true,
  hasColor: true
})(Button);
