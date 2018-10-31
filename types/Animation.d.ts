import * as React from 'react';

export interface TransitionProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Additional classes */
  className?: string;

  /** Show the component; triggers the enter or exit animation */
  in?: boolean;

  /** Unmount the component (remove it from the DOM) when it is not shown */
  unmountOnExit?: boolean;

  /** Run the enter animation when the component mounts, if it is initially shown */
  transitionAppear?: boolean;

  /** A Timeout for the animation */
  timeout?: number;

  /** CSS class or classes applied when the component is exited */
  exitedClassName?: string;

  /** CSS class or classes applied while the component is exiting */
  exitingClassName?: string;

  /** CSS class or classes applied when the component is entered */
  enteredClassName?: string;

  /** CSS class or classes applied while the component is entering */
  enteringClassName?: string;

  /** Callback fired before the Modal transitions in */
  onEnter?: (node: null | Element | Text) => void;

  /** Callback fired as the Modal begins to transition in */
  onEntering?: (node: null | Element | Text) => void;

  /** Callback fired after the Modal finishes transitioning in */
  onEntered?: (node: null | Element | Text) => void;

  /** Callback fired right before the Modal transitions out */
  onExit?: (node: null | Element | Text) => void;

  /** Callback fired as the Modal begins to transition out */
  onExiting?: (node: null | Element | Text) => void;

  /** Callback fired after the Modal finishes transitioning out */
  onExited?: (node: null | Element | Text) => void;
}

export type CollapseDimension = 'height' | 'width';

export interface CollapseProps extends TransitionProps {
  /** The dimension used when collapsing */
  dimension?: CollapseDimension | (() => CollapseDimension);

  /** Function that returns the height or width of the animating DOM node */
  getDimensionValue?: (dimension: CollapseDimension, elem: Element) => number;

  /** ARIA role of collapsible element */
  role?: string;
}

export interface AnimationAPI {
  Fade: React.StatelessComponent<TransitionProps>;
  Collapse: React.StatelessComponent<CollapseProps>;
  Transition: React.StatelessComponent<TransitionProps>;
}

declare const Animation: AnimationAPI;

export default Animation;
