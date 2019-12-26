import * as React from 'react';
import { AnimationEventProps, StandardProps } from '../@types/common';

export interface PanelProps<T = any> extends StandardProps, AnimationEventProps {
  /** Whether it is a collapsible panel */
  collapsible?: boolean;

  /** Show border */
  bordered?: boolean;

  /** With shadow */
  shaded?: boolean;

  /** Content area filled with containers */
  bodyFill?: boolean;

  /** The head displays information. */
  header?: any;

  /** ID */
  id?: string | number;

  /** Expand then panel by default */
  defaultExpanded?: boolean;

  /** Expand then panel */
  expanded?: boolean;

  /** The event key corresponding to the panel. */
  eventKey?: T;

  /** Role of header */
  headerRole?: string;

  /** Role of Panel */
  panelRole?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** callback function for the panel clicked */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<any>) => void;
}

declare const Panel: React.ComponentType<PanelProps>;

export default Panel;
