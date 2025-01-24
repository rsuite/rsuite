import React, { useMemo } from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

type KeyType = string | number;
export interface PanelGroupProps<T = KeyType> extends WithAsProps {
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
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

interface PanelGroupContext {
  accordion?: boolean;
  activeKey?: KeyType;
  onGroupSelect?: (activeKey: KeyType | undefined, event: React.MouseEvent) => void;
}

export const PanelGroupContext = React.createContext<PanelGroupContext>({});

/**
 * The `PanelGroup` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
const PanelGroup = forwardRef<'div', PanelGroupProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('PanelGroup', props);
  const {
    as: Component = 'div',
    accordion,
    defaultActiveKey,
    bordered,
    className,
    classPrefix = 'panel-group',
    children,
    activeKey: activeProp,
    onSelect,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const [activeKey, setActiveKey] = useControlled(activeProp, defaultActiveKey);
  const classes = merge(className, withClassPrefix({ accordion, bordered }));

  const handleSelect = useEventCallback(
    (activeKey: KeyType | undefined, event: React.MouseEvent) => {
      setActiveKey(activeKey);
      onSelect?.(activeKey, event);
    }
  );

  const contextValue = useMemo(
    () => ({ accordion, activeKey, onGroupSelect: handleSelect }),
    [accordion, activeKey, handleSelect]
  );

  return (
    <Component {...rest} ref={ref} className={classes}>
      <PanelGroupContext.Provider value={contextValue}>{children}</PanelGroupContext.Provider>
    </Component>
  );
});

PanelGroup.displayName = 'PanelGroup';

export default PanelGroup;
