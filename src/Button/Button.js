/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import SafeAnchor from '../SafeAnchor';
import omitPropsByPropTypes from '../utils/omitPropsByPropTypes';
import withStyleProps from '../utils/withStyleProps';
import createComponent from '../utils/createComponent';

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
    classPrefix: 'btn',
    shape: 'default'
  };

  getClassNames(): string {
    const { active, disabled, block, className, classPrefix } = this.props;
    return classNames({
      active,
      disabled,
      [`${classPrefix}-block`]: block
    }, className);
  }

  getElementProps() {
    const elementProps: Object = omitPropsByPropTypes(this.props, Button.propTypes);
    return elementProps;
  }

  renderAnchor() {

    const { href } = this.props;
    const elementProps = this.getElementProps();

    return (
      <SafeAnchor
        href={href}
        {...elementProps}
        className={this.getClassNames()}
      />
    );
  }

  renderButton() {
    const { disabled } = this.props;
    const elementProps = this.getElementProps();
    return (
      <Component
        {...elementProps}
        disabled={disabled}
        className={this.getClassNames()}
      />
    );
  }

  render() {

    if (this.props.href) {
      return this.renderAnchor();
    }

    return this.renderButton();
  }
}

export default withStyleProps({
  hasSize: true,
  hasStatus: true,
  hasColor: true
})(Button);
