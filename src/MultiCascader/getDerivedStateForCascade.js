//@flow

import { shallowEqual } from 'rsuite-utils/lib/utils';
import stringToObject from '../utils/stringToObject';

function getDerivedStateForCascade(
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

export default getDerivedStateForCascade;
