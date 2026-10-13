import type { Placement } from '@/internals/types';

export type CursorPosition = {
  top: number;
  left: number;
};

export interface PositionType {
  placement: Placement;
  positionLeft?: number;
  positionTop?: number;
  arrowOffsetLeft?: string;
  arrowOffsetTop?: string;
}

export interface PositionOptions {
  placement: Placement;
  preventOverflow: boolean;
  padding: number;
}

export interface Dimensions {
  width: number;
  height: number;
  scrollX: number;
  scrollY: number;
}

export interface OverlayTriggerHandle {
  root?: HTMLElement | null;
  updatePosition: () => void;
  open: (delay?: number) => void;
  close: (delay?: number) => void;
  getState: () => { open?: boolean };
}

export interface PositionChildProps {
  // className for transition animation
  className?: string;
  dataAttributes?: Record<string, string>;
  placement: Placement;
  left?: number;
  top?: number;
  /** Horizontal arrow offset as a CSS percentage. */
  arrowOffsetLeft?: string;
  /** Vertical arrow offset as a CSS percentage. */
  arrowOffsetTop?: string;
}
