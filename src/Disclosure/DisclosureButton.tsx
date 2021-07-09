import React, { useCallback, useContext, useRef } from 'react';
import DisclosureContext, { DisclosureActionTypes } from './DisclosureContext';

export interface DisclosureButtonRenderProps {
  open: boolean;
}

export interface DisclosureButtonProps {
  children: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & DisclosureButtonRenderProps,
    ref: React.Ref<HTMLButtonElement>
  ) => React.ReactElement<React.HTMLAttributes<HTMLButtonElement>>;
}

function DisclosureButton(props: DisclosureButtonProps) {
  const { children } = props;

  const buttonRef = useRef<HTMLButtonElement>();

  const [{ open }, dispatch] = useContext(DisclosureContext);

  const onClick = useCallback(() => {
    if (!open) {
      dispatch({ type: DisclosureActionTypes.Show });
    } else {
      dispatch({ type: DisclosureActionTypes.Hide });
    }
  }, [open, dispatch]);

  return children({ role: 'button', 'aria-expanded': open, onClick, open }, buttonRef);
}

DisclosureButton.displayName = 'Disclosure.Button';

export default DisclosureButton;
