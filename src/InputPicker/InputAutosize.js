//@flow

import * as React from 'react';

import { isIE } from '../utils/BrowserDetection';
import { partitionHTMLProps } from '../utils';

const sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
};

const copyStyles = (styles: Object, node: HTMLElement) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

type Props = {
  className?: string,
  defaultValue?: any,
  inputId: string,
  inputClassName?: string,
  inputRef?: (ref: React.ElementRef<*>) => void,
  inputStyle?: Object,
  minWidth: number,
  onAutosize?: (inputWidth: number) => void,
  onChange?: Function,
  placeholder?: string,
  style?: Object,
  value?: any
};

type State = {
  inputWidth: number
};

class InputAutosize extends React.Component<Props, State> {
  static defaultProps = {
    minWidth: 1,
    inputId:
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 12)
  };

  mounted = null;
  input = null;
  placeHolderSizer = null;
  sizer = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputWidth: props.minWidth
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.copyInputStyles();
    this.updateInputWidth();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { inputWidth } = this.state;
    const { onAutosize } = this.props;
    if (prevState.inputWidth !== inputWidth) {
      onAutosize && onAutosize(inputWidth);
    }
    this.updateInputWidth();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  bindInputRef = (ref: React.ElementRef<*>) => {
    this.input = ref;
    const { inputRef } = this.props;
    inputRef && inputRef(ref);
  };
  focus() {
    if (this.input) {
      this.input.focus();
    }
  }
  blur() {
    if (this.input) {
      this.input.blur();
    }
  }
  bindPlaceHolderSizerRef = (ref: React.ElementRef<*>) => {
    this.placeHolderSizer = ref;
  };
  bindSizerRef = (ref: React.ElementRef<*>) => {
    this.sizer = ref;
  };

  copyInputStyles() {
    if (!this.mounted || !window.getComputedStyle) {
      return;
    }
    const inputStyles = this.input && window.getComputedStyle(this.input);
    if (!inputStyles) {
      return;
    }
    if (this.sizer) {
      copyStyles(inputStyles, this.sizer);
    }

    if (this.placeHolderSizer) {
      copyStyles(inputStyles, this.placeHolderSizer);
    }
  }
  updateInputWidth() {
    if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
      return;
    }
    const { minWidth, placeholder, value } = this.props;
    let newInputWidth: number;
    if (placeholder && !value && this.placeHolderSizer) {
      newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
    } else {
      newInputWidth = this.sizer.scrollWidth + 2;
    }

    if (newInputWidth < minWidth) {
      newInputWidth = minWidth;
    }
    if (newInputWidth !== this.state.inputWidth) {
      this.setState({
        inputWidth: newInputWidth
      });
    }
  }

  renderStyles() {
    const { inputId } = this.props;

    return isIE ? (
      <style
        dangerouslySetInnerHTML={{
          __html: `input#${inputId}::-ms-clear {display: none;}`
        }}
      />
    ) : null;
  }
  render() {
    const { inputWidth } = this.state;
    const {
      defaultValue,
      value,
      style,
      className,
      placeholder,
      inputClassName,
      inputStyle,
      inputId
    } = this.props;

    const sizerValue = [defaultValue, value, ''].reduce((previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }
      return currentValue;
    });

    const wrapperStyle = { ...style };
    if (!wrapperStyle.display) {
      wrapperStyle.display = 'inline-block';
    }

    const nextInputStyle = {
      boxSizing: 'content-box',
      width: `${inputWidth}px`,
      ...inputStyle
    };

    const [htmlInputProps] = partitionHTMLProps(this.props);

    htmlInputProps.className = inputClassName;
    htmlInputProps.id = inputId;
    htmlInputProps.style = nextInputStyle;

    return (
      <div className={className} style={wrapperStyle}>
        {this.renderStyles()}
        <input {...htmlInputProps} ref={this.bindInputRef} type="text" />
        <div ref={this.bindSizerRef} style={sizerStyle}>
          {sizerValue}
        </div>
        {placeholder ? (
          <div ref={this.bindPlaceHolderSizerRef} style={sizerStyle}>
            {placeholder}
          </div>
        ) : null}
      </div>
    );
  }
}

export default InputAutosize;
