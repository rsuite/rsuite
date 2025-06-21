import React, { useMemo, useCallback } from 'react';
import remove from 'lodash/remove';
import Transition from '../Animation/Transition';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavFooter from './SidenavFooter';
import SidenavToggle from './SidenavToggle';
import SidenavGroupLabel from './SidenavGroupLabel';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeRefs, shallowEqual } from '@/internals/utils';
import { useStyles, useCustom, useControlled } from '@/internals/hooks';
import { SidenavContext, SidenavContextType } from './SidenavContext';

export interface SidenavProps<T = string | number> extends BoxProps {
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
   * @deprecated Use <Nav onSelect> instead
   */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

const emptyArray = [];
const Subcomponents = {
  Header: SidenavHeader,
  Body: SidenavBody,
  Footer: SidenavFooter,
  GroupLabel: SidenavGroupLabel,
  Toggle: SidenavToggle
};

/**
 * The `Sidenav` component is an encapsulation of the page sidebar `Nav`.
 * @see https://rsuitejs.com/components/sidenav/
 */
const Sidenav = forwardRef<'div', SidenavProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('Sidenav', props);
  const {
    as = 'nav',
    className,
    classPrefix = 'sidenav',
    appearance = 'default',
    expanded = true,
    activeKey,
    defaultOpenKeys = emptyArray,
    openKeys: openKeysProp,
    onSelect,
    onOpenChange,
    ...rest
  } = propsWithDefaults;

  const [openKeys, setOpenKeys] = useControlled(openKeysProp, defaultOpenKeys);
  const { prefix, merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(appearance));

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
            <Box
              as={as}
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
}, Subcomponents);

Sidenav.displayName = 'Sidenav';

export default Sidenav;
