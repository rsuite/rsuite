export interface AnimationEventProps {
  /** Callback fired before the Modal transitions in */
  onEnter?: (node: HTMLElement) => void;

  /** Callback fired as the Modal begins to transition in */
  onEntering?: (node: HTMLElement) => void;

  /** Callback fired after the Modal finishes transitioning in */
  onEntered?: (node: HTMLElement) => void;

  /** Callback fired right before the Modal transitions out */
  onExit?: (node: HTMLElement) => void;

  /** Callback fired as the Modal begins to transition out */
  onExiting?: (node: HTMLElement) => void;

  /** Callback fired after the Modal finishes transitioning out */
  onExited?: (node: HTMLElement) => void;
}
