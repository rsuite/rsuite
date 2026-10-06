import React, { useRef } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';

interface Activation {
  sequence: number;
  input: HTMLInputElement;
  nativeClick: MouseEvent;
  beforeChecked: boolean;
  checkedAtClick: boolean;
  handled: boolean;
}

interface Options {
  inputRef: React.RefObject<HTMLInputElement | null>;
  controlled: boolean;
  locked: boolean;
  setChecked: (checked: boolean) => void;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: React.InputHTMLAttributes<HTMLInputElement>['onInput'];
}

function useToggleInputActivation({
  inputRef,
  controlled,
  locked,
  setChecked,
  onChange,
  onInput
}: Options) {
  const sequence = useRef(0);
  const activation = useRef<Activation | null>(null);
  const expiry = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearActivation = useEventCallback(() => {
    if (expiry.current !== null) {
      clearTimeout(expiry.current);
      expiry.current = null;
    }
    activation.current = null;
  });

  const admitActivation = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    clearActivation();
    const nextSequence = ++sequence.current;
    const input = event.currentTarget;
    if (
      controlled ||
      locked ||
      inputRef.current !== input ||
      event.target !== input ||
      event.nativeEvent.target !== input
    ) {
      return;
    }

    // Checkbox pre-activation has already toggled the native checkedness.
    activation.current = {
      sequence: nextSequence,
      input,
      nativeClick: event.nativeEvent,
      beforeChecked: !input.checked,
      checkedAtClick: input.checked,
      handled: false
    };
    expiry.current = setTimeout(() => {
      if (activation.current?.sequence === nextSequence) {
        activation.current = null;
        expiry.current = null;
      }
    }, 0);
  });

  const markPrimaryHandled = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const current = activation.current;
    if (
      current &&
      inputRef.current === current.input &&
      event.nativeEvent === current.nativeClick
    ) {
      current.handled = true;
    }
  });

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const callerOnInput = onInput;
      const current = activation.current;
      const input = event.currentTarget;
      if (
        current?.input === input &&
        inputRef.current === input &&
        current.sequence === sequence.current &&
        event.target === input &&
        event.nativeEvent.target === input &&
        event.nativeEvent.type === 'input' &&
        event.nativeEvent.isTrusted
      ) {
        const nextChecked = input.checked;
        const shouldNotify =
          !current.handled &&
          !current.nativeClick.defaultPrevented &&
          !controlled &&
          !locked &&
          nextChecked !== current.beforeChecked &&
          nextChecked === current.checkedAtClick;

        // Input events have no click identity. Consume this scoped association
        // before callbacks so a reentrant activation can keep its own sequence.
        clearActivation();
        if (shouldNotify) {
          setChecked(nextChecked);
          onChange?.(nextChecked, event);
        }
      }
      callerOnInput?.(event);
    }
  );

  useIsomorphicLayoutEffect(() => {
    if (activation.current && activation.current.input !== inputRef.current) {
      clearActivation();
    }
  });

  useIsomorphicLayoutEffect(() => () => clearActivation(), []);

  return { admitActivation, markPrimaryHandled, handleInput };
}

export default useToggleInputActivation;
