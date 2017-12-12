// @flow

import * as React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';

type Props = {
  title?: string,
  className?: string,
  inline?: boolean,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  inputRef?: React.Ref<any>,
  value?: any,
  style?: Object,
  children?: React.Node,
}

type States = {
  checked: boolean
}

class Checkbox extends React.Component<Props, States> {

  state = {
    checked: true
  };


  componentWillMount() {
    const { checked, defaultChecked } = this.props;
    this.setState({
      checked: checked || defaultChecked
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }
  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange, disabled, value } = this.props;
    const target = event.target;
    const checked = !this.state.checked;

    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange(value ? target.value : checked, event);
    });
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
      checked,
      ...props
    } = this.props;

    const nextChecked: boolean | void = isUndefined(checked) ? this.state.checked : checked;
    const classes: string = classNames('checkbox', {
      'checkbox-inline': inline
    }, className);

    const checkboxClasses = classNames('checker', {
      disabled
    });

    const input = (
      <span className={classNames('checkbox-wrapper', { checked: nextChecked })}>
        <input
          {...props}
          type="checkbox"
          ref={inputRef}
          disabled={disabled}
          onChange={this.handleChange}
        />
      </span>
    );

    return (
      <div
        className={classes}
        style={style}
      >
        <div
          className={checkboxClasses}
          role="button"
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
