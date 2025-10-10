'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _flatten2 = _interopRequireDefault(require("lodash/flatten"));
var _react = require("react");
var useManager = function useManager() {
  var collectionMapRef = (0, _react.useRef)({});
  var listItemRegister = (0, _react.useCallback)(function (item) {
    var collection = item.info.collection;
    if (!Array.isArray(collectionMapRef.current[collection])) {
      // reset collection
      collectionMapRef.current[collection] = [];
    }
    collectionMapRef.current[collection].push(item);
    return {
      unregister: function unregister() {
        var index = collectionMapRef.current[collection].indexOf(item);
        if (index !== -1) {
          collectionMapRef.current[collection].splice(index, 1);
        }
      }
    };
  }, []);
  var getManagedItem = (0, _react.useCallback)(function (node) {
    var allItems = (0, _flatten2.default)(Object.values(collectionMapRef.current));
    return allItems.find(function (managerRef) {
      return managerRef.node === node;
    });
  }, []);
  var getOrderedItems = (0, _react.useCallback)(function (collection) {
    return collection != null ? [].concat(collectionMapRef.current[collection]).sort(function (nodeInfo1, nodeInfo2) {
      return Number(nodeInfo1.info.index) - Number(nodeInfo2.info.index);
    }) : [];
  }, []);
  return {
    listItemRegister: listItemRegister,
    getManagedItem: getManagedItem,
    getOrderedItems: getOrderedItems
  };
};
var _default = exports.default = useManager;