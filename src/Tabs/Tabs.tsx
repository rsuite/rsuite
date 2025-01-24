import React from 'react';
import Nav from '../Nav';
import Tab from './Tab';
import TabPanel from './TabPanel';
import { forwardRef, ReactChildren } from '@/internals/utils';
import { useClassNames, useControlled, useEventCallback, useUniqueId } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

/**
 * Props for the Tabs component.
 */
export interface TabsProps extends WithAsProps {
  /**
   * The appearance of the tabs.
   * @default 'tabs'
   * @version 'pills' is supported in version 5.68.0
   */
  appearance?: 'tabs' | 'subtle' | 'pills';

  /**
   * The key of the active tab.
   */
  activeKey?: string | number;

  /**
   * The default key of the active tab.
   */
  defaultActiveKey?: string | number;

  /**
   * Whether to reverse the order of the tabs.
   */
  reversed?: boolean;

  /**
   * Whether to display the tabs vertically.
   */
  vertical?: boolean;

  /**
   * The ID of the tabs.
   * @default A unique ID is automatically generated.
   */
  id?: string;

  /**
   * Callback function that is called when a tab is selected.
   *
   * @param eventKey - The key of the selected tab.
   * @param event - The event object.
   */
  onSelect?: (eventKey: string | number | undefined, event: React.SyntheticEvent) => void;
}

function getFocusableTabs(tablist?: HTMLElement | null) {
  const tabs = tablist?.querySelectorAll('[role=tab]') as NodeListOf<HTMLElement>;

  return Array.from(tabs).filter(tab => !(tab.getAttribute('aria-disabled') === 'true'));
}

function getFocusedTab(tablist: HTMLElement) {
  const tabs = getFocusableTabs(tablist);
  return tabs.find(tab => tab.getAttribute('aria-selected'));
}

function nextItem(tablist: HTMLDivElement | null) {
  if (!tablist) {
    return null;
  }

  const item = getFocusedTab(tablist);
  const items = getFocusableTabs(tablist);

  if (!item) {
    return items[0];
  }

  const nextItem = items[items.indexOf(item) + 1];

  if (!nextItem || nextItem.getAttribute('role') !== 'tab') {
    return items[0];
  }

  return nextItem;
}

function previousItem(tablist: HTMLDivElement | null) {
  if (!tablist) {
    return null;
  }

  const item = getFocusedTab(tablist);
  const items = getFocusableTabs(tablist);

  if (!item) {
    return items[items.length - 1];
  }

  const previousItem = items[items.indexOf(item) - 1];

  if (!previousItem || previousItem.getAttribute('role') !== 'tab') {
    return items[items.length - 1];
  }

  return previousItem;
}

const renderPanels = (
  children: React.ReactNode,
  tabProps: { id: string; activeKey?: string | number }
) => {
  const { id, activeKey } = tabProps;
  return ReactChildren.map(children, (child: React.ReactElement) => {
    const { eventKey, children } = child.props;
    const selected = eventKey === activeKey;
    return (
      <TabPanel
        aria-labelledby={`${id}-${eventKey}`}
        aria-hidden={!selected}
        id={`${id}-panel-${eventKey}`}
        active={selected}
      >
        {children}
      </TabPanel>
    );
  });
};

const renderTabs = (
  children: React.ReactNode,
  tabPanelProps: { id: string; activeKey?: string | number }
) => {
  const { id, activeKey } = tabPanelProps;
  return ReactChildren.map(children, (child: React.ReactElement) => {
    const { eventKey, title, disabled, icon } = child.props;
    const selected = eventKey === activeKey;
    return (
      <Nav.Item
        role="tab"
        as="button"
        type="button"
        aria-selected={selected}
        aria-controls={`${id}-panel-${eventKey}`}
        aria-disabled={disabled}
        data-event-key={eventKey}
        disabled={disabled}
        icon={icon}
        id={`${id}-${eventKey}`}
        tabIndex={selected ? undefined : -1}
        eventKey={eventKey}
      >
        {title}
      </Nav.Item>
    );
  });
};

const Subcomponents = {
  Tab
};

/**
 * Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.
 *
 * @version 5.53.0
 * @see https://rsuitejs.com/components/tabs
 */
const Tabs = forwardRef<'div', TabsProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults, rtl } = useCustom('Tabs', props);
  const {
    as: Component = 'div',
    classPrefix = 'tabs',
    appearance = 'tabs',
    className,
    children,
    activeKey: activeKeyProp,
    defaultActiveKey,
    id: idProp,
    reversed,
    vertical,
    onSelect,
    ...rest
  } = propsWithDefaults;

  const id = useUniqueId('tab-', idProp);
  const [activeKey, setActiveKey] = useControlled(activeKeyProp, defaultActiveKey);
  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const tablistRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = useEventCallback(
    (eventKey: string | undefined, event: React.SyntheticEvent) => {
      setActiveKey(eventKey);
      onSelect?.(eventKey, event);
    }
  );

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;

    if (target.getAttribute('role') !== 'tab') {
      return;
    }

    let previousItemKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    let nextItemKey = vertical ? 'ArrowDown' : 'ArrowRight';

    if (!vertical && rtl) {
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    let item: HTMLElement | null = null;

    switch (event.key) {
      case previousItemKey:
        item = previousItem(tablistRef.current);
        event.preventDefault();
        break;
      case nextItemKey:
        item = nextItem(tablistRef.current);
        event.preventDefault();
        break;
      case 'Home':
        item = getFocusableTabs(tablistRef.current)?.[0];
        event.preventDefault();
        break;
      case 'End': {
        const tabs = getFocusableTabs(tablistRef.current);
        item = tabs[tabs.length - 1];
        event.preventDefault();
        break;
      }
    }

    if (item) {
      const eventKey = item ? item.dataset.eventKey : undefined;
      handleSelect(eventKey, event);
      item.focus();
    }
  });

  const hasChildren = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.props.children
  );

  return (
    <Component
      className={merge(className, withClassPrefix({ reversed, vertical }))}
      {...rest}
      ref={ref}
    >
      <Nav
        role="tablist"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        reversed={reversed}
        vertical={vertical}
        appearance={appearance}
        activeKey={activeKey}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        ref={tablistRef}
      >
        {renderTabs(children, { id, activeKey })}
      </Nav>
      {hasChildren && (
        <div className={prefix`content`}>{renderPanels(children, { id, activeKey })}</div>
      )}
    </Component>
  );
}, Subcomponents);

Tabs.displayName = 'Tabs';

export default Tabs;
