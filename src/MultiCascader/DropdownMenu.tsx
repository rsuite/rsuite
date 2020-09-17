import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import shallowEqual from '../utils/shallowEqual';

import { getUnhandledProps, prefix } from '../utils';
import { DropdownMenuCheckItem } from '../Picker';
import createUtils, { UtilType } from './utils';

export interface DropdownMenuProps {
  classPrefix: string;
  data: any[];
  disabledItemValues: any[];
  value?: any[];
  childrenKey: string;
  valueKey: string;
  labelKey: string;
  menuWidth: number;
  menuHeight: number | string;
  className?: string;
  cascade?: boolean;
  cascadeItems: any[];
  cascadePathItems: any[];
  uncheckableItemValues: any[];
  renderMenuItem?: (itemLabel: React.MouseEventHandler, item: object) => React.ReactNode;
  renderMenu?: (children: any[], menu: React.ReactNode, parentNode?: object) => React.ReactNode;
  onSelect?: (
    node: any,
    cascadeItems: any[],
    activePaths: any[],
    event: React.SyntheticEvent<any>
  ) => void;
  onCheck?: (value: any, event: React.SyntheticEvent<any>, checked: boolean) => void;
}

export const dropdownMenuPropTypes = {
  classPrefix: PropTypes.string,
  data: PropTypes.array,
  disabledItemValues: PropTypes.array,
  value: PropTypes.array,
  childrenKey: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  cascade: PropTypes.bool,
  cascadeItems: PropTypes.array,
  cascadePathItems: PropTypes.array,
  uncheckableItemValues: PropTypes.array,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func
};

class DropdownMenu extends React.Component<DropdownMenuProps> {
  static propTypes = dropdownMenuPropTypes;
  static defaultProps = {
    data: [],
    disabledItemValues: [],
    uncheckableItemValues: [],
    cascadeItems: [],
    cascadePathItems: [],
    menuWidth: 156,
    menuHeight: 200,
    childrenKey: 'children',
    valueKey: 'value',
    labelKey: 'label'
  };

  utils: UtilType = {};

  constructor(props) {
    super(props);
    this.utils = createUtils(props);
  }

  getCascadeItems(items: any[], layer: number, node: any, isLeafNode: boolean) {
    const { cascadeItems = [], cascadePathItems } = this.props;
    const nextItems = [];
    const nextPathItems = [];

    for (let i = 0; i < cascadeItems.length && i < layer; i += 1) {
      nextItems.push(cascadeItems[i]);
      if (i < layer - 1 && cascadePathItems) {
        nextPathItems.push(cascadePathItems[i]);
      }
    }

    nextPathItems.push(node);
    if (!isLeafNode) {
      nextItems.push(items);
    }

    return {
      cascadeItems: nextItems,
      cascadePathItems: nextPathItems
    };
  }

  menus = [];

  handleSelect = (layer: number, node: any, event: React.SyntheticEvent<any>) => {
    const { onSelect, childrenKey } = this.props;
    const children = node[childrenKey];
    const isLeafNode = _.isUndefined(children) || _.isNull(children);
    const items = (children || []).map(item => ({
      ...item,
      parent: node
    }));

    const { cascadeItems, cascadePathItems } = this.getCascadeItems(
      items,
      layer + 1,
      node,
      isLeafNode
    );

    onSelect?.(node, cascadeItems, cascadePathItems, event);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCascadeNode(node: any, index: number, layer: number, focus: boolean, uncheckable: boolean) {
    const {
      value = [],
      valueKey,
      labelKey,
      childrenKey,
      disabledItemValues,
      renderMenuItem,
      onCheck,
      cascade
    } = this.props;

    const children = node[childrenKey];
    const itemValue = node[valueKey];
    const label = node[labelKey];

    const disabled = disabledItemValues.some(disabledValue =>
      shallowEqual(disabledValue, itemValue)
    );

    // Use `value` in keys when If `value` is string or number
    const onlyKey = _.isString(itemValue) || _.isNumber(itemValue) ? itemValue : index;
    let active = value.some(v => v === itemValue);

    if (cascade) {
      active = active || this.utils.isSomeParentChecked(node, value);
    }

    value.some(item => shallowEqual(item, itemValue));
    const classes = classNames({
      [this.addPrefix('cascader-menu-has-children')]: children
    });

    return (
      <DropdownMenuCheckItem
        key={`${layer}-${onlyKey}`}
        disabled={disabled}
        active={active}
        focus={focus}
        value={node}
        className={classes}
        componentClass="li"
        indeterminate={cascade && !active && this.utils.isSomeChildChecked(node, value)}
        onSelectItem={this.handleSelect.bind(this, layer, node)}
        onCheck={onCheck}
        checkable={!uncheckable}
      >
        {renderMenuItem ? renderMenuItem(label, node) : label}
        {children ? <span className={this.addPrefix('cascader-menu-caret')} /> : null}
      </DropdownMenuCheckItem>
    );
  }

  renderCascade() {
    const {
      menuWidth,
      menuHeight,
      valueKey,
      renderMenu,
      cascadeItems = [],
      cascadePathItems,
      uncheckableItemValues
    } = this.props;

    const styles = {
      width: cascadeItems.length * menuWidth
    };
    const columnStyles = {
      height: menuHeight,
      width: menuWidth
    };
    const cascadeNodes = cascadeItems.map((children, layer) => {
      let uncheckableCount = 0;
      const onlyKey = `${layer}_${children.length}`;
      const menu = (
        <ul>
          {children.map((item, index) => {
            const uncheckable = uncheckableItemValues.some(uncheckableValue =>
              shallowEqual(uncheckableValue, item[valueKey])
            );
            if (uncheckable) {
              uncheckableCount++;
            }
            return this.renderCascadeNode(
              item,
              index,
              layer,
              cascadePathItems[layer] &&
                shallowEqual(cascadePathItems[layer][valueKey], item[valueKey]),
              uncheckable
            );
          })}
        </ul>
      );

      const parentNode = cascadePathItems[layer - 1];
      const columnClasses = classNames(this.addPrefix('cascader-menu-column'), {
        [this.addPrefix('cascader-menu-column-uncheckable')]: uncheckableCount === children.length
      });
      const node = (
        <div
          key={onlyKey}
          className={columnClasses}
          ref={ref => (this.menus[layer] = ref)}
          style={columnStyles}
        >
          {renderMenu ? renderMenu(children, menu, parentNode) : menu}
        </div>
      );
      return node;
    });
    return <div style={styles}>{cascadeNodes}</div>;
  }

  render() {
    const { className, ...rest } = this.props;
    const classes = classNames(this.addPrefix('cascader-menu-items'), className);
    const unhandled = getUnhandledProps(DropdownMenu, rest);

    return (
      <div {...unhandled} className={classes}>
        {this.renderCascade()}
      </div>
    );
  }
}

export default DropdownMenu;
