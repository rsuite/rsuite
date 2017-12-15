// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import prefix from './utils/prefix';
import withStyleProps from './utils/withStyleProps';

type Props = {
  className?: string,
  classPrefix?: string,
  inside?: boolean
}

class InputGroup extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'input-group',
  }
  render() {
    const {
      className,
      classPrefix,
      inside,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames({
      [addPrefix('inside')]: inside
    }, className);

    return (
      <div
        {...props}
        className={classes}
      />
    );
  }
}

const WithInputGroup = withStyleProps({
  hasSize: true
})(InputGroup);

setStatic('Addon', InputGroupAddon)(WithInputGroup);
setStatic('Button', InputGroupButton)(WithInputGroup);

export default WithInputGroup;
