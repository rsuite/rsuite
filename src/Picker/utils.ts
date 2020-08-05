import React, { useState } from 'react';
import classNames from 'classnames';
import kebabCase from 'lodash/kebabCase';
import trim from 'lodash/trim';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import { findNodeOfTree, filterNodesOfTree } from '../utils/treeUtils';
import placementPolyfill from '../utils/placementPolyfill';
import reactToString from '../utils/reactToString';
import useEventListener from '../utils/useEventListener';
import shallowEqual from '../utils/shallowEqual';
import { KEY_CODE } from '../constants';

interface NodeKeys {
  valueKey: string;
  childrenKey: string;
}
const defaultNodeKeys = {
  valueKey: 'value',
  childrenKey: 'children'
};

export function createConcatChildrenFunction(
  node: any,
  nodeValue?: any,
  nodeKeys: NodeKeys = defaultNodeKeys
) {
  const { valueKey, childrenKey } = nodeKeys;
  return (data: any[], children: any[]): any[] => {
    if (nodeValue) {
      node = findNodeOfTree(data, item => nodeValue === item[valueKey]);
    }
    node[childrenKey] = children;
    return data.concat([]);
  };
}

export function shouldDisplay(label: React.ReactNode, searchKeyword: string) {
  if (!trim(searchKeyword)) {
    return true;
  }
  const keyword = searchKeyword.toLocaleLowerCase();
  if (typeof label === 'string' || typeof label === 'number') {
    return `${label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (React.isValidElement(label)) {
    const nodes = reactToString(label);
    return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
  }
  return false;
}

/**
 * The className of the assembled Toggle is on the Picker.
 * @param name
 * @param prefix
 * @param props
 * @param hasValue
 * @param classes
 */
export function getToggleWrapperClassName(
  name: string,
  prefix: (name: string) => string,
  props: any,
  hasValue: boolean,
  classes?: any
) {
  const { className, placement, appearance, cleanable, block, disabled, countable } = props;

  return classNames(className, prefix(name), prefix(appearance), prefix('toggle-wrapper'), {
    [prefix(`placement-${kebabCase(placementPolyfill(placement))}`)]: placement,
    [prefix('block')]: block,
    [prefix('has-value')]: hasValue,
    [prefix('disabled')]: disabled,
    [prefix('cleanable')]: hasValue && cleanable,
    [prefix('countable')]: countable,
    ...classes
  });
}

interface EventsProps {
  down?: React.KeyboardEventHandler;
  up?: React.KeyboardEventHandler;
  enter?: React.KeyboardEventHandler;
  del?: React.KeyboardEventHandler;
  esc?: React.KeyboardEventHandler;
}

/**
 * Handling keyboard events...
 * @param event Keyboard event object
 * @param events Event callback functions
 */
export function onMenuKeyDown(event: React.KeyboardEvent, events: EventsProps) {
  const { down, up, enter, del, esc } = events;
  switch (event.keyCode) {
    // down
    case KEY_CODE.DOWN:
      down?.(event);
      event.preventDefault();
      break;
    // up
    case KEY_CODE.UP:
      up?.(event);
      event.preventDefault();
      break;
    // enter
    case KEY_CODE.ENTER:
      enter?.(event);
      event.preventDefault();
      break;
    // delete
    case KEY_CODE.BACKSPACE:
      del?.(event);
      break;
    // esc | tab
    case KEY_CODE.ESC:
    case KEY_CODE.TAB:
      esc?.(event);
      event.preventDefault();
      break;
    default:
  }
}

/**
 * A hook that manages the focus state of the option.
 * @param defaultFocusItemValue
 * @param targets
 * @param props
 */
export const useFocusItemValue = (
  defaultFocusItemValue: number | string,
  targets: HTMLElement[] | (() => HTMLElement)[],
  props: { data: any[]; valueKey: string }
) => {
  const { data, valueKey } = props;
  const [toggle, menuWrapper] = targets;
  const [focusItemValue, setFocusItemValue] = useState<any>(defaultFocusItemValue);

  // Get the elements visible in all options.
  const getFocusableMenuItems = () => {
    if (!menuWrapper) {
      return [];
    }
    const menu = isFunction(menuWrapper) ? menuWrapper() : menuWrapper;
    const keys = Array.from(menu?.querySelectorAll('[role="listitem"]'))?.map(
      (item: HTMLDivElement) => item?.dataset?.key
    );

    if (keys.length === 0) {
      return [];
    }

    return filterNodesOfTree(data, item => keys.some(key => key === item[valueKey]));
  };

  const findNode = focus => {
    const items = getFocusableMenuItems();
    for (let i = 0; i < items.length; i += 1) {
      if (shallowEqual(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }
    focus(items, -1);
  };

  const focusNextMenuItem = () => {
    findNode((items, index) => {
      const focusItem = items[index + 1];
      if (!isUndefined(focusItem)) {
        setFocusItemValue(focusItem[valueKey]);
      }
    });
  };

  const focusPrevMenuItem = () => {
    findNode((items, index) => {
      const focusItem = items[index - 1];
      if (!isUndefined(focusItem)) {
        setFocusItemValue(focusItem[valueKey]);
      }
    });
  };

  const handleKeyDown = (event: any) => {
    onMenuKeyDown(event, {
      down: focusNextMenuItem,
      up: focusPrevMenuItem
    });
  };

  useEventListener(toggle, 'keydown', handleKeyDown);
  useEventListener(menuWrapper, 'keydown', handleKeyDown);

  return [focusItemValue, setFocusItemValue];
};
