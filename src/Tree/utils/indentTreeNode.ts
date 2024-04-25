import { TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from '../../utils/constants';

export function indentTreeNode(rtl, layer, absolute = false) {
  // layer start from 1
  const offset = layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;

  if (absolute) {
    return {
      [rtl ? 'right' : 'left']: offset
    };
  }

  return {
    [rtl ? 'paddingRight' : 'paddingLeft']: offset
  };
}
