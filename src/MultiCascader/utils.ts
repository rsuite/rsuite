import _ from 'lodash';

export interface ItemType {
  valueKey: string;
  childrenKey: string;
  parent?: ItemType;
}

export interface UtilType {
  removeAllChildrenValue?: (value: any, item: ItemType) => any;
  getChildrenValue?: (item: ItemType, uncheckableItemValues?: ItemType[]) => any[];
  splitValue?: (
    item: ItemType,
    checked: boolean,
    value: any[],
    uncheckableItemValues: any[]
  ) => {
    value: any;
    removedValue: any;
  };
  transformValue?: (
    value: ItemType[],
    flattenData: ItemType[],
    uncheckableItemValues?: ItemType[]
  ) => ItemType[];
  getOtherItemValuesByUnselectChild?: (itemNode: ItemType, value: any) => any;
  getItems?: (selectNode: any, flattenData: any[]) => any[];
  isSomeChildChecked?: (node: any, value: any[]) => boolean;
  isSomeParentChecked?: (node: any, value: any[]) => boolean;
}

export default function(props: any): UtilType {
  const { valueKey, childrenKey } = props;

  /**
   * 获取一个节点的所有子节点的值
   * @param {*} item
   * @param {*} uncheckableItemValues
   */
  function getChildrenValue(item: ItemType, uncheckableItemValues?: ItemType[]) {
    let values = [];

    if (!item[childrenKey]) {
      return values;
    }

    item[childrenKey].forEach(n => {
      if (uncheckableItemValues && !uncheckableItemValues.some(v => v === n[valueKey])) {
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
  function getParents(item: ItemType) {
    let parents = [];

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
  function removeAllChildrenValue(value: any, item: ItemType) {
    let removedValue = [];
    if (!item[childrenKey]) {
      return;
    }

    item[childrenKey].forEach(n => {
      removedValue = removedValue.concat(_.remove(value, v => v === n[valueKey]));
      if (n[childrenKey]) {
        removeAllChildrenValue(value, n);
      }
    });
    return removedValue;
  }

  function getOtherItemValuesByUnselectChild(itemNode: ItemType, value: any) {
    const parentValues = [];
    const itemValues = [];

    // 通过 value 找到当前节点的父节点
    function findParent(item) {
      parentValues.push(item[valueKey]);
      if (value.some(v => v === item[valueKey])) {
        return item;
      }
      if (item.parent) {
        const p = findParent(item.parent);
        if (p) {
          return p;
        }
      }
      return null;
    }

    // 通过父节点获取子节点
    function pushChildValue(item) {
      if (!item[childrenKey]) {
        return;
      }
      item[childrenKey].forEach(n => {
        //判断是否是直属父级
        if (parentValues.some(v => v === n[valueKey]) && n[childrenKey]) {
          pushChildValue(n);
        } else if (n[valueKey] !== itemNode[valueKey]) {
          itemValues.push(n[valueKey]);
        }
      });
    }

    const parent = findParent(itemNode);

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
  function splitValue(
    item: ItemType,
    checked: boolean,
    value: any[],
    uncheckableItemValues: any[] = []
  ) {
    const itemValue = item[valueKey];
    const childrenValue = getChildrenValue(item, uncheckableItemValues);
    const parents = getParents(item);

    let nextValue = [...value];
    let removedValue = [];

    if (checked) {
      nextValue.push(itemValue);

      // 删除当前节点下所有的值
      removedValue = removedValue.concat(removeAllChildrenValue(nextValue, item));

      /**
       * 遍历当前节点所有祖宗节点
       * 然后判断这些节点的子节点是否是否全部被选中，则自身也要被选中
       */
      for (let i = 0; i < parents.length; i++) {
        // 父节点是否可以选择
        const isCheckableParent = !uncheckableItemValues.some(v => v === parents[i][valueKey]);

        if (isCheckableParent) {
          const isCheckAll = parents[i][childrenKey]
            // 过滤掉被标识为不可选的选项
            .filter(n => !uncheckableItemValues.some(v => v === n[valueKey]))
            // 检查是否所有节点都被选中
            .every(n => nextValue.some(v => v === n[valueKey]));

          if (isCheckAll) {
            // 添加父节点值
            nextValue.push(parents[i][valueKey]);

            // 删除父节点下所有的值
            removedValue = removedValue.concat(removeAllChildrenValue(nextValue, parents[i]));
          }
        }
      }
    } else {
      const tempValue = childrenValue.concat(parents.map(item => item[valueKey]));

      nextValue = nextValue.concat(getOtherItemValuesByUnselectChild(item, nextValue));

      // 删除相关的子父节点
      removedValue = _.remove(nextValue, v => {
        // 删除自己
        if (v === itemValue) {
          return true;
        }
        return tempValue.some(n => n === v);
      });
    }

    const uniqValue: any[] = _.uniq(nextValue);
    const uniqRemovedValue: any[] = _.uniq(removedValue);

    return {
      value: uniqValue,
      removedValue: uniqRemovedValue
    };
  }

  /**
   * 在 value 中的值存在级联的情况下
   * 通过 value 重新计算出一个新的 value
   */
  function transformValue(
    value: ItemType[],
    flattenData: ItemType[],
    uncheckableItemValues?: ItemType[]
  ): ItemType[] {
    let tempRemovedValue = [];
    let nextValue = [];

    for (let i = 0; i < value.length; i++) {
      // 如果当前 value 中的值已经在被删除列表中则不处理
      if (tempRemovedValue.some(v => v === value[i])) {
        continue;
      }

      const item: ItemType = flattenData.find(v => v[valueKey] === value[i]);
      if (!item) {
        continue;
      }
      const sv = splitValue(item, true, value, uncheckableItemValues);
      tempRemovedValue = _.uniq(tempRemovedValue.concat(sv.removedValue));

      // 获取到所有相关的值
      nextValue = _.uniq(nextValue.concat(sv.value));
    }

    // 最后遍历所有的 nextValue, 如果它的父节点也在nextValue则删除
    return nextValue.filter(v => {
      const item = flattenData.find(n => n[valueKey] === v);
      if (item?.parent && nextValue.some(v => v === item.parent[valueKey])) {
        return false;
      }
      return true;
    });
  }

  function getItems(selectNode: any, flattenData: any[]): any[] {
    const items = [];

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

    items.push(flattenData.filter(item => item.parent === null));

    return items.reverse();
  }

  function isSomeChildChecked(node: any, value: any[] = []) {
    if (!node[childrenKey] || !value) {
      return false;
    }

    return node[childrenKey].some((child: any) => {
      if (value.some(n => n === child[valueKey])) {
        return true;
      }
      if (child[childrenKey]?.length) {
        return isSomeChildChecked(child, value);
      }
      return false;
    });
  }

  function isSomeParentChecked(node: any, value: any[] = []) {
    if (!value) {
      return false;
    }

    if (value.some(n => n === node[valueKey])) {
      return true;
    }

    if (node.parent) {
      return isSomeParentChecked(node.parent, value);
    }

    return false;
  }

  return {
    removeAllChildrenValue,
    getChildrenValue,
    splitValue,
    transformValue,
    getOtherItemValuesByUnselectChild,
    getItems,
    isSomeChildChecked,
    isSomeParentChecked
  };
}
