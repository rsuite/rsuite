import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import CloseButton from '../CloseButton';
import { useClassNames, KEY_VALUES, mergeRefs } from '../utils';
import { RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import Plaintext from '../Plaintext';
import useToggleCaret from '../utils/useToggleCaret';
import { IconProps } from '@rsuite/icons/lib/Icon';
import TextMask from '../MaskedInput/TextMask';
import deprecatePropType from '../utils/deprecatePropType';
import Loader from '../Loader';
import Stack from '../Stack';

type ValueType = string | number;

export interface PickerToggleProps extends ToggleButtonProps {
  value?: ValueType | ValueType[];
  inputValue?: ValueType | ValueType[];
  id?: string;
  hasValue?: boolean;
  cleanable?: boolean;
  caret?: boolean;
  active?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  tabIndex?: number;
  loading?: boolean;

  // Renders an input and is editable
  editable?: boolean;
  inputPlaceholder?: string;
  inputMask?: (string | RegExp)[];
  onInputChange?: (value: string, event: React.ChangeEvent) => void;
  onInputPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onInputBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onInputFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  placement?: TypeAttributes.Placement;
  /**
   * Custom caret component
   * @deprecated Use `caretAs` instead
   */
  caretComponent?: React.FC<IconProps>;

  /** Custom caret component */
  caretAs?: React.ElementType;
  onClean?: (event: React.MouseEvent) => void;
  label?: React.ReactNode;
}

const defaultInputMask = [];

const PickerToggle: RsRefForwardingComponent<typeof ToggleButton, PickerToggleProps> =
  React.forwardRef((props: PickerToggleProps, ref) => {
    const {
      active: activeProp,
      as: Component = ToggleButton,
      classPrefix = 'picker-toggle',
      children,
      caret = true,
      className,
      disabled,
      readOnly,
      plaintext,
      hasValue,
      editable,
      loading = false,
      cleanable: cleanableProp,
      tabIndex: tabIndexProp = editable ? -1 : 0,
      id,
      value,
      inputPlaceholder,
      inputValue: inputValueProp,
      inputMask = defaultInputMask,
      onInputChange,
      onInputPressEnter,
      onInputBlur,
      onInputFocus,
      onClean,
      onFocus,
      onBlur,
      placement = 'bottomStart',
      caretComponent,
      caretAs = caretComponent,
      label,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const comboboxRef = useRef<HTMLDivElement>(null);
    const [activeState, setActive] = useState(false);
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const getInputValue = useCallback(
      () =>
        typeof inputValueProp === 'undefined'
          ? Array.isArray(value)
            ? value.join(',')
            : value
          : inputValueProp,
      [inputValueProp, value]
    );
    const [inputValue, setInputValue] = useState(getInputValue);

    useEffect(() => {
      if (comboboxRef.current) {
        const value = getInputValue();
        setInputValue(value);
      }
    }, [getInputValue]);

    const classes = merge(className, withClassPrefix({ active: activeProp || activeState }));

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        if (!loading) {
          setActive(true);
        }

        if (editable) {
          // Avoid firing the onFocus event twice when DatePicker and DateRangePicker allow keyboard input.
          if (event.target === inputRef.current) {
            onFocus?.(event);
          }

          // Force the input to be focused and editable.
          if (document.activeElement === comboboxRef.current) {
            inputRef.current?.focus();
          }
        } else {
          onFocus?.(event);
        }
      },
      [editable, loading, onFocus]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        if (inputRef.current && !editable) {
          setActive(false);
        }

        // When activeElement is an input, it remains active.
        if (editable && inputRef.current && document.activeElement !== inputRef.current) {
          setActive(false);
        }

        onBlur?.(event);
      },
      [editable, onBlur]
    );

    const handleInputBlur = (event: React.FocusEvent<HTMLElement>) => {
      setInputValue(getInputValue());
      onInputBlur?.(event);
    };

    const handleClean = useCallback(
      (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        onClean?.(event);

        // When the value is cleared, the current component is still in focus.
        editable ? inputRef.current?.focus() : comboboxRef.current?.focus();
      },
      [editable, onClean]
    );

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target?.value;
        setInputValue(value);
        onInputChange?.(value, event);
      },
      [onInputChange]
    );

    const handleInputKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (editable && event.key === KEY_VALUES.ENTER) {
          onInputPressEnter?.(event);
        }
      },
      [onInputPressEnter, editable]
    );

    const renderInput = useCallback(
      (ref, props) => (
        <input
          ref={mergeRefs(inputRef, ref)}
          style={{ pointerEvents: editable ? undefined : 'none' }}
          {...props}
        />
      ),
      [editable]
    );

    const ToggleCaret = useToggleCaret(placement);
    const Caret = caretAs ?? ToggleCaret;

    if (plaintext) {
      return (
        <Plaintext ref={ref} localeKey="notSelected">
          {hasValue ? children : null}
        </Plaintext>
      );
    }

    const showCleanButton = cleanableProp && hasValue && !readOnly;

    // When the component is read-only or disabled, the input is not interactive.
    const inputFocused = readOnly || disabled ? false : editable && activeState;

    const tabIndex = disabled ? undefined : tabIndexProp;

    return (
      <Component
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={activeProp}
        aria-disabled={disabled}
        aria-owns={id ? `${id}-listbox` : undefined}
        {...rest}
        ref={mergeRefs(comboboxRef, ref)}
        disabled={disabled}
        tabIndex={tabIndex}
        className={classes}
        onFocus={!disabled ? handleFocus : null}
        // The debounce is set to 200 to solve the flicker caused by the switch between input and div.
        onBlur={!disabled ? debounce(handleBlur, 200) : null}
      >
        <Stack>
          {label && (
            <Stack.Item>
              <span className={prefix('label')}>{label}</span>
            </Stack.Item>
          )}
          <Stack.Item grow={1} style={{ overflow: 'hidden' }}>
            {loading ? (
              <Loader style={{ display: 'block', padding: '1px 0' }} data-testid="spinner" />
            ) : (
              <>
                <TextMask
                  mask={inputMask}
                  value={Array.isArray(inputValue) ? inputValue.toString() : inputValue}
                  onBlur={handleInputBlur}
                  onFocus={onInputFocus}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  id={id}
                  aria-hidden={!inputFocused}
                  readOnly={!inputFocused}
                  disabled={disabled}
                  aria-controls={id ? `${id}-listbox` : undefined}
                  tabIndex={editable ? 0 : -1}
                  className={prefix('textbox', { 'read-only': !inputFocused })}
                  placeholder={inputPlaceholder}
                  render={renderInput}
                />
                {children ? (
                  <span
                    className={prefix(hasValue ? 'value' : 'placeholder')}
                    aria-placeholder={typeof children === 'string' ? children : undefined}
                  >
                    {children}
                  </span>
                ) : null}
              </>
            )}
          </Stack.Item>
          {showCleanButton && (
            <CloseButton
              className={prefix`clean`}
              tabIndex={-1}
              locale={{ closeLabel: 'Clear' }}
              onClick={handleClean}
            />
          )}
          {caret && <Caret className={prefix`caret`} />}
        </Stack>
      </Component>
    );
  });

PickerToggle.displayName = 'PickerToggle';
PickerToggle.propTypes = {
  classPrefix: PropTypes.string,
  hasValue: PropTypes.bool,
  cleanable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  caret: PropTypes.bool,
  as: PropTypes.elementType,
  onClean: PropTypes.func,
  active: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  plaintext: PropTypes.bool,
  caretComponent: deprecatePropType(PropTypes.elementType, 'Use `caretAs` instead.'),
  caretAs: PropTypes.elementType
};

export default PickerToggle;
