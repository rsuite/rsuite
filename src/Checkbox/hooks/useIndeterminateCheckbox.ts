import { useLayoutEffect, useRef } from 'react';

/**
 * A hook that manages the indeterminate state of a checkbox input element.
 *
 * The indeterminate state is a visual and accessibility state that cannot be set via HTML attributes.
 * It must be set via JavaScript on the DOM element itself. This is required for proper
 * screen reader support, as assistive technologies rely on the native DOM property
 * rather than ARIA attributes for native checkboxes.
 *
 * @param indeterminate - Whether the checkbox should be in an indeterminate state
 * @returns A ref object to be attached to the checkbox input element
 *
 * @example
 * ```tsx
 * const checkboxRef = useIndeterminateCheckbox(isIndeterminate);
 * return <input type="checkbox" ref={checkboxRef} />;
 * ```
 */
export function useIndeterminateCheckbox(
  indeterminate?: boolean
): React.MutableRefObject<HTMLInputElement | null> {
  const ref = useRef<HTMLInputElement | null>(null);

  // The input can be recreated without changing the prop, for example after plaintext mode.
  // Synchronize each commit so newly attached inputs receive the current state before paint.
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  });

  return ref;
}
