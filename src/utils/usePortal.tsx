import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import canUseDOM from 'dom-lib/canUseDOM';

interface PortalProps {
  container?: HTMLElement | (() => HTMLElement | null) | null;

  // Wait until the application has been mounted before creating a Portal.
  waitMount?: boolean;
}

const MountedPortal = React.memo(
  ({ children, container }: { children: React.ReactNode; container: Element }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (container && mounted) {
      return createPortal(children, container);
    }
    return null;
  }
);

function usePortal(props: PortalProps = {}) {
  const { container, waitMount = false } = props;
  const rootElemRef = useRef<HTMLElement | null>(canUseDOM ? document.body : null);

  const containerElement = typeof container === 'function' ? container() : container;
  /**
   * useMemo can be updated before the Portal is called.
   */
  useMemo(() => {
    // Parent is either a new root or the existing dom element
    const parentElement = containerElement || document.body;

    rootElemRef.current = parentElement as HTMLElement;
  }, [rootElemRef, containerElement]);

  const Portal = useCallback(({ children }: { children: React.ReactNode }) => {
    return rootElemRef.current != null ? createPortal(children, rootElemRef.current) : null;
  }, []);

  const WaitMountPortal = useCallback(
    props => <MountedPortal container={rootElemRef.current} {...props} />,
    []
  );

  return {
    target: rootElemRef.current,
    Portal: waitMount ? WaitMountPortal : Portal
  };
}

export default usePortal;
