import React, { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import canUseDOM from 'dom-lib/canUseDOM';

interface PortalProps {
  id?: string;
  container?: HTMLElement | (() => HTMLElement);
}

function usePortal(props: PortalProps = {}) {
  const { id, container } = props;
  const rootElemRef = useRef<HTMLElement | null>(canUseDOM ? document.body : null);

  useEffect(() => {
    const containerElement = typeof container === 'function' ? container() : container;

    // Look for existing target dom element to append to
    const existingParent = id && document.querySelector(`#${id}`);

    // Parent is either a new root or the existing dom element
    const parentElement = containerElement || existingParent || document.body;

    rootElemRef.current = parentElement as HTMLElement;
  }, [rootElemRef, container, id]);

  const Portal: React.FC<any> = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (rootElemRef.current != null) return createPortal(children, rootElemRef.current);
      return null;
    },
    [rootElemRef]
  );

  return { target: rootElemRef.current, Portal };
}

export default usePortal;
