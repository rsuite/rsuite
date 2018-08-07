// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';

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

function getButtonStatus(value?: ?number | string, min: number, max: number) {
  let status = {
    disabledUpButton: false,
    disabledDownButton: false
  };
  if (typeof value !== 'undefined' && value !== null) {
    status.disabledUpButton = +value >= max;
    status.disabledDownButton = +value <= min;
  }
  return status;
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
    const { value, defaultValue, max, min } = props;
    const { disabledUpButton, disabledDownButton } = getButtonStatus(
      _.isUndefined(value) ? defaultValue : value,
      min,
      max
    );

    this.state = {
      value: defaultValue,
      disabledUpButton,
      disabledDownButton
    };
  }

  static getDerivedStateFromProps(nextProps: Props) {
    if (typeof nextProps.value !== 'undefined') {
      const { value, min, max } = nextProps;
      return getButtonStatus(value, min, max);
    }
    return null;
  }

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  getSafeValue(value) {
    const { max, min } = this.props;
    if (!Number.isNaN(value)) {
      if (+value > max) {
        value = max;
      }
      if (+value < min) {
        value = min;
      }
    } else {
      value = '';
    }
    return value;
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
      const delta: number = _.get(event, 'wheelDelta') || -event.deltaY || -event.detail;

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
    const { onChange, min, max } = this.props;

    if (currentValue !== value) {
      this.setState({
        ...getButtonStatus(currentValue, min, max),
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

polyfill(InputNumber);

export default defaultProps({
  classPrefix: 'input-number'
})(InputNumber);
