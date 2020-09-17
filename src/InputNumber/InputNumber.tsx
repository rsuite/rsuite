import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import { on } from 'dom-lib';

import InputGroup from '../InputGroup/InputGroup';
import InputGroupAddon from '../InputGroup/InputGroupAddon';
import Input from '../Input';
import Button from '../Button';
import Icon from '../Icon';
import {
  prefix,
  defaultProps,
  getUnhandledProps,
  partitionHTMLProps,
  createChainedFunction
} from '../utils';
import { InputNumberProps } from './InputNumber.d';

interface InputNumberState {
  value?: number | string;
  disabledUpButton?: boolean;
  disabledDownButton?: boolean;
}

const isFloat = (value: string | number) => /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');

function getDecimalLength(value: number): number {
  if (isFloat(value)) {
    return value.toString().split('.')[1].length;
  }
  return 0;
}

function decimals(...values: number[]) {
  const lengths: any[] = values.map(getDecimalLength);
  return Math.max(...lengths);
}

function getButtonStatus(value: number | string, min: number, max: number) {
  const status = {
    disabledUpButton: false,
    disabledDownButton: false
  };
  if (typeof value !== 'undefined' && value !== null) {
    status.disabledUpButton = +value >= max;
    status.disabledDownButton = +value <= min;
  }
  return status;
}

class InputNumber extends React.Component<InputNumberProps, InputNumberState> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    prefix: PropTypes.node,
    postfix: PropTypes.node,
    disabled: PropTypes.bool,
    scrollable: PropTypes.bool,
    size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
    buttonAppearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
    onWheel: PropTypes.func,
    onChange: PropTypes.func
  };
  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    step: 1,
    buttonAppearance: 'subtle',
    scrollable: true
  };

  constructor(props: InputNumberProps) {
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

  static getDerivedStateFromProps(nextProps: InputNumberProps) {
    if (typeof nextProps.value !== 'undefined') {
      const { value, min, max } = nextProps;
      return getButtonStatus(value, min, max);
    }
    return null;
  }

  input = null;
  inputWheelListener = null;
  componentDidMount() {
    if (this.input && this.props.scrollable) {
      this.inputWheelListener = on(this.input, 'wheel', this.handleWheel, {
        passive: false
      });
    }
  }
  componentWillUnmount() {
    if (this.inputWheelListener) {
      this.inputWheelListener.off();
    }
  }

  bindInputRef = ref => {
    this.input = ref;
  };

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
    return value.toString();
  }

  handleChange = (value: any, event: React.SyntheticEvent<any>) => {
    if (!/^-?(?:\d+)?(\.)?(\d+)*$/.test(value) && value !== '') {
      return;
    }

    this.handleValue(value, event);
  };

  handleBlur = (event: React.SyntheticEvent<any>) => {
    const targetValue = Number.parseFloat(_.get(event, 'target.value'));
    this.handleValue(this.getSafeValue(targetValue), event);
  };
  handleWheel = (event: React.WheelEvent<any>) => {
    const { onWheel, disabled } = this.props;
    if (!disabled && event.target === document.activeElement) {
      event.preventDefault();
      const delta: number = _.get(event, 'wheelDelta') || -event.deltaY || -_.get(event, 'detail');

      if (delta > 0) {
        this.handleMinus(event);
      }
      if (delta < 0) {
        this.handlePlus(event);
      }
    }

    onWheel && onWheel(event);
  };

  handlePlus = (event: React.SyntheticEvent<any>) => {
    const { step } = this.props;
    const value = +(this.getValue() || 0);
    const bit = decimals(value, step);
    const nextValue = (value + step).toFixed(bit);

    this.handleValue(this.getSafeValue(nextValue), event);
  };
  handleMinus = (event: React.SyntheticEvent<any>) => {
    const { step } = this.props;
    const value = +(this.getValue() || 0);
    const bit = decimals(value, step);
    const nextValue = (value - step).toFixed(bit);

    this.handleValue(this.getSafeValue(nextValue), event);
  };
  handleValue(currentValue: number | string, event?: React.SyntheticEvent<any>) {
    const { value } = this.state;
    const { onChange, min, max } = this.props;

    if (currentValue !== value) {
      this.setState({
        ...getButtonStatus(currentValue, min, max),
        value: currentValue
      });

      onChange?.(currentValue, event);
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
        {prefixElement && <InputGroupAddon>{prefixElement}</InputGroupAddon>}
        <Input
          {...htmlInputProps}
          type="text"
          autoComplete="off"
          step={step}
          inputRef={this.bindInputRef}
          onChange={this.handleChange}
          onBlur={createChainedFunction(this.handleBlur, _.get(htmlInputProps, 'onBlur'))}
          value={_.isNil(value) ? '' : `${value}`}
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
        {postfix && <InputGroupAddon>{postfix}</InputGroupAddon>}
      </InputGroup>
    );
  }
}

polyfill(InputNumber);

export default defaultProps<InputNumberProps>({
  classPrefix: 'input-number'
})(InputNumber);
