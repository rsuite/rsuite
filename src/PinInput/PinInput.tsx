import React, { KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import Input from '../Input';
import usePinInputRefs from './hooks/usePinInputRefs';
import usePinValue from './hooks/usePinValue';
import { Box, BoxProps } from '@/internals/Box';
import { HStack } from '../Stack';
import { forwardRef } from '@/internals/utils';
import { useStyles, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { BasicSize } from '@/internals/types';

export interface PinInputProps extends BoxProps {
  /** Whether input fields are attached (no gap between) */
  attached?: boolean;

  /** Whether to auto-focus the first input on mount */
  autoFocus?: boolean;

  /** Pattern for allowed input characters */
  allowedKeys?: RegExp;

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
    allowedKeys = /\d/,
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

  // Handle input change
  const handleInputChange = useEventCallback(
    (inputValue: string, e: ChangeEvent<HTMLInputElement>, index: number) => {
      // Safety check for event object
      if (!e || !e.target) return;

      // For single character input, use it directly
      // For longer input (like paste or browser autofill), take the last character
      const char = inputValue.length > 0 ? inputValue.charAt(inputValue.length - 1) : '';

      // Filter by allowedKeys if provided
      if (allowedKeys && !allowedKeys.test(char)) {
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
    if (!e) return;

    const target = e.target as HTMLInputElement;
    const inputValue = target?.value || '';

    // Handle backspace
    if (e.key === 'Backspace') {
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
    else if (allowedKeys.test(e.key)) {
      setDigit(index, e.key);

      // Move focus to the next input if there is one
      if (index < length - 1) {
        setTimeout(() => {
          focusNextInput(index);
        }, 10);
      }
    }
  });

  // Handle paste
  const handlePaste = useEventCallback((e: ClipboardEvent<HTMLInputElement>, index: number) => {
    if (disabled || readOnly) return;

    // Safety check for event object
    if (!e || !e.clipboardData) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text') || '';

    // Filter pasted data by allowedKeys
    const filteredData = pastedData
      .split('')
      .filter(ch => allowedKeys.test(ch))
      .join('');

    if (filteredData) {
      // Create a new value with pasted characters
      const newValueArray = [...valueArray];
      for (let i = 0; i < filteredData.length && index + i < length; i++) {
        newValueArray[index + i] = filteredData[i];
      }

      // Update value with our hook
      updateValue(newValueArray.join(''));

      // Focus the input after the last pasted character or the last input
      // Use setTimeout to ensure focus happens after DOM updates
      const nextIndex = Math.min(index + filteredData.length, length - 1);
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
            inputMode="text"
            placeholder={placeholder}
            type={mask ? 'password' : 'text'}
            ref={getRefSetter(index)}
          />
        ))}
      </HStack>
    </Box>
  );
});

PinInput.displayName = 'PinInput';

export default PinInput;
