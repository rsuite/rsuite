// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import prefix, { globalKey } from './utils/prefix';
import withStyleProps from './utils/withStyleProps';

type Props = {
  className?: string,
  classPrefix: string,
  inside?: boolean
}

type States = {
  focus?: boolean
}

class InputGroup extends React.Component<Props, States> {
  static defaultProps = {
    classPrefix: `${globalKey}input-group`,
  }

  static childContextTypes = {
    inputGroup: PropTypes.object.isRequired
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false
    };
  }
  getChildContext() {
    return {
      inputGroup: {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }
    };
  }
  handleFocus = () => {
    this.setState({ focus: true });
  }

  handleBlur = () => {
    this.setState({ focus: false });
  }

  render() {
    const {
      className,
      classPrefix,
      inside,
      ...props
    } = this.props;
    const { focus } = this.state;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('inside')]: inside,
      [addPrefix('focus')]: focus
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
