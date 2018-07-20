// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import InputGroup from './InputGroup';
import Input from './Input';
import Button from './Button';
import Icon from './Icon';

import { prefix, defaultProps, getUnhandledProps, partitionHTMLProps } from './utils';

type Props = {
  className?: string,
  classPrefix: string,
  min: number,
  max: number,
  step: number,
  value?: number | string,
  defaultValue?: number | string,
  prefix?: React.Node,
  postfix?: React.Node,
  disabled?: boolean,
  size?: 'lg' | 'md' | 'sm' | 'xs',
  onWheel?: (event?: SyntheticEvent<*>) => void,
  onChange?: (value: any, event?: SyntheticEvent<*>) => void,
  buttonAppearance?: 'default' | 'primary' | 'link' | 'subtle' | 'ghost'
};

type State = {
  value?: number | string,
  disabledUpButton?: boolean,
  disabledDownButton?: boolean
};

const isFloat = (value: string | number) => /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');

function getDecimalLength(value: number): number {
  if (isFloat(value)) {
    return value.toString().split('.')[1].length;
  }
  return 0;
}

function decimals(...values: Array<number>) {
  const lengths: Array<any> = values.map(getDecimalLength);
  return Math.max(...lengths);
}

class InputNumber extends React.Component<Props, State> {
  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    step: 1,
    buttonAppearance: 'subtle'
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue
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

  eqMax(value: number | string) {
    const { max } = this.props;
    return {
      inMax: +value <= max,
      equalMax: +value >= max
    };
  }
  eqMin(value: number | string) {
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

  getSafeValue(value) {
    const { max, min } = this.props;
    if (!Number.isNaN(value)) {
      if (!this.eqMax(value).inMax) {
        value = max;
      }
      if (!this.eqMin(value).inMin) {
        value = min;
      }
    } else {
      value = '';
    }
    return value;
  }

  setButtonStatus(value?: number | string) {
    if (typeof value !== 'undefined') {
      this.setState({
        disabledUpButton: this.eqMax(value).equalMax,
        disabledDownButton: this.eqMin(value).equalMin
      });
    }
  }

  handleOnChange = (value: any, event: SyntheticInputEvent<*>) => {
    if (!/^-?(?:\d+)?(\.)?(\d+)*$/.test(value) && value !== '') {
      return;
    }
    const isUnControl = _.isUndefined(this.props.value);

    this.handleValue(value, event, isUnControl);
  };

  handleBlur = (event: SyntheticInputEvent<*>) => {
    const { max, min } = this.props;
    const targetValue = Number.parseFloat(event.target.value);
    this.handleValue(this.getSafeValue(targetValue), event);
  };
  handleWheel = (event: SyntheticWheelEvent<*>) => {
    const { onWheel, disabled } = this.props;
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

    onWheel && onWheel(event);
  };

  handlePlus = (event: SyntheticEvent<*>) => {
    const { step, max } = this.props;
    const value = +(this.getValue() || 0);
    const bit = decimals(value, step);
    const nextValue = (value + step).toFixed(bit);

    this.handleValue(this.getSafeValue(nextValue), event);
  };
  handleMinus = (event: SyntheticEvent<*>) => {
    const { step, min } = this.props;
    const value = +(this.getValue() || 0);
    const bit = decimals(value, step);
    const nextValue = (value - step).toFixed(bit);

    this.handleValue(this.getSafeValue(nextValue), event);
  };
  handleValue(currentValue: number | string, event?: SyntheticEvent<*>, input?: boolean) {
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
      buttonAppearance,
      ...props
    } = this.props;
    const { disabledUpButton, disabledDownButton } = this.state;

    const value = this.getValue();
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(InputNumber, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled);

    return (
      <InputGroup {...rest} className={classes} disabled={disabled} size={size}>
        {prefixElement && <InputGroup.Addon>{prefixElement}</InputGroup.Addon>}
        <Input
          {...htmlInputProps}
          type="text"
          step={step}
          onChange={this.handleOnChange}
          onBlur={this.handleBlur}
          value={_.isNil(value) ? '' : value}
          onWheel={this.handleWheel}
          disabled={disabled}
        />

        <span className={addPrefix('btn-group-vertical')}>
          <Button
            appearance={buttonAppearance}
            className={addPrefix('touchspin-up')}
            onClick={this.handlePlus}
            disabled={disabledUpButton || disabled}
          >
            <Icon icon="arrow-up-line" />
          </Button>
          <Button
            appearance={buttonAppearance}
            className={addPrefix('touchspin-down')}
            onClick={this.handleMinus}
            disabled={disabledDownButton || disabled}
          >
            <Icon icon="arrow-down-line" />
          </Button>
        </span>
        {postfix && <InputGroup.Addon>{postfix}</InputGroup.Addon>}
      </InputGroup>
    );
  }
}

export default defaultProps({
  classPrefix: 'input-number'
})(InputNumber);
