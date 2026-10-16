import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

export function isComposingEvent(event: KeyboardEvent | ReactKeyboardEvent): boolean {
  const nativeEvent = 'nativeEvent' in event ? event.nativeEvent : event;

  // Composition boundary keydowns may only carry the legacy IME keyCode.
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}
