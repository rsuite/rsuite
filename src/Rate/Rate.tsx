import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getOffsetParent, hasClass } from 'dom-lib';
import compose from 'recompose/compose';

import { defaultProps, prefix, getUnhandledProps, withStyleProps } from '../utils';
import { transformValueToCharacterMap, transformCharacterMapToValue } from './utils';
import shallowEqualArray from '../utils/shallowEqualArray';
import Icon from '../Icon';
import Character from './Character';
import { FormPlaintextContext } from '../Form/FormContext';

import { SIZE, KEY_CODE } from '../constants';
import { RateProps } from './Rate.d';

interface RateState {
  prevPropsValue: number;
  characterMap: number[];
}

class Rate extends React.Component<RateProps, RateState> {
  static propTypes = {
    allowHalf: PropTypes.bool,
    character: PropTypes.node,
    classPrefix: PropTypes.string,
    cleanable: PropTypes.bool,
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    renderCharacter: PropTypes.func,
    readOnly: PropTypes.bool,
    size: PropTypes.oneOf(SIZE),
    value: PropTypes.number,
    vertical: PropTypes.bool,
    onChange: PropTypes.func
  };
  static defaultProps = {
    character: <Icon icon="star" style={{ fontSize: 'inherit' }} />,
    cleanable: true,
    defaultValue: 0,
    max: 5,
    size: 'md'
  };

  static getDerivedStateFromProps(nextProps: RateProps, nextState: RateState) {
    const { value, max, allowHalf } = nextProps;
    const characterMap = transformValueToCharacterMap(value, max, allowHalf);
    if (typeof value !== 'undefined' && value !== nextState.prevPropsValue) {
      return { value, characterMap };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = props;
    const prevPropsValue = typeof value !== 'undefined' ? value : props.defaultValue;
    this.state = {
      prevPropsValue,
      characterMap: this.getCharacterMap(prevPropsValue)
    };
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  getValue() {
    const { value } = this.props;
    return typeof value === 'undefined' ? this.state.prevPropsValue : value;
  }

  getCharacterMap = (value: number) => {
    const { max, allowHalf } = this.props;
    return transformValueToCharacterMap(value, max, allowHalf);
  };

  resetCharacterMap = () => {
    this.setState({ characterMap: this.getCharacterMap(this.getValue()) });
  };

  handleMouseLeave = () => {
    this.resetCharacterMap();
  };

  handleChangeValue = (index: number, event: React.SyntheticEvent<HTMLElement>) => {
    const { allowHalf, cleanable, onChange } = this.props;
    const { characterMap } = this.state;
    const value = this.getValue();
    let nextValue = transformCharacterMapToValue(characterMap);

    if (
      cleanable &&
      value === nextValue &&
      this.getCharacterMap(value)[index] === characterMap[index]
    ) {
      nextValue = 0;
    }

    if (cleanable && value === 0) {
      nextValue =
        allowHalf &&
        hasClass(getOffsetParent(event.target), `${this.addPrefix('character-before')}`)
          ? index + 0.5
          : index + 1;
    }

    this.setState({ prevPropsValue: nextValue, characterMap: this.getCharacterMap(nextValue) });

    if (nextValue !== value) {
      onChange?.(nextValue, event);
    }
  };

  handleClick = (index: number, event: React.MouseEvent<HTMLElement>) => {
    this.handleChangeValue(index, event);
  };

  handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLElement>) => {
    const { keyCode } = event;
    const { max, allowHalf } = this.props;
    const { characterMap } = this.state;
    let nextValue = transformCharacterMapToValue(characterMap);

    if (keyCode === KEY_CODE.RIGHT && nextValue < max) {
      nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
    } else if (keyCode === KEY_CODE.LEFT && nextValue > 0) {
      nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
    }

    if (keyCode === KEY_CODE.ENTER) {
      this.handleChangeValue(index, event);
    }

    this.setState({ characterMap: this.getCharacterMap(nextValue) });
  };

  handleBeforeMouseMove = (index: number) => {
    if (!this.props.allowHalf) {
      return this.handleAfterMouseMove(index);
    }

    const { characterMap } = this.state;
    const nextCharacterMap = characterMap.map((_item, i) => {
      if (i === index) {
        return 0.5;
      }
      return i < index ? 1 : 0;
    });

    if (!shallowEqualArray(characterMap, nextCharacterMap)) {
      this.setState({ characterMap: nextCharacterMap });
    }
  };

  handleAfterMouseMove = (index: number) => {
    const { characterMap } = this.state;
    const nextCharacterMap = characterMap.map((_item, i) => (index < i ? 0 : 1));

    if (!shallowEqualArray(characterMap, nextCharacterMap)) {
      this.setState({ characterMap: nextCharacterMap });
    }
  };

  render() {
    const {
      character,
      className,
      classPrefix,
      disabled,
      max,
      renderCharacter,
      readOnly,
      vertical,
      ...rest
    } = this.props;

    const { characterMap } = this.state;
    const hoverValue = transformCharacterMapToValue(characterMap);
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('readonly')]: readOnly
    });
    const unhandled = getUnhandledProps(Rate, rest);
    const plaintextRate = (
      <div {...unhandled} className={className}>{`${this.getValue()}(${max})`}</div>
    );

    const rate = (
      <ul {...unhandled} className={classes} onMouseLeave={this.handleMouseLeave}>
        {characterMap.map((item, index) => (
          <Character
            key={index}
            status={item}
            disabled={disabled || readOnly}
            vertical={vertical}
            onClick={this.handleClick.bind(this, index)}
            onKeyDown={this.handleKeyDown.bind(this, index)}
            onBeforeMouseMove={this.handleBeforeMouseMove.bind(this, index)}
            onAfterMouseMove={this.handleAfterMouseMove.bind(this, index)}
          >
            {renderCharacter ? renderCharacter(hoverValue, index) : character}
          </Character>
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
