import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';

import { prefix, defaultProps, getUnhandledProps, partitionHTMLProps } from '../utils';
import { CheckboxProps } from './Checkbox.d';

interface CheckboxState {
  checked?: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
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
    inputRef: PropTypes.func,
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
      children,
      title,
      inputRef,
      defaultChecked,
      indeterminate,
      tabIndex,
      classPrefix,
      onClick,
      onCheckboxClick,
      checkable,
      ...props
    } = this.props;

    const checked: boolean = this.isChecked();
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
      <span className={addPrefix('wrapper')} onClick={onCheckboxClick}>
        <input
          {...htmlInputProps}
          defaultChecked={defaultChecked}
          type="checkbox"
          ref={inputRef}
          tabIndex={tabIndex}
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
            {checkable ? input : null}
            {children}
          </label>
        </div>
      </div>
    );
  }
}

const EnhancedCheckBox = defaultProps<CheckboxProps>({
  classPrefix: 'checkbox'
})(Checkbox);

export default setDisplayName('Checkbox')(EnhancedCheckBox);
