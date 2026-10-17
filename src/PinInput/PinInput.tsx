/* @jsxRuntime classic */
import React, { KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import Input from '../Input';
import usePinInputRefs from './hooks/usePinInputRefs';
import usePinValue from './hooks/usePinValue';
import { Box, BoxProps } from '@/internals/Box';
import { HStack } from '../Stack';
import { forwardRef, isComposingEvent } from '@/internals/utils';
import { useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import type { BasicSize } from '@/internals/types';

/**
 * Map `type` prop to regex for allowed keys
 */
function getAllowedKeys(type: PinInputProps['type']): RegExp {
  if (type instanceof RegExp) {
    // Each character is a separate match; keep the supplied RegExp state untouched.
    return new RegExp(type.source, type.flags.replace(/[gy]/g, ''));
  }
  switch (type) {
    case 'alphabetic':
      return /[A-Za-z]/;
    case 'alphanumeric':
      return /[A-Za-z0-9]/;
    default:
      // number and any other fallback
      return /\d/;
  }
}

export interface PinInputProps extends BoxProps {
  /** Whether input fields are attached (no gap between) */
  attached?: boolean;

  /** Whether to auto-focus the first input on mount */
  autoFocus?: boolean;

  /** Type of allowed input: number, alphabetic, alphanumeric, or custom regex */
  type?: 'number' | 'alphabetic' | 'alphanumeric' | RegExp;

  /** Default PIN value */
  defaultValue?: string;

  /** Whether to disable PIN input */
  disabled?: boolean;

  /** Number of PIN digits */
  length?: number;

  /** Whether to mask PIN input (like password) */
  mask?: boolean;

  /** Name for form submission */
  name?: string;

  /** Whether to optimize for one-time password (OTP) input */
  otp?: boolean;

  /** Placeholder for input fields */
  placeholder?: string;

  /** Whether the input is read-only */
  readOnly?: boolean;

  /** Input size */
  size?: BasicSize;

  /** PIN value */
  value?: string;

  /** Callback function when PIN input is completed */
  onComplete?: (value: string) => void;

  /** Callback function when PIN value changes */
  onChange?: (value: string) => void;
}

const PinInput = forwardRef<'div', PinInputProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('PinInput', props);
  const {
    type = 'number',
    as,
    autoFocus,
    attached,
    className,
    classPrefix = 'pin-input',
    defaultValue = '',
    disabled,
    length = 4,
    mask,
    name,
    otp,
    placeholder,
    readOnly,
    size = 'md',
    value: controlValue,
    onChange,
    onComplete,
    ...rest
  } = propsWithDefaults;

  // Regex for filtering input chars based on type prop
  const allowedKeys = getAllowedKeys(type);

  // Determine inputMode based on type prop
  const inputModeValue = type === 'number' ? 'numeric' : 'text';

  // Determine input type attribute based on type prop and mask
  const inputTypeValue = mask ? 'password' : type === 'number' ? 'tel' : 'text';

  const { withPrefix, prefix, merge } = useStyles(classPrefix);

  // Use our custom hook for handling input refs and focus behavior
  const { focusInput, focusNextInput, focusPrevInput, getRefSetter } = usePinInputRefs(
    length,
    autoFocus
  );

  // Use our custom hook for managing PIN values
  const { valueArray, setDigit, clearDigit, updateValue } = usePinValue(
    controlValue,
    defaultValue,
    length,
    onChange,
    onComplete
  );

  const filterCharacters = (value: string) =>
    value.split('').filter(char => allowedKeys.test(char));

  const fillInputs = useEventCallback((characters: string[], index: number) => {
    if (characters.length === 0) return;

    const newValueArray = [...valueArray];
    for (let i = 0; i < characters.length && index + i < length; i++) {
      newValueArray[index + i] = characters[i];
    }
    updateValue(newValueArray.join(''));

    return Math.min(index + characters.length, length - 1);
  });

  // Handle input change
  const handleInputChange = useEventCallback(
    (inputValue: string, e: ChangeEvent<HTMLInputElement>, index: number) => {
      // Safety check for event object
      if (!e || !e.target) return;

      if (inputValue.length > 1) {
        const characters = filterCharacters(inputValue);
        // A complete autofilled OTP replaces the code even when another segment is focused.
        const startIndex = otp && characters.length >= length ? 0 : index;
        const nextIndex = fillInputs(characters, startIndex);
        if (nextIndex !== undefined) focusInput(nextIndex);
        return;
      }

      const char = inputValue;

      // Filter by allowedKeys if provided
      if (char && !allowedKeys.test(char)) {
        return;
      }

      // Always allow overwriting the current value
      // Update the value using our hook
      setDigit(index, char);

      // Focus the next input if we have a character and there's a next input
      if (char && index < length - 1) {
        // Use setTimeout to ensure the focus happens after the current event cycle
        focusNextInput(index);
      }

      // If this is the last input and a character was entered, keep focus on it
      if (char && index === length - 1) {
        focusInput(index);
      }
    }
  );

  // Handle key down
  const handleKeyDown = useEventCallback((e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Safety check for event object
    if (!e || e.defaultPrevented || isComposingEvent(e)) return;

    const target = e.target as HTMLInputElement;
    const inputValue = target?.value || '';

    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (inputValue === '') {
        // Focus the previous input if the current one is empty
        if (index > 0) {
          clearDigit(index - 1);
          focusPrevInput(index);
        }
      } else {
        // Clear the current input but keep focus on it
        clearDigit(index);
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft') {
      focusPrevInput(index);
    } else if (e.key === 'ArrowRight') {
      focusNextInput(index);
    }
    // Allow only keys matching allowedKeys
    else if (
      Array.from(e.key).length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      allowedKeys.test(e.key)
    ) {
      // Let the native input event commit the character once, including in Firefox.
      // Selecting the current digit allows native typing to overwrite a filled slot.
      e.currentTarget.select();
    }
  });

  // Handle paste
  const handlePaste = useEventCallback((e: ClipboardEvent<HTMLInputElement>, index: number) => {
    if (disabled || readOnly) return;

    // Safety check for event object
    if (!e || !e.clipboardData) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text') || '';

    const nextIndex = fillInputs(filterCharacters(pastedData), index);
    if (nextIndex !== undefined) {
      // Use setTimeout to ensure focus happens after DOM updates
      setTimeout(() => {
        focusInput(nextIndex);
      }, 10);
    }
  });

  const classes = merge(className, withPrefix({ attached }));

  return (
    <Box as={as} ref={ref} className={classes} {...rest}>
      <input type="hidden" value={valueArray.join('')} name={name} aria-label="Pin input" />
      <HStack spacing={attached ? 0 : 8}>
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            className={prefix('segment', { masked: mask })}
            size={size}
            value={valueArray[index] || ''}
            onChange={(v, e) => handleInputChange(v, e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={e => handlePaste(e, index)}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={1}
            autoComplete={otp ? 'one-time-code' : 'off'}
            inputMode={inputModeValue}
            placeholder={placeholder}
            type={inputTypeValue}
            ref={getRefSetter(index)}
          />
        ))}
      </HStack>
    </Box>
  );
});

PinInput.displayName = 'PinInput';

export default PinInput;
