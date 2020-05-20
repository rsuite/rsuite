import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import { prefix, defaultProps, getUnhandledProps, partitionHTMLProps, refType } from '../utils';
import { CheckboxProps } from './Checkbox.d';
import { CheckboxContext } from '../CheckboxGroup/CheckboxGroup';
import { CheckboxContextProps } from '../CheckboxGroup/CheckboxGroup.d';

interface CheckboxState {
  checked?: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  static contextType = CheckboxContext;
  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    inputRef: refType,
    value: PropTypes.any,
    children: PropTypes.node,
    classPrefix: PropTypes.string,
    tabIndex: PropTypes.number,

    checkable: PropTypes.bool,
    onCheckboxClick: PropTypes.func
  };
  static defaultProps = {
    checkable: true,
    tabIndex: 0
  };

  context: CheckboxContextProps = {};

  constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      checked: props.defaultChecked
    };
  }

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange, disabled, value } = this.props;
    const checked = !this.isChecked();

    if (disabled) {
      return;
    }

    this.setState({ checked });
    onChange?.(value, checked, event);
    this.context.onChange?.(value, checked, event);
  };

  getCheckedByValue() {
    const { value } = this.context;
    if (!_.isUndefined(value) && !_.isUndefined(this.props.value)) {
      return value.some(i => i === this.props.value);
    }

    return this.props.checked;
  }

  isChecked() {
    const checked = this.getCheckedByValue();
    return _.isUndefined(checked) ? this.state.checked : checked;
  }

  render() {
    const {
      disabled,
      className,
      children,
      title,
      inputRef,
      indeterminate,
      tabIndex,
      classPrefix,
      onClick,
      onCheckboxClick,
      checkable,
      ...props
    } = this.props;

    const checked = this.isChecked();
    const { inline = this.props.inline, name = this.props.name, controlled } = this.context;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('inline')]: inline,
      [addPrefix('indeterminate')]: indeterminate,
      [addPrefix('disabled')]: disabled,
      [addPrefix('checked')]: checked
    });

    const unhandled = getUnhandledProps(Checkbox, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled);

    if (!_.isUndefined(controlled)) {
      htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
    }

    const input = (
      <span className={addPrefix('wrapper')} onClick={onCheckboxClick} aria-disabled={disabled}>
        <input
          {...htmlInputProps}
          name={name}
          type="checkbox"
          ref={inputRef}
          tabIndex={tabIndex}
          onClick={event => event.stopPropagation()}
          disabled={disabled}
          onChange={this.handleChange}
        />
        <span className={addPrefix('inner')} aria-hidden={true} role="presentation" />
      </span>
    );

    return (
      <div {...rest} onClick={onClick} className={classes}>
        <div className={addPrefix('checker')}>
          <label title={title}>
            {checkable ? input : null}
            {children}
          </label>
        </div>
      </div>
    );
  }
}

export default defaultProps<CheckboxProps>({
  classPrefix: 'checkbox'
})(Checkbox);
