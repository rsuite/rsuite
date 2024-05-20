import React, { useCallback, useRef } from 'react';
import { DisclosureActionTypes } from './DisclosureContext';
import { KEY_VALUES } from '../constants';
import useDisclosureContext from './useDisclosureContext';

export interface DisclosureButtonRenderProps {
  open: boolean;
}

export interface DisclosureButtonProps {
  children: (
    props: React.HTMLAttributes<HTMLElement> & DisclosureButtonRenderProps,
    ref: React.Ref<HTMLElement>
  ) => React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

function DisclosureButton(props: DisclosureButtonProps) {
  const { children } = props;

  const buttonRef = useRef<HTMLElement>(null);

  const [{ open }, dispatch, { onToggle }] = useDisclosureContext(DisclosureButton.displayName);

  const toggle = useCallback(
    (event: React.SyntheticEvent) => {
      if (!open) {
        dispatch({ type: DisclosureActionTypes.Show });
        onToggle?.(true, event);
      } else {
        dispatch({ type: DisclosureActionTypes.Hide });
        onToggle?.(false, event);
      }
    },
    [open, dispatch, onToggle]
  );

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      toggle(event);
    },
    [toggle]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case KEY_VALUES.ENTER:
        case KEY_VALUES.SPACE:
          event.preventDefault();
          event.stopPropagation();
          toggle(event);
          break;
      }
    },
    [toggle]
  );

  return children({ role: 'button', 'aria-expanded': open, onClick, onKeyDown, open }, buttonRef);
}

DisclosureButton.displayName = 'Disclosure.Button';

export default DisclosureButton;
