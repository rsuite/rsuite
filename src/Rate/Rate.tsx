import * as React from 'react';
import { RateProps } from './Rate.d';
import _ from 'lodash';
import { getOffsetParent, hasClass } from 'dom-lib';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { defaultProps, prefix, getUnhandledProps, withStyleProps } from '../utils';
import { SIZE, KEY_CODE } from '../constants';
import { FormPlaintextContext } from '../Form/FormContext';
import Icon from '../Icon';
import { transformValueToCharacterValue, transformCharacterValueToValue } from './utils';
import shallowEqualArray from '../utils/shallowEqualArray';

interface RateStates {
  value: number;
  characterValue: number[];
}

export const ratePropTypes = {
  allowHalf: PropTypes.bool,
  character: PropTypes.node,
  classPrefix: PropTypes.string,
  cleanable: PropTypes.bool,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  renderCharacter: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.oneOf(SIZE),
  value: PropTypes.number,
  vertical: PropTypes.bool,
  onChange: PropTypes.func
};

class Rate extends React.Component<RateProps, RateStates> {
  static propTypes = ratePropTypes;
  static defaultProps = {
    character: <Icon icon="star" style={{ fontSize: 'inherit' }} />,
    cleanable: true,
    defaultValue: 0,
    max: 5,
    size: 'md'
  };

  constructor(props) {
    super(props);
    let { value } = props;
    if (value === undefined) {
      value = props.defaultValue;
    }

    this.state = {
      value,
      characterValue: this.getCharacterValue(value)
    };
  }

  getValue() {
    const { value } = this.props;
    return typeof value === 'undefined' ? this.state.value : value;
  }

  getCharacterValue = (value: number) => {
    const { max, allowHalf } = this.props;
    return transformValueToCharacterValue(value, max, allowHalf);
  };

  static getDerivedStateFromProps(nextProps: RateProps, nextState: RateStates) {
    const { value, max, allowHalf } = nextProps;
    const characterValue = transformValueToCharacterValue(value, max, allowHalf);
    if (nextProps.hasOwnProperty('value') && value !== nextState.value) {
      return { value, characterValue };
    }
    return null;
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  resetCharacterValue = () => {
    this.setState({ characterValue: this.getCharacterValue(this.getValue()) });
  };

  handleMouseLeave = () => {
    this.resetCharacterValue();
  };

  handleChangeValue = (index: number, event: React.SyntheticEvent<HTMLElement>) => {
    const { allowHalf, cleanable, onChange } = this.props;
    const { characterValue } = this.state;
    const value = this.getValue();
    let nextValue = transformCharacterValueToValue(characterValue);

    if (
      cleanable &&
      value === nextValue &&
      this.getCharacterValue(value)[index] === characterValue[index]
    ) {
      nextValue = 0;
    }

    if (cleanable && value === 0) {
      nextValue =
        allowHalf && hasClass(getOffsetParent(event.target), `${this.addPrefix('character-first')}`)
          ? index + 0.5
          : index + 1;
    }

    if (!this.props.hasOwnProperty('value')) {
      this.setState({ value: nextValue });
    }

    this.setState({ characterValue: this.getCharacterValue(nextValue) });

    nextValue !== value && onChange?.(nextValue, event);
  };

  handleClick = (index: number, event: React.MouseEvent<HTMLElement>) => {
    this.handleChangeValue(index, event);
  };

  handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLElement>) => {
    const { keyCode } = event;
    const { max, allowHalf } = this.props;
    const { characterValue } = this.state;
    let nextValue = transformCharacterValueToValue(characterValue);

    if (keyCode === KEY_CODE.RIGHT && nextValue < max) {
      nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
    } else if (keyCode === KEY_CODE.LEFT && nextValue > 0) {
      nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
    }

    if (keyCode === KEY_CODE.ENTER) {
      this.handleChangeValue(index, event);
    }

    this.setState({ characterValue: this.getCharacterValue(nextValue) });
  };

  handleFirstMouseEnter = index => {
    const { characterValue } = this.state;
    if (this.props.allowHalf) {
      const newCharacterValue = _.map(characterValue, (_item, itemIndex) => {
        if (itemIndex === index) {
          return 0.5;
        }
        return itemIndex < index ? 1 : 0;
      });
      !shallowEqualArray(characterValue, newCharacterValue) &&
        this.setState({ characterValue: newCharacterValue });
    } else {
      this.handleSecondMouseEnter(index);
    }
  };

  handleSecondMouseEnter = index => {
    const { characterValue } = this.state;
    const newCharacterValue = _.map(this.state.characterValue, (_item, itemIndex) =>
      index < itemIndex ? 0 : 1
    );
    !shallowEqualArray(characterValue, newCharacterValue) &&
      this.setState({ characterValue: newCharacterValue });
  };

  render() {
    const {
      character,
      className,
      classPrefix,
      disabled,
      max,
      renderCharacter,
      readonly,
      vertical,
      ...rest
    } = this.props;

    const { characterValue } = this.state;
    const hoverValue = transformCharacterValueToValue(characterValue);
    const interactive = !(disabled || readonly);

    const characterWrapperClass = classNames(classPrefix, className, {
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('readonly')]: readonly
    });

    const unhandled = getUnhandledProps(Rate, rest);

    const plaintextRate = (
      <div {...unhandled} className={className}>{`${this.getValue()}(${max})`}</div>
    );

    const rate = (
      <ul {...unhandled} className={characterWrapperClass} onMouseLeave={this.handleMouseLeave}>
        {_.map(characterValue, (item, index) => (
          <li
            key={index}
            className={classNames(this.addPrefix('character'), {
              [this.addPrefix('character-full')]: item === 1,
              [this.addPrefix('character-half')]: item === 0.5,
              [this.addPrefix('character-empty')]: item === 0
            })}
            tabIndex={0}
            onClick={interactive ? _.partial(this.handleClick, index) : undefined}
            onKeyDown={interactive ? _.partial(this.handleKeyDown, index) : undefined}
          >
            <div
              className={classNames(this.addPrefix('character-first'), {
                [this.addPrefix('character-vertical')]: vertical
              })}
              onMouseMove={interactive ? _.partial(this.handleFirstMouseEnter, index) : undefined}
            >
              {renderCharacter ? renderCharacter(hoverValue, index) : character}
            </div>
            <div
              className={this.addPrefix('character-second')}
              onMouseMove={interactive ? _.partial(this.handleSecondMouseEnter, index) : undefined}
            >
              {renderCharacter ? renderCharacter(hoverValue, index) : character}
            </div>
          </li>
        ))}
      </ul>
    );

    return (
      <FormPlaintextContext.Consumer>
        {plaintext => (plaintext ? plaintextRate : rate)}
      </FormPlaintextContext.Consumer>
    );
  }
}

export default compose<any, RateProps>(
  withStyleProps<RateProps>({
    hasSize: true,
    hasColor: true
  }),
  defaultProps<RateProps>({
    classPrefix: 'rate'
  })
)(Rate);
