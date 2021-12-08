import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import remove from 'lodash/remove';
import Transition from '../Animation/Transition';
import shallowEqual from '../utils/shallowEqual';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import { useClassNames, useControlled, mergeRefs } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import deprecatePropType from '../utils/deprecatePropType';

export interface SidenavProps<T = string> extends WithAsProps {
  /** Whether to expand the Sidenav */
  expanded?: boolean;

  /** Menu style */
  appearance?: 'default' | 'inverse' | 'subtle';

  /** Open menu, corresponding to Dropdown eventkey */
  defaultOpenKeys?: T[];

  /** Open menu, corresponding to Dropdown eventkey (controlled) */
  openKeys?: T[];

  /**
   * Activation option, corresponding menu eventkey
   * @deprecated Use <Nav activeKey> instead
   */
  activeKey?: T;

  /** Menu opening callback function that changed */
  onOpenChange?: (openKeys: T[], event: React.SyntheticEvent) => void;

  /**
   * Select the callback function for the menu
   * @deprecated Use <Sidenav onSelect> instead
   */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

export const SidenavContext = React.createContext<SidenavContextType | null>(null);

export interface SidenavContextType<T = string> {
  openKeys: T[];
  activeKey: T | null;
  sidenav: boolean;
  expanded: boolean;
  onOpenChange: (eventKey: T, event: React.SyntheticEvent) => void;
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

export interface SidenavComponent extends RsRefForwardingComponent<'div', SidenavProps> {
  Header: typeof SidenavHeader;
  Body: typeof SidenavBody;
  Toggle: typeof SidenavToggle;
}

const emptyArray = [];

const Sidenav: SidenavComponent = React.forwardRef((props: SidenavProps, ref) => {
  const {
    as: Component = 'nav',
    className,
    classPrefix = 'sidenav',
    appearance = 'default',
    expanded = true,
    activeKey = null,
    defaultOpenKeys = emptyArray,
    openKeys: openKeysProp,
    onSelect,
    onOpenChange,
    ...rest
  } = props;

  const [openKeys, setOpenKeys] = useControlled(openKeysProp, defaultOpenKeys);
  const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(appearance));

  const handleOpenChange = useCallback(
    (eventKey: any, event: React.SyntheticEvent) => {
      const find = key => shallowEqual(key, eventKey);
      const nextOpenKeys = [...openKeys];

      if (nextOpenKeys.some(find)) {
        remove(nextOpenKeys, find);
      } else {
        nextOpenKeys.push(eventKey);
      }

      setOpenKeys(nextOpenKeys);
      onOpenChange?.(nextOpenKeys, event);
    },
    [onOpenChange, openKeys, setOpenKeys]
  );

  const contextValue = useMemo<SidenavContextType>(
    () => ({
      expanded,
      activeKey,
      sidenav: true,
      openKeys: openKeys ?? [],
      onOpenChange: handleOpenChange,
      onSelect
    }),
    [activeKey, expanded, handleOpenChange, onSelect, openKeys]
  );

  return (
    <SidenavContext.Provider value={contextValue}>
      <Transition
        in={expanded}
        timeout={300}
        exitedClassName={prefix('collapse-out')}
        exitingClassName={prefix('collapse-out', 'collapsing')}
        enteredClassName={prefix('collapse-in')}
        enteringClassName={prefix('collapse-in', 'collapsing')}
      >
        {(transitionProps, transitionRef) => {
          const { className, ...transitionRest } = transitionProps;
          return (
            <Component
              {...rest}
              {...transitionRest}
              ref={mergeRefs(ref, transitionRef)}
              className={merge(classes, className)}
            />
          );
        }}
      </Transition>
    </SidenavContext.Provider>
  );
}) as unknown as SidenavComponent;

Sidenav.Header = SidenavHeader;
Sidenav.Body = SidenavBody;
Sidenav.Toggle = SidenavToggle;

Sidenav.displayName = 'Sidenav';
Sidenav.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  appearance: PropTypes.oneOf(['default', 'inverse', 'subtle']),
  defaultOpenKeys: PropTypes.array,
  openKeys: PropTypes.array,
  onOpenChange: PropTypes.func,
  activeKey: deprecatePropType(PropTypes.any, 'Use `activeKey` on <Nav> component instead'),
  onSelect: deprecatePropType(PropTypes.func, 'Use `onSelect` on <Nav> component instead')
};

export default Sidenav;
