// @flow
import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import classNamePrefix, { globalKey } from './utils/prefix';
import InputGroup from './InputGroup';
import Input from './Input';
import Button from './Button';
import Icon from './Icon';

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
  onChange?: (value: number | null, event?: SyntheticEvent<*>) => void
};

type State = {
  decimals: number,
  value?: number | null,
  disabledUpButton?: boolean,
  disabledDownButton?: boolean
}

class InputNumber extends React.Component<Props, State> {

  static defaultProps = {
    classPrefix: `${globalKey}input-number`,
    min: -Infinity,
    max: Infinity,
    step: 1
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue || 0,
      decimals: this.getDecimals()
    };
  }

  getDecimals() {
    const { step } = this.props;
    if (_.isNumber(step) && !_.isInteger(step)) {
      return step.toString().split('.')[1].length;
    }
    return 0;
  }
  getMax(value: number | null) {
    const { max } = this.props;
    return {
      inMax: +value <= max,
      equalMax: +value >= max
    };
  }
  getMin(value: number | null) {
    const { min } = this.props;
    return {
      inMin: +value >= min,
      equalMin: +value <= min
    };
  }
  getValue() {

    const { value } = this.state;

    if (typeof this.props.value !== 'undefined') {
      return this.props.value;
    }

    return value;
  }
  setButtonStatus(disabledUpButton: boolean, disabledDownButton: boolean) {
    this.setState({
      disabledUpButton,
      disabledDownButton
    });
  }
  handleOnChange = (value: string, event: SyntheticInputEvent<*>) => {

    if (!/^-?(?:\d+)(?:\.\d+)?$/.test(value)) {
      return;
    }

    this.handleValue(
      (value === '') ? null : Number.parseFloat(value),
      event
    );
  }

  handleBlur = (event: SyntheticInputEvent<*>) => {
    const { max, min } = this.props;
    let targetValue = Number.parseFloat(event.target.value);

    if (!Number.isNaN(targetValue)) {
      if (!this.getMax(targetValue).inMax) {
        targetValue = max;
      }
      if (!this.getMin(targetValue).inMin) {
        targetValue = min;
      }
    } else {
      targetValue = null;
    }
    this.handleValue(targetValue, event);

  }
  handleWheel = (event: SyntheticWheelEvent<*>) => {
    const { disabled } = this.props;
    if (!disabled && (event.target === document.activeElement)) {
      event.preventDefault();
      const delta: any = event.wheelDelta || -event.deltaY || -event.detail;

      if (delta > 0) {
        this.handleMinus(event);
      }
      if (delta < 0) {
        this.handlePlus(event);
      }
    }
  }

  handlePlus = (event: SyntheticEvent<*>) => {
    const { decimals } = this.state;
    const { step, max } = this.props;
    let nextValue = (this.getValue() || 0) + step;

    nextValue = this.getMax(nextValue).inMax ? +nextValue.toFixed(decimals) : max;

    this.handleValue(nextValue, event);
  }
  handleMinus = (event: SyntheticEvent<*>) => {
    const { decimals } = this.state;
    const { step, min } = this.props;
    let nextValue = (this.getValue() || 0) - step;
    nextValue = this.getMin(nextValue).inMin ? +nextValue.toFixed(decimals) : min;
    this.handleValue(nextValue, event);
  }
  handleValue(currentValue: number | null, event?: SyntheticEvent<*>) {

    const { value } = this.state;
    const { onChange } = this.props;

    this.setButtonStatus(
      this.getMax(currentValue).equalMax,
      this.getMin(currentValue).equalMin
    );

    if (currentValue !== value) {
      this.setState({
        value: currentValue
      });
      onChange && onChange(currentValue, event);
    }
  }

  render() {

    const {
      disabled,
      prefix,
      postfix,
      className,
      classPrefix
    } = this.props;

    const {
      disabledUpButton,
      disabledDownButton
    } = this.state;

    const value = this.getValue();
    const addPrefix = classNamePrefix(classPrefix);
    const classes = classNames(classPrefix, className);

    return (
      <InputGroup
        className={classes}
      >
        {
          prefix &&
          <InputGroup.Addon>{prefix}</InputGroup.Addon>
        }
        <Input
          type="number"
          onChange={this.handleOnChange}
          onBlur={this.handleBlur}
          value={(value === null) ? '' : value + ''}
          onWheel={this.handleWheel}
          disabled={disabled}
        />
        {
          postfix &&
          <InputGroup.Addon>{postfix}</InputGroup.Addon>
        }
        {
          !disabled &&
          <span className={addPrefix('btn-group-vertical')} >
            <Button
              className={addPrefix('touchspin-up')}
              onClick={this.handlePlus}
              disabled={disabledUpButton}
            >
              <Icon icon="chevron-up" />
            </Button>
            <Button
              className={addPrefix('touchspin-down')}
              onClick={this.handleMinus}
              disabled={disabledDownButton}
            >
              <Icon icon="chevron-down" />
            </Button>
          </span>
        }
      </InputGroup>
    );
  }
}

export default InputNumber;
