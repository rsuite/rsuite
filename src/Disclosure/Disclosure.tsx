// Headless Disclosure
// Ref: https://w3c.github.io/aria-practices/#disclosure

import React, { useReducer, useRef } from 'react';
import DisclosureContext, {
  DisclosureAction,
  DisclosureActionTypes,
  DisclosureState
} from './DisclosureContext';
import DisclosureButton from './DisclosureButton';
import DisclosureContent from './DisclosureContent';
import useClickOutside from '../utils/useClickOutside';

export interface DisclosureRenderProps {
  open: boolean;
}

export interface DisclosureProps {
  children: (props: DisclosureRenderProps, ref: React.Ref<HTMLElement>) => React.ReactNode;

  hideOnClickOutside?: boolean;
}

const initialDisclosureState: DisclosureState = {
  open: false
};

function disclosureReducer(state: DisclosureState, action: DisclosureAction): DisclosureState {
  switch (action.type) {
    case DisclosureActionTypes.Show:
      return { ...state, open: true };
    case DisclosureActionTypes.Hide:
      return { ...state, open: false };
  }
  return state;
}

function Disclosure(props: DisclosureProps) {
  const { children, hideOnClickOutside = false } = props;

  const disclosure = useReducer(disclosureReducer, initialDisclosureState);

  const containerElementRef = useRef<HTMLElement>();

  const [{ open }, dispatch] = disclosure;

  useClickOutside({
    enabled: hideOnClickOutside,
    isOutside: event => !containerElementRef.current.contains(event.target as HTMLElement),
    handle: () => dispatch({ type: DisclosureActionTypes.Hide })
  });

  return (
    <DisclosureContext.Provider value={disclosure}>
      {children({ open }, containerElementRef)}
    </DisclosureContext.Provider>
  );
}

Disclosure.Button = DisclosureButton;
Disclosure.Content = DisclosureContent;

export default Disclosure;
