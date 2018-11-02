import * as React from 'react';
import { AnimationEventProps, StandardProps } from '.';

export interface PanelProps extends StandardProps, AnimationEventProps {
  /** Whether it is a collapsible panel */
  collapsible?: boolean;

  /** Show border */
  bordered?: boolean;

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
  eventKey?: any;

  /** Role of header */
  headerRole?: string;

  /** Role of Panel */
  panelRole?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** callback function for the panel clicked */
  onSelect?: (eventKey: any, event: React.SyntheticEvent<any>) => void;
}

declare const Panel: React.ComponentType<PanelProps>;

export default Panel;
