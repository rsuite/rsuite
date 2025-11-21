import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import canUseDOM from 'dom-lib/canUseDOM';

interface PortalProps {
  container?: HTMLElement | (() => HTMLElement | null) | null;

  // Wait until the application has been mounted before creating a Portal.
  waitMount?: boolean;
}

const MountedPortal = React.memo(function MountedPortal({
  children,
  container
}: {
  children: React.ReactNode;
  container: Element;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (container && mounted) {
    return createPortal(children, container);
  }
  return null;
});

export function usePortal(props: PortalProps = {}) {
  const { container, waitMount = false } = props;
  const containerElement = typeof container === 'function' ? container() : container;
  const rootElement = useMemo(
    () => (canUseDOM ? containerElement || document.body : null),
    [containerElement]
  );

  const Portal = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      return rootElement != null ? createPortal(children, rootElement) : null;
    },
    [rootElement]
  );

  const WaitMountPortal = useCallback(
    props => <MountedPortal container={rootElement} {...props} />,
    [rootElement]
  );

  return {
    target: rootElement,
    Portal: waitMount ? WaitMountPortal : Portal
  };
}

export default usePortal;
