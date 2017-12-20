// @flow

import * as React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import prefix, { globalKey } from './utils/prefix';

type Porps = {
  id?: string,
  name?: string,
  inline?: boolean,
  title?: string,
  disabled?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  inputRef?: React.Ref<any>,
  children?: React.Node,
  className?: string,
  classPrefix?: string,
  style?: Object,
  value?: any,
  onChange?: (value: any, checked: boolean, event: SyntheticInputEvent<HTMLInputElement>) => void,
}

type States = {
  checked: boolean
}


class Radio extends React.Component<Porps, States> {
  static displayName = 'Radio';
  static defaultProps = {
    classPrefix: `${globalKey}radio`
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

  updateCheckedState(checked: boolean, callback?: Function) {
    this.setState({ checked }, callback);
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value, disabled, onChange } = this.props;
    const checked = true;
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
      title,
      name,
      className,
      children,
      onChange,
      disabled,
      checked,
      defaultChecked,
      classPrefix,
      style,
      inputRef,
      ...props,
    } = this.props;

    const nextChecked: boolean | void = isUndefined(checked) ? this.state.checked : checked;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('inline')]: inline,
      [addPrefix('disabled')]: disabled,
      [addPrefix('checked')]: nextChecked
    }, className);

    const input = (
      <span className={addPrefix('wrapper')}>
        <input
          {...props}
          type="radio"
          checked={checked}
          defaultChecked={defaultChecked}
          ref={inputRef}
          name={name}
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


export default Radio;
