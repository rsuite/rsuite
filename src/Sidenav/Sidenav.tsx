import React, { useMemo, useCallback } from 'react';
import remove from 'lodash/remove';
import Transition from '../Animation/Transition';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import { useClassNames, useControlled } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { mergeRefs, shallowEqual } from '@/internals/utils';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

export interface SidenavProps<T = string | number> extends WithAsProps {
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

export const SidenavContext = React.createContext<SidenavContextType | null>(null);

export interface SidenavContextType<T = string | number> {
  openKeys: T[];
  /**
   * @deprecated Use activeKey from NavContext instead
   */
  activeKey: T | undefined;
  sidenav: boolean;
  expanded: boolean;
  onOpenChange: (eventKey: T, event: React.SyntheticEvent) => void;
  /**
   * @deprecated Use onSelect from NavContext instead
   */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

export interface SidenavComponent extends RsRefForwardingComponent<'div', SidenavProps> {
  Header: typeof SidenavHeader;
  Body: typeof SidenavBody;
  Toggle: typeof SidenavToggle;
}

const emptyArray = [];

/**
 * The `Sidenav` component is an encapsulation of the page sidebar `Nav`.
 * @see https://rsuitejs.com/components/sidenav/
 */
const Sidenav: SidenavComponent = React.forwardRef(function Sidenav(props: SidenavProps, ref) {
  const { propsWithDefaults } = useCustom('Sidenav', props);
  const {
    as: Component = 'nav',
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

export default Sidenav;
