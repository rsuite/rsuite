'use client';
import { useState, useEffect, useCallback } from 'react';
import uniq from 'lodash/uniq';
import remove from 'lodash/remove';
import { useEventCallback } from "../../internals/hooks/index.js";
import { removeAllChildrenValue, getOtherItemValuesByUnselectChild } from "../utils.js";

/**
 * Get all parents of a node
 * @param node
 */
var _getParents = function getParents(node) {
  var parents = [];
  if (!node.parent) {
    return parents;
  }
  parents.push(node.parent);
  parents = parents.concat(_getParents(node.parent));
  return parents;
};

/**
 * A hook that converts the value into a cascading value
 * @param props
 * @param flattenData
 */
function useCascadeValue(props, flattenData) {
  var valueKey = props.valueKey,
    childrenKey = props.childrenKey,
    uncheckableItemValues = props.uncheckableItemValues,
    cascade = props.cascade,
    valueProp = props.value,
    onChange = props.onChange,
    onCheck = props.onCheck;

  /**
   * Get the values of all children
   */
  var getChildrenValue = useCallback(function (item) {
    var values = [];
    if (!item[childrenKey]) {
      return values;
    }
    item[childrenKey].forEach(function (n) {
      if (uncheckableItemValues && !uncheckableItemValues.some(function (v) {
        return v === n[valueKey];
      })) {
        values.push(n[valueKey]);
      }
      values = values.concat(getChildrenValue(n));
    });
    return values;
  }, [childrenKey, uncheckableItemValues, valueKey]);
  var splitValue = useCallback(function (item, checked, value) {
    var itemValue = item[valueKey];
    var childrenValue = getChildrenValue(item);
    var parents = _getParents(item);
    var nextValue = [].concat(value);
    var removedValue = [];
    if (checked) {
      nextValue.push(itemValue);

      // Delete all values under the current node
      removedValue = removedValue.concat(removeAllChildrenValue(nextValue, item, {
        valueKey: valueKey,
        childrenKey: childrenKey
      }) || []);

      // Traverse all ancestor nodes of the current node
      // Then determine whether all the child nodes of these nodes are selected, and then they themselves must be selected
      var _loop = function _loop(i) {
        // Whether the parent node can be selected
        var isCheckableParent = !(uncheckableItemValues !== null && uncheckableItemValues !== void 0 && uncheckableItemValues.some(function (v) {
          return v === parents[i][valueKey];
        }));
        if (isCheckableParent) {
          var isCheckAll = parents[i][childrenKey]
          // Filter out options that are marked as not selectable
          .filter(function (n) {
            return !(uncheckableItemValues !== null && uncheckableItemValues !== void 0 && uncheckableItemValues.some(function (v) {
              return v === n[valueKey];
            }));
          })
          // Check if all nodes are selected
          .every(function (n) {
            return nextValue.some(function (v) {
              return v === n[valueKey];
            });
          });
          if (isCheckAll) {
            // Add parent node value
            nextValue.push(parents[i][valueKey]);

            // Delete all values under the parent node
            removedValue = removedValue.concat(removeAllChildrenValue(nextValue, parents[i], {
              valueKey: valueKey,
              childrenKey: childrenKey
            }) || []);
          }
        }
      };
      for (var i = 0; i < parents.length; i++) {
        _loop(i);
      }
    } else {
      var tempValue = childrenValue.concat(parents.map(function (item) {
        return item[valueKey];
      }));
      nextValue = nextValue.concat(getOtherItemValuesByUnselectChild(item, nextValue, {
        valueKey: valueKey,
        childrenKey: childrenKey
      }));

      // Delete related child and parent nodes
      removedValue = remove(nextValue, function (v) {
        // Delete yourself
        if (v === itemValue) {
          return true;
        }
        return tempValue.some(function (n) {
          return n === v;
        });
      });
    }
    var uniqValue = uniq(nextValue);
    var uniqRemovedValue = uniq(removedValue);
    return {
      value: uniqValue,
      removedValue: uniqRemovedValue
    };
  }, [valueKey, childrenKey, uncheckableItemValues, getChildrenValue]);
  var transformValue = useCallback(function (value) {
    if (value === void 0) {
      value = [];
    }
    if (!cascade) {
      return value;
    }
    var tempRemovedValue = [];
    var nextValue = [];
    var _loop2 = function _loop2(i) {
        // If the value in the current value is already in the deleted list, it will not be processed
        if (tempRemovedValue.some(function (v) {
          return v === value[i];
        })) {
          return 0; // continue
        }
        var item = flattenData.find(function (v) {
          return v[valueKey] === value[i];
        });
        if (!item) {
          return 0; // continue
        }
        var sv = splitValue(item, true, value);
        tempRemovedValue = uniq(tempRemovedValue.concat(sv.removedValue));

        // Get all relevant values
        nextValue = uniq(nextValue.concat(sv.value));
      },
      _ret;
    for (var i = 0; i < value.length; i++) {
      _ret = _loop2(i);
      if (_ret === 0) continue;
    }

    // Finally traverse all nextValue, and delete if its parent node is also nextValue
    return nextValue.filter(function (v) {
      var item = flattenData.find(function (n) {
        return n[valueKey] === v;
      });
      if (item !== null && item !== void 0 && item.parent && nextValue.some(function (v) {
        var _item$parent;
        return v === ((_item$parent = item.parent) === null || _item$parent === void 0 ? void 0 : _item$parent[valueKey]);
      })) {
        return false;
      }
      return true;
    });
  }, [cascade, flattenData, splitValue, valueKey]);
  var _useState = useState(transformValue(valueProp) || []),
    value = _useState[0],
    setValue = _useState[1];
  useEffect(function () {
    // Update value when valueProp is updated.
    setValue(transformValue(valueProp) || []);
  }, [transformValue, valueProp]);
  var handleCheck = useEventCallback(function (node, event, checked) {
    var nodeValue = node[valueKey];
    var nextValue = [];
    if (cascade) {
      nextValue = splitValue(node, checked, value).value;
    } else {
      nextValue = [].concat(value);
      if (checked) {
        nextValue.push(nodeValue);
      } else {
        nextValue = nextValue.filter(function (n) {
          return n !== nodeValue;
        });
      }
    }
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
    onCheck === null || onCheck === void 0 || onCheck(nextValue, node, checked, event);
  });
  return {
    value: value,
    setValue: setValue,
    splitValue: splitValue,
    handleCheck: handleCheck
  };
}
export default useCascadeValue;