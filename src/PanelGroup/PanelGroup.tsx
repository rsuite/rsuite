import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled } from '../utils';
import { WithAsProps } from '../@types/common';

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

const PanelGroup = React.forwardRef((props: PanelGroupProps, ref) => {
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
  } = props;
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const [activeKey, setActiveKey] = useControlled(activeProp, defaultActiveKey);
  const classes = merge(
    className,
    withClassPrefix({
      accordion,
      bordered
    })
  );

  const handleSelect = useCallback(
    (activeKey: KeyType | undefined, event: React.MouseEvent) => {
      setActiveKey(activeKey);
      onSelect?.(activeKey, event);
    },
    [onSelect, setActiveKey]
  );

  return (
    <Component {...rest} ref={ref} role={accordion ? 'tablist' : undefined} className={classes}>
      <PanelGroupContext.Provider value={{ accordion, activeKey, onGroupSelect: handleSelect }}>
        {children}
      </PanelGroupContext.Provider>
    </Component>
  );
});

PanelGroup.displayName = 'PanelGroup';
PanelGroup.propTypes = {
  accordion: PropTypes.bool,
  activeKey: PropTypes.any,
  bordered: PropTypes.bool,
  defaultActiveKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func
};

export default PanelGroup;
