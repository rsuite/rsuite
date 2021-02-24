import * as React from 'react';
import PropTypes from 'prop-types';
import { partitionHTMLProps, isIE } from '../utils';

const sizerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
};

const copyStyles = (styles: CSSStyleDeclaration, node: HTMLElement) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

export interface InputAutosizeProps {
  className?: string;
  defaultValue?: any;
  inputId?: string;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  minWidth?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: any;
  onAutosize?: (inputWidth: number) => void;
}

interface InputAutosizeState {
  inputId: string;
  inputWidth: number;
}

class InputAutosize extends React.Component<InputAutosizeProps, InputAutosizeState> {
  static propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    inputId: PropTypes.string,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object,
    minWidth: PropTypes.number,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.any,
    onAutosize: PropTypes.func
  };
  static defaultProps = {
    minWidth: 1
  };

  inputRef: React.RefObject<any>;
  sizerRef: React.RefObject<any>;
  placeHolderSizerRef: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.state = {
      inputId:
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 12),
      inputWidth: props.minWidth
    };

    this.inputRef = React.createRef();
    this.sizerRef = React.createRef();
    this.placeHolderSizerRef = React.createRef();
  }

  getInputInstance() {
    return this.inputRef.current;
  }

  getInputId = () => {
    return this.props.inputId || this.state.inputId;
  };

  componentDidMount() {
    this.copyInputStyles();
    this.updateInputWidth();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { inputWidth } = this.state;
    if (prevState.inputWidth !== inputWidth) {
      this.props.onAutosize?.(inputWidth);
    }
    this.updateInputWidth();
  }
  copyInputStyles() {
    if (!this.inputRef.current || !window.getComputedStyle) {
      return;
    }
    const inputStyles: CSSStyleDeclaration =
      this.inputRef.current && window.getComputedStyle(this.inputRef.current);
    if (!inputStyles) {
      return;
    }
    if (this.sizerRef.current) {
      copyStyles(inputStyles, this.sizerRef.current);
    }

    if (this.placeHolderSizerRef.current) {
      copyStyles(inputStyles, this.placeHolderSizerRef.current);
    }
  }
  updateInputWidth() {
    if (!this.sizerRef.current || typeof this.sizerRef.current.scrollWidth === 'undefined') {
      return;
    }
    const { minWidth, placeholder, value } = this.props;
    let newInputWidth: number;
    if (placeholder && !value && this.placeHolderSizerRef.current) {
      newInputWidth =
        Math.max(this.sizerRef.current.scrollWidth, this.placeHolderSizerRef.current.scrollWidth) +
        2;
    } else {
      newInputWidth = this.sizerRef.current.scrollWidth + 2;
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
    const inputId = this.getInputId();
    return isIE() ? (
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
      tabIndex
    } = this.props;

    const inputId = this.getInputId();
    const sizerValue = [defaultValue, value, ''].reduce((previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }
      return currentValue;
    });

    const wrapperStyle: React.CSSProperties = { ...style };
    if (!wrapperStyle.display) {
      wrapperStyle.display = 'inline-block';
    }

    const nextInputStyle: React.CSSProperties = {
      boxSizing: 'content-box',
      width: `${inputWidth}px`,
      ...inputStyle
    };

    const [htmlInputProps] = partitionHTMLProps(this.props);

    htmlInputProps.className = inputClassName;
    htmlInputProps.id = inputId || inputId;
    htmlInputProps.style = nextInputStyle;
    htmlInputProps.tabIndex = tabIndex;

    return (
      <div className={className} style={wrapperStyle}>
        {this.renderStyles()}
        <input {...htmlInputProps} ref={this.inputRef} type="text" />
        <div ref={this.sizerRef} style={sizerStyle}>
          {sizerValue}
        </div>
        {placeholder ? (
          <div ref={this.placeHolderSizerRef} style={sizerStyle}>
            {placeholder}
          </div>
        ) : null}
      </div>
    );
  }
}

export default InputAutosize;
