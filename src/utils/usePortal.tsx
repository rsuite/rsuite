import React, { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import helper from '../DOMHelper';

interface PortalProps {
  id?: string;
  container?: HTMLElement | (() => HTMLElement);
}

function usePortal({ id, container }: PortalProps) {
  const rootElemRef = useRef(
    helper.canUseDOM ? document.createElement('div') : null
  ) as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const containerElement = typeof container === 'function' ? container() : container;

    // Look for existing target dom element to append to
    const existingParent = id && document.querySelector(`#${id}`);

    // Parent is either a new root or the existing dom element
    const parentElement = containerElement || existingParent || document.body;

    // Add the detached element to the parent
    parentElement.appendChild(rootElemRef.current);

    return () => {
      rootElemRef.current?.remove();
    };
  }, [rootElemRef, container]);

  const Portal = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (rootElemRef.current != null) return createPortal(children, rootElemRef.current);
      return null;
    },
    [rootElemRef]
  );

  return { target: rootElemRef.current, Portal };
}

export default usePortal;
