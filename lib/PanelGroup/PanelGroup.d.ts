import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface PanelGroupProps<T = any> extends StandardProps {
  /** Whether it is a collapsible panel. */
  accordion?: boolean;

  /** Expand the Panel, corresponding to the 'Panel' of 'eventkey' */
  activeKey?: T;

  /** Show border */
  bordered?: boolean;

  /** The default expansion panel. */
  defaultActiveKey?: T;

  /** Primary content */
  children?: React.ReactNode;

  /** Toggles the callback function for the expand panel */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<any>) => void;
}

declare const PanelGroup: React.ComponentType<PanelGroupProps>;

export default PanelGroup;
