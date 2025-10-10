'use client';
// Ref: https://reactjs.org/docs/events.html#detecting-focus-entering-and-leaving

/**
 * Whether the focus is moving inside of current element
 * @param event The `focus` event
 */
export function isFocusEntering(event) {
  return event.type === 'focus' && !event.currentTarget.contains(event.relatedTarget);
}

/**
 * Whether the focus is moving outside of current element
 * @param event The `blur` event
 */
export function isFocusLeaving(event) {
  return event.type === 'blur' && !event.currentTarget.contains(event.relatedTarget);
}