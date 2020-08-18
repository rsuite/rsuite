import React, { useState, useRef, useImperativeHandle, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { partitionHTMLProps, isIE, guid } from '../utils';

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
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onAutosize?: (inputWidth: number) => void;
}

export interface InputInstance {
  root: HTMLDivElement;
  input: HTMLInputElement;
}

/**
 * Use a dynamic input width.
 * The width is automatically adjusted according to the length of the input text characters.
 * @param props
 * @param sizerRef
 * @param placeholderRef
 */
const useInputWidth = (
  props: Partial<InputAutosizeProps>,
  sizerRef: React.RefObject<HTMLDivElement>,
  placeholderRef: React.RefObject<HTMLDivElement>
) => {
  const { minWidth, placeholder, value, onAutosize } = props;
  const [inputWidth, setInputWidth] = useState(minWidth);

  useEffect(() => {
    if (!sizerRef.current || typeof sizerRef.current.scrollWidth === 'undefined') {
      return;
    }

    let width = minWidth;
    if (placeholder && !value && placeholderRef.current) {
      width = Math.max(sizerRef.current.scrollWidth, placeholderRef.current.scrollWidth) + 2;
    } else {
      width = sizerRef.current.scrollWidth + 2;
    }

    if (width < minWidth) {
      width = minWidth;
    }

    if (width !== inputWidth) {
      setInputWidth(width);
      onAutosize?.(width);
    }
  }, [minWidth, placeholder, inputWidth, value, placeholderRef, sizerRef, onAutosize]);

  return inputWidth;
};

const InputAutosize = React.forwardRef(
  (props: InputAutosizeProps, ref: React.Ref<InputInstance>) => {
    const uniqueId = useMemo(() => guid(), []);
    const {
      defaultValue,
      value,
      style,
      className,
      placeholder,
      inputClassName,
      inputStyle,
      inputId = uniqueId
    } = props;

    const rootRef = useRef();
    const inputRef = useRef();
    const sizerRef = useRef();
    const placeholderRef = useRef();

    useImperativeHandle(ref, () => ({
      root: rootRef.current,
      input: inputRef.current
    }));

    const sizerValue = [defaultValue, value, ''].reduce((previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }
      return currentValue;
    });

    const inputWidth = useInputWidth(props, sizerRef, placeholderRef);
    const wrapperStyle: React.CSSProperties = { display: 'inline-block', ...style };
    const nextInputStyle: React.CSSProperties = {
      boxSizing: 'content-box',
      width: `${inputWidth}px`,
      ...inputStyle
    };

    useEffect(() => {
      if (!window.getComputedStyle) {
        return;
      }

      const input = inputRef.current;
      const inputStyles: CSSStyleDeclaration = input && window.getComputedStyle(input);
      if (!inputStyles) {
        return;
      }

      copyStyles(inputStyles, sizerRef.current);
      if (placeholderRef.current) {
        copyStyles(inputStyles, placeholderRef.current);
      }
    }, []);

    const [htmlInputProps] = partitionHTMLProps(props);

    htmlInputProps.className = inputClassName;
    htmlInputProps.style = nextInputStyle;

    if (isIE()) {
      // On Internet Explorer, an `x` symbol will appear in the input box.
      // By setting an id, matching the style, hiding the `x` symbol by the style.
      htmlInputProps.id = inputId;
    }

    return (
      <div ref={rootRef} className={className} style={wrapperStyle}>
        {isIE() ? (
          <style
            dangerouslySetInnerHTML={{ __html: `input#${inputId}::-ms-clear {display: none;}` }}
          />
        ) : null}
        <input {...htmlInputProps} ref={inputRef} type="text" />
        <div ref={sizerRef} style={sizerStyle}>
          {sizerValue}
        </div>
        {placeholder ? (
          <div ref={placeholderRef} style={sizerStyle}>
            {placeholder}
          </div>
        ) : null}
      </div>
    );
  }
);

InputAutosize.displayName = 'InputAutosize';
InputAutosize.propTypes = {
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
InputAutosize.defaultProps = {
  minWidth: 1
};

export default InputAutosize;
