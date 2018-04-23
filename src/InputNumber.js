// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import InputGroup from './InputGroup';
import Input from './Input';
import Button from './Button';
import Icon from './Icon';

import { prefix, defaultProps, isNullOrUndefined, getUnhandledProps } from './utils';

type Props = {
  className?: string,
  classPrefix: string,
  min: number,
  max: number,
  step: number,
  value?: number | null,
  defaultValue?: number,
  prefix?: React.Node,
  postfix?: React.Node,
  disabled?: boolean,
  size?: 'lg' | 'md' | 'sm' | 'xs',
  onChange?: (value: number | null, event?: SyntheticEvent<*>) => void
};

type State = {
  value?: number | null,
  disabledUpButton?: boolean,
  disabledDownButton?: boolean
};

function decimals(value) {
  if (_.isNumber(value) && !_.isInteger(value)) {
    return value.toString().split('.')[1].length;
  }
  return 0;
}

class InputNumber extends React.Component<Props, State> {
  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    step: 1
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue || 0
    };
  }
  componentWillMount() {
    const value = this.getValue();
    this.setButtonStatus(value);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setButtonStatus(nextProps.value);
    }
  }

  eqMax(value: number | null) {
    const { max } = this.props;
    return {
      inMax: +value <= max,
      equalMax: +value >= max
    };
  }
  eqMin(value: number | null) {
    const { min } = this.props;
    return {
      inMin: +value >= min,
      equalMin: +value <= min
    };
  }
  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }
  setButtonStatus(value?: number | null) {
    if (typeof value !== 'undefined') {
      const disabledUpButton = this.eqMax(value).equalMax;
      const disabledDownButton = this.eqMin(value).equalMin;
      this.setState({
        disabledUpButton,
        disabledDownButton
      });
    }
  }

  handleOnChange = (value: any, event: SyntheticInputEvent<*>) => {
    if (!/^-?(?:\d+)(\.)?(\d+)*$/.test(value) && value !== '') {
      return;
    }
    this.handleValue(value === '' ? null : value, event, true);
  };

  handleBlur = (event: SyntheticInputEvent<*>) => {
    const { max, min } = this.props;
    let targetValue = Number.parseFloat(event.target.value);

    if (!Number.isNaN(targetValue)) {
      if (!this.eqMax(targetValue).inMax) {
        targetValue = max;
      }
      if (!this.eqMin(targetValue).inMin) {
        targetValue = min;
      }
    } else {
      targetValue = null;
    }
    this.handleValue(targetValue, event);
  };
  handleWheel = (event: SyntheticWheelEvent<*>) => {
    const { disabled } = this.props;
    if (!disabled && event.target === document.activeElement) {
      event.preventDefault();
      const delta: any = event.wheelDelta || -event.deltaY || -event.detail;

      if (delta > 0) {
        this.handleMinus(event);
      }
      if (delta < 0) {
        this.handlePlus(event);
      }
    }
  };

  handlePlus = (event: SyntheticEvent<*>) => {
    const { step, max } = this.props;
    const value = this.getValue() || 0;
    const bit = decimals(value);

    const nextValue = +(value + step).toFixed(bit);
    const output = this.eqMax(nextValue).inMax ? nextValue : max;

    this.handleValue(output, event);
  };
  handleMinus = (event: SyntheticEvent<*>) => {
    const { step, min } = this.props;
    const value = this.getValue() || 0;
    const bit = decimals(value);

    const nextValue = +(value - step).toFixed(bit);
    const output = this.eqMin(nextValue).inMin ? nextValue : min;

    this.handleValue(output, event);
  };
  handleValue(currentValue: number | null, event?: SyntheticEvent<*>, input?: boolean) {
    const { value } = this.state;
    const { onChange } = this.props;

    this.setButtonStatus(currentValue);

    if (currentValue !== value) {
      this.setState({
        value: currentValue
      });

      if (!input && onChange) {
        onChange(currentValue, event);
      }
    }
  }

  render() {
    const {
      disabled,
      size,
      prefix: prefixElement,
      postfix,
      className,
      classPrefix,
      step,
      ...rest
    } = this.props;
    const { disabledUpButton, disabledDownButton } = this.state;

    const value = this.getValue();
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(InputNumber, rest);

    return (
      <InputGroup {...unhandled} className={classes} disabled={disabled} size={size}>
        {prefixElement && <InputGroup.Addon>{prefixElement}</InputGroup.Addon>}
        <Input
          type="text"
          step={step}
          onChange={this.handleOnChange}
          onBlur={this.handleBlur}
          value={isNullOrUndefined(value) ? '' : value}
          onWheel={this.handleWheel}
          disabled={disabled}
        />
        {postfix && <InputGroup.Addon>{postfix}</InputGroup.Addon>}

        <span className={addPrefix('btn-group-vertical')}>
          <Button
            className={addPrefix('touchspin-up')}
            onClick={this.handlePlus}
            disabled={disabledUpButton || disabled}
          >
            <Icon icon="arrow-up-line" />
          </Button>
          <Button
            className={addPrefix('touchspin-down')}
            onClick={this.handleMinus}
            disabled={disabledDownButton || disabled}
          >
            <Icon icon="arrow-down-line" />
          </Button>
        </span>
      </InputGroup>
    );
  }
}

export default defaultProps({
  classPrefix: 'input-number'
})(InputNumber);
