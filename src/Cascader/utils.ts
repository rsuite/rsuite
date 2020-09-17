import shallowEqual from '../utils/shallowEqual';
import stringToObject from '../utils/stringToObject';
import { CascaderProps } from './Cascader.d';

export function getDerivedStateForCascade(
  nextProps: CascaderProps,
  prevState: any,
  selectNodeValue?: any,
  newChildren?: any[]
): {
  items: any[];
  tempActivePaths?: any[];
  activePaths?: any[];
} {
  const { data, labelKey, valueKey, childrenKey, value } = nextProps;
  const activeItemValue =
    selectNodeValue || (typeof value === 'undefined' ? prevState.value : value);
  const nextItems = [];
  const nextPathItems = [];
  const findNode = items => {
    for (let i = 0; i < items.length; i += 1) {
      items[i] = stringToObject(items[i], labelKey, valueKey);
      const children = items[i][childrenKey];

      if (shallowEqual(items[i][valueKey], activeItemValue)) {
        return {
          items,
          active: items[i]
        };
      } else if (children) {
        const v = findNode(children);
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
  if (newChildren) {
    return {
      items: [...nextItems.reverse(), newChildren],
      tempActivePaths: cascadePathItems
    };
  }

  return {
    items: nextItems.reverse(),
    tempActivePaths: null,
    activePaths: cascadePathItems
  };
}
