'use client';
import { useCallback } from 'react';
import isNil from 'lodash/isNil';
import cloneDeep from 'lodash/cloneDeep';
import { useEventCallback } from "../../internals/hooks/index.js";
import { useItemDataKeys } from "../../internals/Tree/TreeProvider.js";
import { isEveryChildChecked } from "../utils.js";
function useTreeCheckState(props) {
  var cascade = props.cascade,
    flattenedNodes = props.flattenedNodes,
    uncheckableItemValues = props.uncheckableItemValues;
  var _useItemDataKeys = useItemDataKeys(),
    valueKey = _useItemDataKeys.valueKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var checkParentNode = useEventCallback(function (nodes, node, checked) {
    var currentNode = node.refKey ? nodes[node.refKey] : null;
    if (cascade && currentNode) {
      if (!checked) {
        currentNode.check = checked;
        currentNode.checkAll = checked;
      } else {
        if (isEveryChildChecked(currentNode, {
          nodes: nodes,
          childrenKey: childrenKey
        })) {
          currentNode.check = true;
          currentNode.checkAll = true;
        } else {
          currentNode.check = false;
          currentNode.checkAll = false;
        }
      }
      if (currentNode.parent) {
        checkParentNode(nodes, currentNode.parent, checked);
      }
    }
  });
  var checkChildNode = useEventCallback(function (nodes, node, isChecked) {
    var currentNode = node.refKey ? nodes[node.refKey] : null;
    if (!currentNode) {
      return;
    }
    currentNode.check = isChecked;
    if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
      currentNode.checkAll = false;
    } else {
      currentNode.checkAll = isChecked;
      currentNode[childrenKey].forEach(function (child) {
        checkChildNode(nodes, child, isChecked);
      });
    }
  });
  var getCheckedValuesByParent = useCallback(function (nodes) {
    var values = [];
    for (var key in nodes) {
      var currentNode = nodes[key];
      if (!isNil(currentNode.parent) && !isNil(currentNode.parent.refKey)) {
        var parentNode = nodes[currentNode.parent.refKey];
        if (currentNode.check) {
          if (!(parentNode !== null && parentNode !== void 0 && parentNode.checkAll)) {
            values.push(currentNode[valueKey]);
          } else if (parentNode !== null && parentNode !== void 0 && parentNode.uncheckable) {
            values.push(currentNode[valueKey]);
          }
        }
      } else if (currentNode.check) {
        values.push(currentNode[valueKey]);
      }
    }
    return values;
  }, [valueKey]);
  var getCheckedValues = useEventCallback(function (node, isChecked) {
    var nodes = cloneDeep(flattenedNodes);
    checkChildNode(nodes, node, isChecked);
    if (node.parent) {
      checkParentNode(nodes, node.parent, isChecked);
    }
    var values = getCheckedValuesByParent(nodes);
    return values.filter(function (v) {
      return !uncheckableItemValues.includes(v);
    });
  });
  return {
    getCheckedValues: getCheckedValues
  };
}
export default useTreeCheckState;