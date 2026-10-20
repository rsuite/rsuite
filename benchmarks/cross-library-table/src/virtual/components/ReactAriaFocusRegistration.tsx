import { useContext, useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { TableStateContext } from 'react-aria-components/Table';
import type { TableState } from 'react-aria-components/Table';
export default function ReactAriaFocusRegistration({
  stateRef
}: {
  stateRef: RefObject<TableState<unknown> | null>;
}) {
  const state = useContext(TableStateContext);
  useLayoutEffect(() => {
    stateRef.current = state;
    return () => {
      if (stateRef.current === state) stateRef.current = null;
    };
  }, [state, stateRef]);
  return null;
}
