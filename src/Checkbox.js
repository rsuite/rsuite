// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';

import { prefix, defaultProps, getUnhandledProps, partitionHTMLProps } from './utils';

type Props = {
  title?: string,
  className?: string,
  inline?: boolean,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  indeterminate?: boolean,
  onChange?: (value: any, checked: boolean, event: SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  inputRef?: React.ElementRef<*>,
  value?: any,
  children?: React.Node,
  classPrefix?: string,
  tabIndex?: number
};

type State = {
  checked?: boolean
};

class Checkbox extends React.Component<Props, State> {
  static defaultProps = {
    tabIndex: 0
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      checked: props.defaultChecked
    };
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange, disabled, value } = this.props;
    const checked = !this.isChecked();

    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange(value, checked, event);
    });
  };

  isChecked() {
    const { checked } = this.props;
    return _.isUndefined(checked) ? this.state.checked : checked;
  }

  render() {
    const {
      inline,
      disabled,
      className,
      onChange,
      children,
      title,
      inputRef,
      defaultChecked,
      indeterminate,
      tabIndex,
      classPrefix,
      onClick,
      ...props
    } = this.props;

    const checked: boolean | void = this.isChecked();
    const addPrefix = prefix(classPrefix);
    const classes: string = classNames(classPrefix, className, {
      [addPrefix('inline')]: inline,
      [addPrefix('indeterminate')]: indeterminate,
      [addPrefix('disabled')]: disabled,
      [addPrefix('checked')]: checked
    });

    const unhandled = getUnhandledProps(Checkbox, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled);

    const input = (
      <span tabIndex={disabled ? -1 : tabIndex} className={addPrefix('wrapper')}>
        <input
          {...htmlInputProps}
          defaultChecked={defaultChecked}
          type="checkbox"
          ref={inputRef}
          onClick={event => event.stopPropagation()}
          disabled={disabled}
          onChange={this.handleChange}
        />
        <span className={addPrefix('inner')} />
      </span>
    );

    return (
      <div {...rest} onClick={onClick} className={classes}>
        <div className={addPrefix('checker')}>
          <label title={title}>
            {input}
            {children}
          </label>
        </div>
      </div>
    );
  }
}

export default setDisplayName('Checkbox')(
  defaultProps({
    classPrefix: 'checkbox'
  })(Checkbox)
);
