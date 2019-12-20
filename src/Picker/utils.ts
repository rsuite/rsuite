import classNames from 'classnames';
import _ from 'lodash';
import { findNodeOfTree } from 'rsuite-utils/lib/utils';
import placementPolyfill from '../utils/placementPolyfill';

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

export function getToggleWrapperClassName(
  name: string,
  prefix: (name: string) => string,
  props: any,
  hasValue: boolean,
  classes?: any
) {
  const { className, placement, appearance, cleanable, block, disabled, countable } = props;

  return classNames(className, prefix(name), prefix(appearance), prefix('toggle-wrapper'), {
    [prefix(`placement-${_.kebabCase(placementPolyfill(placement))}`)]: placement,
    [prefix('block')]: block,
    [prefix('has-value')]: hasValue,
    [prefix('disabled')]: disabled,
    [prefix('cleanable')]: hasValue && cleanable,
    [prefix('countable')]: countable,
    ...classes
  });
}

export function onMenuKeyDown(event: React.KeyboardEvent, events) {
  const { down, up, enter, del, esc } = events;
  switch (event.keyCode) {
    // down
    case 40:
      down?.(event);
      event.preventDefault();
      break;
    // up
    case 38:
      up?.(event);
      event.preventDefault();
      break;
    // enter
    case 13:
      enter?.(event);
      event.preventDefault();
      break;
    // delete
    case 8:
      del?.(event);
      break;
    // esc | tab
    case 27:
    case 9:
      esc?.(event);
      event.preventDefault();
      break;
    default:
  }
}
