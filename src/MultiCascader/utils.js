//@flow

import _ from 'lodash';
import stringToObject from '../utils/stringToObject';

export default function(props) {
  const { labelKey, valueKey, childrenKey } = props;

  function getDerivedStateForCascade(
    nextProps: Props,
    prevState: any,
    selectNodeValue?: any,
    newChildren?: Array<any>
  ) {
    const { data, value } = nextProps;
    const activeItemValue = selectNodeValue || prevState.selectNode;
    const nextItems = [];
    const nextPathItems = [];
    const findNode = items => {
      for (let i = 0; i < items.length; i += 1) {
        items[i] = stringToObject(items[i], labelKey, valueKey);
        let children = items[i][childrenKey];

        if (items[i][valueKey] === activeItemValue) {
          return {
            items,
            active: items[i]
          };
        } else if (children) {
          let v = findNode(children);
          if (v) {
            nextItems.push(
              children.map(item => ({
                ...stringToObject(item, labelKey, valueKey),
                parent: items[i]
              }))
            );
            nextPathItems.push(v.active);
            return {
              items,
              active: items[i]
            };
          }
        }
      }
      return null;
    };

    const activeItem = findNode(data);

    nextItems.push(data);

    if (activeItem) {
      nextPathItems.push(activeItem.active);
    }

    /**
     * 如果是异步更新 data 后，获取到的一个 selectNodeValue，则不更新 activePaths
     * 但是需要更新 items， 因为这里的目的就是把异步更新后的的数据展示出来
     */
    const cascadePathItems = nextPathItems.reverse();
    if (selectNodeValue) {
      return {
        items:
          newChildren && newChildren.length
            ? [...nextItems.reverse(), newChildren]
            : nextItems.reverse(),
        tempActivePaths: cascadePathItems
      };
    }

    return {
      items: nextItems.reverse(),
      activePaths: cascadePathItems
    };
  }

  /**
   * 获取一个节点的所有子节点的值
   * @param {*} item
   * @param {*} uncheckableItemValues
   */
  function getChildrenValue(item: Object, uncheckableItemValues: Array<any>) {
    let values = [];

    if (!item[childrenKey]) {
      return values;
    }

    item[childrenKey].forEach(n => {
      if (!uncheckableItemValues.some(v => v === n[valueKey])) {
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
  function getParents(item: Object, uncheckableItemValues: Array<any>) {
    let parents = [];

    if (!item.parent) {
      return parents;
    }

    parents.push(item.parent);
    parents = parents.concat(getParents(item.parent));

    return parents;
  }

  /**
   * 在 value 中的值存在级联的情况下
   * 通过 value 重新计算出一个新的 value
   */
  function transformValue(value, flattenData, uncheckableItemValues) {
    let tempRemovedValue = [];
    let nextValue = [];

    for (let i = 0; i < value.length; i++) {
      // 如果当前 value 中的值已经在被删除列表中则不处理
      if (tempRemovedValue.some(v => v === value[i])) {
        continue;
      }

      let sv = splitValue(
        flattenData.find(v => v[valueKey] === value[i]),
        true,
        value,
        uncheckableItemValues
      );

      tempRemovedValue = _.uniq(tempRemovedValue.concat(sv.removedValue));

      // 获取到所有相关的值
      nextValue = _.uniq(nextValue.concat(sv.value));
    }

    // 最后遍历所有的 nextValue, 如果它的父节点也在nextValue则删除
    return nextValue.filter(v => {
      const item = flattenData.find(n => n[valueKey] === v);
      if (item.parent && nextValue.some(v => v === item.parent[valueKey])) {
        return false;
      }
      return true;
    });
  }

  /**
   * 拆分值
   * @param {*} item
   * @param {*} checked
   * @param {*} value
   * @param {*} uncheckableItemValues
   */
  function splitValue(
    item: Object,
    checked: boolean,
    value: Array<any>,
    uncheckableItemValues: Array<any>
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
        let isCheckableParent = !uncheckableItemValues.some(v => v === parents[i][valueKey]);

        if (isCheckableParent) {
          let isCheckAll = parents[i][childrenKey]
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

    return {
      value: _.uniq(nextValue),
      removedValue: _.uniq(removedValue)
    };
  }

  /**
   * 删除一个节点下所有已选择的值
   * @param {*} value
   * @param {*} item
   */
  function removeAllChildrenValue(value, item) {
    let removedValue = [];
    if (!item[childrenKey]) {
      return;
    }

    item[childrenKey].forEach(n => {
      removedValue = removedValue.concat(_.remove(value, v => v === n[valueKey]));
      if (n[childrenKey]) {
        removeAllChildrenValue(n, value);
      }
    });
    return removedValue;
  }

  function getOtherItemValuesByUnselectChild(item, value) {
    const parentValues = [];
    const itemValues = [];

    // 通过 value 找到当前节点的父节点
    function findParent(item) {
      parentValues.push(item[valueKey]);
      if (value.some(v => v === item[valueKey])) {
        return item;
      }
      if (item.parent) {
        let p = findParent(item.parent);
        if (p) {
          return p;
        }
      }
      return null;
    }

    // 通过父节点
    function pushChildValue(item) {
      if (!item[childrenKey]) {
        return;
      }
      item[childrenKey].forEach(n => {
        itemValues.push(n[valueKey]);

        if (parentValues.some(v => v === n[valueKey]) && n[childrenKey]) {
          pushChildValue(n);
        }
      });
    }

    const parent = findParent(item);

    if (!parent) {
      return [];
    }

    pushChildValue(parent);

    return itemValues;
  }

  /**
   * 扁平化一个树结构
   * @param {*} data
   */
  function flattenNodes(data) {
    const flattenItems = [];

    function loop(data, parent) {
      if (!_.isArray(data)) {
        return;
      }

      data.forEach(item => {
        flattenItems.push({
          ...item,
          parent
        });

        if (item[childrenKey]) {
          loop(item[childrenKey], item);
        }
      });
    }

    loop(data, null);

    return flattenItems;
  }

  return {
    getDerivedStateForCascade,
    getChildrenValue,
    splitValue,
    transformValue,
    flattenNodes
  };
}
