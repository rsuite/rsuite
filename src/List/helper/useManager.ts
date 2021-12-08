import { useCallback, useRef } from 'react';
import _ from 'lodash';
import { Offset } from '../../@types/common';

export type Collection = string | number;

export interface ManagedItem {
  node: HTMLElement;
  edgeOffset: Offset | null;
  info: {
    collection: Collection;
    index?: number;
    disabled?: boolean;
  };
}

const useManager = () => {
  const collectionMapRef = useRef<Record<Collection, ManagedItem[]>>({});
  const listItemRegister = useCallback((item: ManagedItem) => {
    const collection = item.info.collection;
    if (!Array.isArray(collectionMapRef.current[collection])) {
      // reset collection
      collectionMapRef.current[collection] = [];
    }
    collectionMapRef.current[collection].push(item);
    return {
      unregister: () => {
        const index = collectionMapRef.current[collection].indexOf(item);
        if (index !== -1) {
          collectionMapRef.current[collection].splice(index, 1);
        }
      }
    };
  }, []);
  const getManagedItem = useCallback((node: HTMLElement) => {
    const allItems = _.flatten(Object.values(collectionMapRef.current));
    return allItems.find(managerRef => managerRef.node === node);
  }, []);
  const getOrderedItems = useCallback(collection => {
    return collection != null
      ? [...collectionMapRef.current[collection]].sort(
          (nodeInfo1, nodeInfo2) => Number(nodeInfo1.info.index) - Number(nodeInfo2.info.index)
        )
      : [];
  }, []);
  return {
    listItemRegister,
    getManagedItem,
    getOrderedItems
  };
};

export default useManager;
