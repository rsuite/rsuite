import React, { useState, useCallback } from 'react';

interface FocusEventOptions {
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export function useIsFocused({
  onFocus: onFocusProp,
  onBlur: onBlurProp
}: FocusEventOptions): [boolean, FocusEventOptions] {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocusProp?.(event);
    },
    [onFocusProp]
  );

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlurProp?.(event);
    },
    [onBlurProp]
  );

  return [isFocused, { onFocus, onBlur }];
}

export default useIsFocused;
