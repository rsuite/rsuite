import {
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type FormEvent,
  type MouseEvent,
  type RefObject
} from 'react';
import useEventCallback from '@/internals/hooks/useEventCallback';
import useNativeFormReset from '@/internals/hooks/useNativeFormReset';

interface Options {
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function useUploadInput({ disabled, readOnly, onChange }: Options) {
  // A snapshot must not keep a removed input or its files alive.
  const [previousFiles] = useState(() => new WeakMap<HTMLInputElement, FileList | null>());
  const inputRef: RefObject<HTMLInputElement | null> = useNativeFormReset(() => {
    const input = inputRef.current;
    if (input) previousFiles.delete(input);
  });

  const isUnavailable = (input: HTMLInputElement) =>
    disabled || readOnly || input.readOnly || input.matches(':disabled');

  const open = useEventCallback(() => {
    const input = inputRef.current;
    if (input && !isUnavailable(input)) input.click();
  });

  const clear = useEventCallback(() => {
    const input = inputRef.current;
    if (input) {
      input.value = '';
      previousFiles.delete(input);
    }
  });

  const handleClick = useEventCallback((event: MouseEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    // File inputs do not implement the native readOnly attribute.
    if (isUnavailable(input)) event.preventDefault();
    else previousFiles.set(input, input.files);
  });

  const restore = (input: HTMLInputElement) => {
    const files = previousFiles.get(input);
    if (files) input.files = files;
    else input.value = '';
  };

  const handleInput = useEventCallback((event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (isUnavailable(input)) {
      restore(input);
      event.stopPropagation();
    }
  });

  const handleChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (isUnavailable(input)) {
      // The picker may finish after the control becomes unavailable.
      restore(input);
      event.stopPropagation();
      return;
    }

    try {
      onChange?.(event);
    } finally {
      // The consumer may have cleared the input while handling the change.
      previousFiles.set(input, input.files);
    }
  });

  return { inputRef, open, clear, handleClick, handleInput, handleChange };
}
