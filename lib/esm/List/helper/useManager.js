'use client';
import _flatten from "lodash/flatten";
import { useCallback, useRef } from 'react';
var useManager = function useManager() {
  var collectionMapRef = useRef({});
  var listItemRegister = useCallback(function (item) {
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
  var getManagedItem = useCallback(function (node) {
    var allItems = _flatten(Object.values(collectionMapRef.current));
    return allItems.find(function (managerRef) {
      return managerRef.node === node;
    });
  }, []);
  var getOrderedItems = useCallback(function (collection) {
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
export default useManager;