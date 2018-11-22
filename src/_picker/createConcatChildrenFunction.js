// @flow

import { findNodeOfTree } from 'rsuite-utils/lib/utils';

export default function createConcatChildrenFunction(node: any, nodeValue?: any) {
  return (data, children) => {
    if (nodeValue) {
      node = findNodeOfTree(data, item => nodeValue === item.value);
    }
    node.children = children;
    return data.concat([]);
  };
}
