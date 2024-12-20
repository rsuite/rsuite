import React, { useState, useRef, useImperativeHandle, useEffect, useMemo } from 'react';
import { partitionHTMLProps, isIE, guid } from '@/internals/utils';

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
  tabIndex?: number;
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
  const { minWidth = 1, placeholder, value, onAutosize } = props;
  const [inputWidth, setInputWidth] = useState(minWidth);

  useEffect(() => {
    if (!sizerRef.current || typeof sizerRef.current.scrollWidth === 'undefined') {
      return;
    }

    let width: number;
    if (placeholder && !value && placeholderRef.current) {
      width = Math.max(sizerRef.current.scrollWidth, placeholderRef.current.scrollWidth) + 10;
    } else {
      width = sizerRef.current.scrollWidth + 10;
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
      inputId = uniqueId,
      tabIndex
    } = props;

    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const sizerRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      root: rootRef.current as HTMLDivElement,
      input: inputRef.current as HTMLInputElement
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
      const inputStyles: CSSStyleDeclaration | null = input && window.getComputedStyle(input);
      if (!inputStyles) {
        return;
      }

      if (sizerRef.current) {
        copyStyles(inputStyles, sizerRef.current);
      }

      if (placeholderRef.current) {
        copyStyles(inputStyles, placeholderRef.current);
      }
    }, []);

    const [htmlInputProps] = partitionHTMLProps(props);

    htmlInputProps.className = inputClassName;
    htmlInputProps.style = nextInputStyle;
    htmlInputProps.tabIndex = tabIndex;

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

export default InputAutosize;
