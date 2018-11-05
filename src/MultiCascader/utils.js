//@flow

import _ from 'lodash';
import { shallowEqual } from 'rsuite-utils/lib/utils';
import stringToObject from '../utils/stringToObject';

export function getDerivedStateForCascade(
  nextProps: Props,
  prevState: any,
  selectNodeValue?: any,
  newChildren?: Array<any>
) {
  const { data, labelKey, valueKey, childrenKey, value } = nextProps;
  const activeItemValue = selectNodeValue || prevState.selectNode;
  const nextItems = [];
  const nextPathItems = [];
  const findNode = items => {
    for (let i = 0; i < items.length; i += 1) {
      items[i] = stringToObject(items[i], labelKey, valueKey);
      let children = items[i][childrenKey];

      if (shallowEqual(items[i][valueKey], activeItemValue)) {
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
      items: [...nextItems.reverse(), newChildren],
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
 * @param {*} props
 */
export function getChildrenValue(item: Object, uncheckableItemValues: Array<any>, props: Props) {
  let values = [];
  const { childrenKey, valueKey } = props;

  if (!item[childrenKey]) {
    return values;
  }

  item[childrenKey].forEach(n => {
    if (!uncheckableItemValues.some(v => v === n[valueKey])) {
      values.push(n[valueKey]);
    }
    values = values.concat(getChildrenValue(n, uncheckableItemValues, props));
  });

  return values;
}

/**
 * 获取一个节点的所有父辈节点
 * @param {*} item
 * @param {*} uncheckableItemValues
 */
export function getParents(item: Object, uncheckableItemValues: Array<any>) {
  let parents = [];

  if (!item.parent) {
    return parents;
  }

  parents.push(item.parent);
  parents = parents.concat(getParents(item.parent));

  return parents;
}

/**
 * 获取所有级联的节点
 * @param {*} item
 * @param {*} checked
 * @param {*} value
 * @param {*} props
 */
export function getCheckedItemsByCascade(
  item: Object,
  checked: boolean,
  value: Array<any>,
  props: Props
) {
  const { valueKey, childrenKey, uncheckableItemValues } = props;
  const itemValue = item[valueKey];
  const childrenValue = getChildrenValue(item, uncheckableItemValues, props);
  const parents = getParents(item);

  if (checked) {
    value.push(itemValue);
    value = value.concat(childrenValue);

    /**
     * 遍历当前节点所有祖宗节点
     * 然后判断这些节点的子节点是否是否全部被选中，则自身也要被选中
     */
    for (let i = 0, isContinue = true; i < parents.length && isContinue; i++) {
      let isCheckAll = parents[i][childrenKey]
        // 过滤掉被标识为不可选的选项
        .filter(n => !uncheckableItemValues.some(v => v === n[valueKey]))
        // 检查是否所有节点都被选中
        .every(n => value.some(v => v === n[valueKey]));

      if (isCheckAll) {
        value.push(parents[i][valueKey]);
      } else {
        /**
         * 如果 parents[i] 下的子节点没有全选，
         * 那它祖宗节点肯定不会被选中，则没必要再继续循环。
         */
        isContinue = false;
      }
    }
  } else {
    value = value.filter(n => !shallowEqual(n, itemValue));
    const tempValue = childrenValue.concat(parents.map(item => item[valueKey]));

    // 删除相关的子父节点
    _.remove(value, item => tempValue.some(n => n === item));
  }

  return _.uniq(value);
}

/**
 * 扁平化一个树结构
 * @param {*} data
 * @param {*} props
 */
export function flattenNodes(data, props) {
  const flattenItems = [];
  const { childrenKey } = props;

  function recursive(data, parent) {
    if (!_.isArray(data)) {
      return;
    }

    data.forEach(item => {
      flattenItems.push({
        ...item,
        parent
      });

      if (item[childrenKey]) {
        recursive(item[childrenKey], item);
      }
    });
  }

  recursive(data, null);

  return flattenItems;
}
