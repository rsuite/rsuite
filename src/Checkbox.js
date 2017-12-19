// @flow

import * as React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import prefix from './utils/prefix';

type Props = {
  title?: string,
  className?: string,
  inline?: boolean,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (value: any, checked: boolean, event: SyntheticInputEvent<HTMLInputElement>) => void,
  inputRef?: React.Ref<any>,
  value?: any,
  style?: Object,
  children?: React.Node,
  classPrefix?: string
}

type States = {
  checked: boolean
}

class Checkbox extends React.Component<Props, States> {

  static displayName = 'Checkbox';
  static defaultProps = {
    classPrefix: 'checkbox'
  };


  state = {
    checked: false
  };


  componentWillMount() {
    const { checked, defaultChecked } = this.props;
    this.setState({
      checked: isUndefined(checked) ? defaultChecked : checked
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
    const checked = !this.state.checked;

    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange(value, checked, event);
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
      classPrefix,
      ...props
    } = this.props;

    const nextChecked: boolean | void = isUndefined(checked) ? this.state.checked : checked;
    const addPrefix = prefix(classPrefix);
    const classes: string = classNames(classPrefix, {
      [addPrefix('inline')]: inline
    }, className);

    const checkboxClasses = classNames('checker', {
      disabled
    });

    const input = (
      <span className={classNames(addPrefix('wrapper'), { checked: nextChecked })}>
        <input
          {...props}
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
