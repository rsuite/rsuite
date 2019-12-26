"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _uniq2 = _interopRequireDefault(require("lodash/uniq"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

function _default(props) {
  var valueKey = props.valueKey,
      childrenKey = props.childrenKey;
  /**
   * 获取一个节点的所有子节点的值
   * @param {*} item
   * @param {*} uncheckableItemValues
   */

  function getChildrenValue(item, uncheckableItemValues) {
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

      values = values.concat(getChildrenValue(n, uncheckableItemValues));
    });
    return values;
  }
  /**
   * 获取一个节点的所有父辈节点
   * @param {*} item
   * @param {*} uncheckableItemValues
   */


  function getParents(item) {
    var parents = [];

    if (!item.parent) {
      return parents;
    }

    parents.push(item.parent);
    parents = parents.concat(getParents(item.parent));
    return parents;
  }
  /**
   * 删除一个节点下所有已选择的值
   * @param {*} value
   * @param {*} item
   */


  function removeAllChildrenValue(value, item) {
    var removedValue = [];

    if (!item[childrenKey]) {
      return;
    }

    item[childrenKey].forEach(function (n) {
      removedValue = removedValue.concat((0, _remove2.default)(value, function (v) {
        return v === n[valueKey];
      }));

      if (n[childrenKey]) {
        removeAllChildrenValue(value, n);
      }
    });
    return removedValue;
  }

  function getOtherItemValuesByUnselectChild(itemNode, value) {
    var parentValues = [];
    var itemValues = []; // 通过 value 找到当前节点的父节点

    function findParent(item) {
      parentValues.push(item[valueKey]);

      if (value.some(function (v) {
        return v === item[valueKey];
      })) {
        return item;
      }

      if (item.parent) {
        var p = findParent(item.parent);

        if (p) {
          return p;
        }
      }

      return null;
    } // 通过父节点获取子节点


    function pushChildValue(item) {
      if (!item[childrenKey]) {
        return;
      }

      item[childrenKey].forEach(function (n) {
        //判断是否是直属父级
        if (parentValues.some(function (v) {
          return v === n[valueKey];
        }) && n[childrenKey]) {
          pushChildValue(n);
        } else if (n[valueKey] !== itemNode[valueKey]) {
          itemValues.push(n[valueKey]);
        }
      });
    }

    var parent = findParent(itemNode);

    if (!parent) {
      return [];
    }

    pushChildValue(parent);
    return itemValues;
  }
  /**
   * 拆分值
   * @param {*} item
   * @param {*} checked
   * @param {*} value
   * @param {*} uncheckableItemValues
   */


  function splitValue(item, checked, value, uncheckableItemValues) {
    if (uncheckableItemValues === void 0) {
      uncheckableItemValues = [];
    }

    var itemValue = item[valueKey];
    var childrenValue = getChildrenValue(item, uncheckableItemValues);
    var parents = getParents(item);
    var nextValue = [].concat(value);
    var removedValue = [];

    if (checked) {
      nextValue.push(itemValue); // 删除当前节点下所有的值

      removedValue = removedValue.concat(removeAllChildrenValue(nextValue, item));
      /**
       * 遍历当前节点所有祖宗节点
       * 然后判断这些节点的子节点是否是否全部被选中，则自身也要被选中
       */

      var _loop = function _loop(i) {
        // 父节点是否可以选择
        var isCheckableParent = !uncheckableItemValues.some(function (v) {
          return v === parents[i][valueKey];
        });

        if (isCheckableParent) {
          var isCheckAll = parents[i][childrenKey] // 过滤掉被标识为不可选的选项
          .filter(function (n) {
            return !uncheckableItemValues.some(function (v) {
              return v === n[valueKey];
            });
          }) // 检查是否所有节点都被选中
          .every(function (n) {
            return nextValue.some(function (v) {
              return v === n[valueKey];
            });
          });

          if (isCheckAll) {
            // 添加父节点值
            nextValue.push(parents[i][valueKey]); // 删除父节点下所有的值

            removedValue = removedValue.concat(removeAllChildrenValue(nextValue, parents[i]));
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
      nextValue = nextValue.concat(getOtherItemValuesByUnselectChild(item, nextValue)); // 删除相关的子父节点

      removedValue = (0, _remove2.default)(nextValue, function (v) {
        // 删除自己
        if (v === itemValue) {
          return true;
        }

        return tempValue.some(function (n) {
          return n === v;
        });
      });
    }

    var uniqValue = (0, _uniq2.default)(nextValue);
    var uniqRemovedValue = (0, _uniq2.default)(removedValue);
    return {
      value: uniqValue,
      removedValue: uniqRemovedValue
    };
  }
  /**
   * 在 value 中的值存在级联的情况下
   * 通过 value 重新计算出一个新的 value
   */


  function transformValue(value, flattenData, uncheckableItemValues) {
    var tempRemovedValue = [];
    var nextValue = [];

    var _loop2 = function _loop2(i) {
      // 如果当前 value 中的值已经在被删除列表中则不处理
      if (tempRemovedValue.some(function (v) {
        return v === value[i];
      })) {
        return "continue";
      }

      var item = flattenData.find(function (v) {
        return v[valueKey] === value[i];
      });

      if (!item) {
        return "continue";
      }

      var sv = splitValue(item, true, value, uncheckableItemValues);
      tempRemovedValue = (0, _uniq2.default)(tempRemovedValue.concat(sv.removedValue)); // 获取到所有相关的值

      nextValue = (0, _uniq2.default)(nextValue.concat(sv.value));
    };

    for (var i = 0; i < value.length; i++) {
      var _ret = _loop2(i);

      if (_ret === "continue") continue;
    } // 最后遍历所有的 nextValue, 如果它的父节点也在nextValue则删除


    return nextValue.filter(function (v) {
      var item = flattenData.find(function (n) {
        return n[valueKey] === v;
      });

      if ((item === null || item === void 0 ? void 0 : item.parent) && nextValue.some(function (v) {
        return v === item.parent[valueKey];
      })) {
        return false;
      }

      return true;
    });
  }

  function getItems(selectNode, flattenData) {
    var items = [];

    function findParent(item) {
      if (item[childrenKey]) {
        items.push(item[childrenKey]);
      }

      if (item.parent) {
        findParent(item.parent);
      }
    }

    if (selectNode) {
      findParent(selectNode);
    }

    items.push(flattenData.filter(function (item) {
      return item.parent === null;
    }));
    return items.reverse();
  }

  function isSomeChildChecked(node, value) {
    if (value === void 0) {
      value = [];
    }

    if (!node[childrenKey] || !value) {
      return false;
    }

    return node[childrenKey].some(function (child) {
      var _child$childrenKey;

      if (value.some(function (n) {
        return n === child[valueKey];
      })) {
        return true;
      }

      if ((_child$childrenKey = child[childrenKey]) === null || _child$childrenKey === void 0 ? void 0 : _child$childrenKey.length) {
        return isSomeChildChecked(child, value);
      }

      return false;
    });
  }

  function isSomeParentChecked(node, value) {
    if (value === void 0) {
      value = [];
    }

    if (!value) {
      return false;
    }

    if (value.some(function (n) {
      return n === node[valueKey];
    })) {
      return true;
    }

    if (node.parent) {
      return isSomeParentChecked(node.parent, value);
    }

    return false;
  }

  return {
    removeAllChildrenValue: removeAllChildrenValue,
    getChildrenValue: getChildrenValue,
    splitValue: splitValue,
    transformValue: transformValue,
    getOtherItemValuesByUnselectChild: getOtherItemValuesByUnselectChild,
    getItems: getItems,
    isSomeChildChecked: isSomeChildChecked,
    isSomeParentChecked: isSomeParentChecked
  };
}

module.exports = exports.default;