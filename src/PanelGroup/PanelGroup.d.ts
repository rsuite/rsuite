import * as React from 'react';
import { StandardProps } from '.';

export interface PanelGroupProps extends StandardProps {
  /** Whether it is a collapsible panel. */
  accordion?: boolean;

  /** Expand the Panel, corresponding to the 'Panel' of 'eventkey' */
  activeKey?: any;

  /** Show border */
  bordered?: boolean;

  /** The default expansion panel. */
  defaultActiveKey?: any;

  /** Primary content */
  children?: React.ReactNode;

  /** Toggles the callback function for the expand panel */
  onSelect?: (eventKey: any, event: React.SyntheticEvent<any>) => void;
}

declare const PanelGroup: React.ComponentType<PanelGroupProps>;

export default PanelGroup;
