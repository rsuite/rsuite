// @flow

import * as React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  title?: string,
  className?: string,
  inline?: boolean,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  indeterminate?: boolean,
  onChange?: (value: any, checked: boolean, event: SyntheticInputEvent<HTMLInputElement>) => void,
  inputRef?: React.Ref<any>,
  value?: any,
  style?: Object,
  children?: React.Node,
  classPrefix?: string,
  tabIndex?: number
}

type States = {
  checked?: boolean
}

class Checkbox extends React.Component<Props, States> {

  static displayName = 'Checkbox';
  static defaultProps = {
    classPrefix: `${globalKey}checkbox`,
    tabIndex: 0
  };

  constructor(props: Props) {
    super(props);
    const { checked, defaultChecked } = props;
    this.state = {
      checked: isUndefined(checked) ? defaultChecked : checked
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
  }

  isChecked() {
    const { checked } = this.props;
    if (!isUndefined(checked)) {
      return checked;
    }

    return this.state.checked;
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
      style,
      defaultChecked,
      indeterminate,
      tabIndex,
      classPrefix,
      ...props
    } = this.props;

    const checked: boolean | void = this.isChecked();
    const addPrefix = prefix(classPrefix);
    const classes: string = classNames(classPrefix, {
      [addPrefix('inline')]: inline,
      [addPrefix('indeterminate')]: indeterminate,
      [addPrefix('disabled')]: disabled,
      [addPrefix('checked')]: checked
    }, className);

    const input = (
      <span
        tabIndex={disabled ? -1 : tabIndex}
        className={addPrefix('wrapper')}
      >
        <input
          {...props}
          defaultChecked={defaultChecked}
          type="checkbox"
          ref={inputRef}
          disabled={disabled}
          onChange={this.handleChange}
        />
        <span className={addPrefix('inner')} />
      </span>
    );

    return (
      <div
        className={classes}
        style={style}
      >
        <div
          className={addPrefix('checker')}
        >
          <label title={title}>
            {input}
            {children}
          </label>

        </div>
      </div>
    );
  }
}

export default Checkbox;
