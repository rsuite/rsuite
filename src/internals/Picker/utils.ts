import React from 'react';
import trim from 'lodash/trim';
import { KEY_VALUES } from '../constants';
import { findNodeOfTree } from '../Tree/utils';
import { reactToString } from '@/internals/utils';

export interface NodeKeys {
  valueKey: string;
  childrenKey: string;
}

const defaultNodeKeys = {
  valueKey: 'value',
  childrenKey: 'children'
};

export function createConcatChildrenFunction<T = any>(
  node: any,
  nodeValue?: any,
  nodeKeys: NodeKeys = defaultNodeKeys
) {
  const { valueKey, childrenKey } = nodeKeys;
  return (data: T[], children: T[]): T[] => {
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

export interface KeyboardEvents {
  down?: React.KeyboardEventHandler;
  up?: React.KeyboardEventHandler;
  enter?: React.KeyboardEventHandler;
  del?: React.KeyboardEventHandler;
  esc?: React.KeyboardEventHandler;
  right?: React.KeyboardEventHandler;
  left?: React.KeyboardEventHandler;
}

/**
 * Handling keyboard events...
 * @param event Keyboard event object
 * @param events Event callback functions
 */
export function onMenuKeyDown(event: React.KeyboardEvent, events: KeyboardEvents) {
  const { down, up, enter, del, esc, right, left } = events;
  switch (event.key) {
    // down
    case KEY_VALUES.DOWN:
      down?.(event);
      event.preventDefault();
      break;
    // up
    case KEY_VALUES.UP:
      up?.(event);
      event.preventDefault();
      break;
    // enter
    case KEY_VALUES.ENTER:
      enter?.(event);
      event.preventDefault();
      break;
    // delete
    case KEY_VALUES.BACKSPACE:
      del?.(event);
      break;
    // esc | tab
    case KEY_VALUES.ESC:
    case KEY_VALUES.TAB:
      esc?.(event);
      break;
    // left arrow
    case KEY_VALUES.LEFT:
      left?.(event);
      break;
    // right arrow
    case KEY_VALUES.RIGHT:
      right?.(event);
      break;
    default:
  }
}
