import React from 'react';
import PropTypes from 'prop-types';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import {
  useClassNames,
  useControlled,
  ReactChildren,
  useEventCallback,
  useUniqueId,
  useCustom
} from '../utils';
import Nav from '../Nav';
import Tab from './Tab';
import TabPanel from './TabPanel';

export interface TabsProps extends WithAsProps {
  /**
   * The tabs appearance style.
   */
  appearance?: 'tabs' | 'subtle';

  /**
   * Mark the Tab with a matching `eventKey` as active.
   */
  activeKey?: string;

  /**
   * The default active tabKey.
   */
  defaultActiveKey?: string;

  /**
   * Reversed display.
   * @default false
   */
  reversed?: boolean;

  /**
   * Vertical display.
   * @default false
   */
  vertical?: boolean;

  /**
   * The HTML id attribute, which should be unique.
   * @default use generated id
   */
  id?: string;

  /**
   * Callback fired when a Tab is selected.
   * @param eventKey
   * @param event
   * @returns
   */
  onSelect?: (eventKey: string, event: React.MouseEvent) => void;
}

interface TabsComponent extends RsRefForwardingComponent<'div', TabsProps> {
  Tab: typeof Tab;
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

const renderPanels = (children: React.ReactNode, tabProps: { id: string; activeKey?: string }) => {
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
  tabPanelProps: { id: string; activeKey?: string }
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

/**
 * Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.
 *
 * @version 5.53.0
 * @see https://rsuitejs.com/components/tabs
 */
const Tabs: TabsComponent = React.forwardRef((props: TabsProps, ref: React.Ref<HTMLDivElement>) => {
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
  } = props;

  const id = useUniqueId('tab-', idProp);
  const { rtl } = useCustom();
  const [activeKey, setActiveKey] = useControlled(activeKeyProp, defaultActiveKey);
  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const tablistRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = useEventCallback((eventKey: string, event: React.MouseEvent) => {
    setActiveKey(eventKey);
    onSelect?.(eventKey, event);
  });

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
      case 'End':
        const tabs = getFocusableTabs(tablistRef.current);
        item = tabs[tabs.length - 1];
        event.preventDefault();
        break;
    }

    if (item) {
      const { eventKey } = item?.dataset;
      handleSelect(eventKey, event);
      item.focus();
    }
  });

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
      <div className={prefix`content`}>{renderPanels(children, { id, activeKey })}</div>
    </Component>
  );
}) as unknown as TabsComponent;

Tabs.Tab = Tab;
Tabs.displayName = 'Tabs';
Tabs.propTypes = {
  appearance: PropTypes.oneOf(['tabs', 'subtle']),
  activeKey: PropTypes.any,
  defaultActiveKey: PropTypes.any,
  reversed: PropTypes.bool,
  vertical: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onSelect: PropTypes.func
};

export default Tabs;
