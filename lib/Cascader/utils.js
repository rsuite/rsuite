"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getDerivedStateForCascade = getDerivedStateForCascade;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("rsuite-utils/lib/utils");

var _stringToObject = _interopRequireDefault(require("../utils/stringToObject"));

function getDerivedStateForCascade(nextProps, prevState, selectNodeValue, newChildren) {
  var data = nextProps.data,
      labelKey = nextProps.labelKey,
      valueKey = nextProps.valueKey,
      childrenKey = nextProps.childrenKey,
      value = nextProps.value;
  var activeItemValue = selectNodeValue || (typeof value === 'undefined' ? prevState.value : value);
  var nextItems = [];
  var nextPathItems = [];

  var findNode = function findNode(items) {
    var _loop = function _loop(i) {
      items[i] = (0, _stringToObject.default)(items[i], labelKey, valueKey);
      var children = items[i][childrenKey];

      if ((0, _utils.shallowEqual)(items[i][valueKey], activeItemValue)) {
        return {
          v: {
            items: items,
            active: items[i]
          }
        };
      } else if (children) {
        var v = findNode(children);

        if (v) {
          nextItems.push(children.map(function (item) {
            return (0, _extends2.default)({}, (0, _stringToObject.default)(item, labelKey, valueKey), {
              parent: items[i]
            });
          }));
          nextPathItems.push(v.active);
          return {
            v: {
              items: items,
              active: items[i]
            }
          };
        }
      }
    };

    for (var i = 0; i < items.length; i += 1) {
      var _ret = _loop(i);

      if (typeof _ret === "object") return _ret.v;
    }

    return null;
  };

  var activeItem = findNode(data);
  nextItems.push(data);

  if (activeItem) {
    nextPathItems.push(activeItem.active);
  }
  /**
   * 如果是异步更新 data 后，获取到的一个 selectNodeValue，则不更新 activePaths
   * 但是需要更新 items， 因为这里的目的就是把异步更新后的的数据展示出来
   */


  var cascadePathItems = nextPathItems.reverse();

  if (newChildren) {
    return {
      items: [].concat(nextItems.reverse(), [newChildren]),
      tempActivePaths: cascadePathItems
    };
  }

  return {
    items: nextItems.reverse(),
    tempActivePaths: null,
    activePaths: cascadePathItems
  };
}