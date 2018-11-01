import * as React from 'react';

export interface PortalProps {
  /**
   * A Node, Component instance, or function that returns either.
   * The `container` will have the Portal children
   * appended to it.
   */
  container?: HTMLElement | (() => HTMLElement);

  /** Rendered callback function */
  onRendered?: () => void;

  /** Primary content */
  children?: React.ReactNode;
}

declare const Portal: React.ComponentType<PortalProps>;

export default Portal;
