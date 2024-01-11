import React, { useState, useCallback, useEffect, useRef } from 'react';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import { useClassNames, mergeRefs } from '../utils';
import { RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import Plaintext from '../Plaintext';
import useToggleCaret from '../utils/useToggleCaret';
import { IconProps } from '@rsuite/icons/lib/Icon';
import TextMask from '../MaskedInput/TextMask';
import Stack from '../Stack';
import PickerIndicator from './PickerIndicator';
import PickerLabel from './PickerLabel';

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

  /** Whether to display an loading indicator on toggle button */
  loading?: boolean;

  // Renders an input and is editable
  editable?: boolean;
  name?: string;

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

const PickerToggle: RsRefForwardingComponent<typeof ToggleButton, PickerToggleProps> =
  React.forwardRef((props: PickerToggleProps, ref) => {
    const {
      active,
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
      inputValue: inputValueProp,
      onClean,

      placement = 'bottomStart',
      caretComponent,
      caretAs = caretComponent,
      label,
      name,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const comboboxRef = useRef<HTMLDivElement>(null);
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

    const classes = merge(className, withClassPrefix({ active }));

    const handleInputBlur = () => {
      setInputValue(getInputValue());
    };

    const handleClean = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        onClean?.(event);

        // When the value is cleared, the current component is still in focus.
        editable ? inputRef.current?.focus() : comboboxRef.current?.focus();
      },
      [editable, onClean]
    );

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target?.value;
      setInputValue(value);
    }, []);

    const renderInput = useCallback(
      (ref, props) => (
        <input
          type="text"
          autoComplete="off"
          ref={mergeRefs(inputRef, ref)}
          name={name}
          style={{ pointerEvents: editable ? undefined : 'none' }}
          {...props}
        />
      ),
      [editable, name]
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
    const inputFocused = readOnly || disabled ? false : editable;

    const tabIndex = disabled ? undefined : tabIndexProp;

    return (
      <Component
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={active}
        aria-disabled={disabled}
        aria-owns={id ? `${id}-listbox` : undefined}
        {...rest}
        ref={mergeRefs(comboboxRef, ref)}
        disabled={disabled}
        tabIndex={tabIndex}
        className={classes}
      >
        <Stack>
          {label && (
            <Stack.Item>
              <PickerLabel
                as="span"
                className={prefix('label')}
                id={id ? `${id}-label` : undefined}
              >
                {label}
              </PickerLabel>
            </Stack.Item>
          )}
          <Stack.Item grow={1} style={{ overflow: 'hidden' }}>
            <TextMask
              aria-hidden={!inputFocused}
              aria-controls={id ? `${id}-listbox` : undefined}
              aria-labelledby={label ? `${id}-label` : undefined}
              mask={[]}
              value={Array.isArray(inputValue) ? inputValue.toString() : inputValue}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              id={id}
              readOnly={!inputFocused}
              disabled={disabled}
              tabIndex={editable ? 0 : -1}
              className={prefix('textbox', { 'read-only': !inputFocused })}
              render={renderInput}
              data-testid="picker-toggle-input"
            />
            {children ? (
              <span
                className={prefix(hasValue ? 'value' : 'placeholder')}
                aria-placeholder={typeof children === 'string' ? children : undefined}
              >
                {children}
              </span>
            ) : null}
          </Stack.Item>

          <Stack.Item className={prefix`indicator`}>
            <PickerIndicator
              as={React.Fragment}
              loading={loading}
              caretAs={caret ? Caret : null}
              onClose={handleClean}
              showCleanButton={showCleanButton}
            />
          </Stack.Item>
        </Stack>
      </Component>
    );
  });

PickerToggle.displayName = 'PickerToggle';

export default PickerToggle;
