import type { Placement } from '@/internals/types';

export type CursorPosition = {
  top: number;
  left: number;
  clientTop: number;
  clientLeft: number;
};

export interface PositionType {
  placement: Placement;
  positionLeft?: number;
  positionTop?: number;
  arrowOffsetLeft?: number;
  arrowOffsetTop?: number;
}

export interface UtilProps {
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
  arrowOffsetLeft?: number;
  arrowOffsetTop?: number;
}
