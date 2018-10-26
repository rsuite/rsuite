// @flow

import * as React from 'react';
import { getPosition, scrollTop } from 'dom-lib';
import _ from 'lodash';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';

import { getUnhandledProps, defaultProps, prefix } from '../utils';
import stringToObject from '../utils/stringToObject';
import DropdownMenuItem from '../_picker/DropdownMenuCheckItem';

type DefaultEvent = SyntheticEvent<*>;
type Props = {
  classPrefix: string,
  data: Array<any>,
  disabledItemValues: Array<any>,
  value?: Array<any>,
  childrenKey: string,
  valueKey: string,
  labelKey: string,
  menuWidth: number,
  menuHeight: number,
  className?: string,
  renderMenuItem?: (itemLabel: React.Node, item: Object) => React.Node,
  renderMenu?: (itemLabel: React.Node, item: Object, parentNode: Object) => React.Node,
  onSelect?: (
    node: any,
    cascadeItems: Array<any>,
    activePaths: Array<any>,
    event: DefaultEvent
  ) => void,
  onCheck?: (value: any, event: SyntheticEvent<*>, checked: boolean) => void,
  cascadeItems: Array<any>,
  cascadePathItems: Array<any>,
  uncheckableItemValues: Array<any>
};

class DropdownMenu extends React.Component<Props> {
  static defaultProps = {
    data: [],
    disabledItemValues: [],
    uncheckableItemValues: [],
    cascadeItems: [],
    cascadePathItems: [],
    menuWidth: 120,
    menuHeight: 200,
    childrenKey: 'children',
    valueKey: 'value',
    labelKey: 'label'
  };

  static handledProps = [];

  getCascadeItems(items: Array<any>, layer: number, node: any, isLeafNode: boolean) {
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

  handleSelect = (layer: number, index: number, node: any, event: DefaultEvent) => {
    const { onSelect, childrenKey } = this.props;
    const children = node[childrenKey];
    const isLeafNode = _.isUndefined(children) || _.isNull(children);
    const items = (children || []).map(item => ({
      ...this.stringToObject(item),
      parent: node
    }));

    const { cascadeItems, cascadePathItems } = this.getCascadeItems(
      items,
      layer + 1,
      node,
      isLeafNode
    );

    onSelect && onSelect(node, cascadeItems, cascadePathItems, event);
  };

  stringToObject(value: any) {
    const { labelKey, valueKey } = this.props;
    return stringToObject(value, labelKey, valueKey);
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  isSomeChildChecked(node: Object) {
    const { childrenKey, valueKey, value } = this.props;
    if (!node[childrenKey]) {
      return false;
    }
    return node[childrenKey].some((child: Object) => {
      if (child[childrenKey] && child[childrenKey].length) {
        return this.isSomeChildChecked(child);
      }
      return value.some(n => n === child[valueKey]);
    });
  }

  renderCascadeNode(node: any, index: number, layer: number, focus: boolean) {
    const {
      value,
      valueKey,
      labelKey,
      childrenKey,
      disabledItemValues,
      uncheckableItemValues,
      renderMenuItem,
      onCheck
    } = this.props;

    const children = node[childrenKey];
    const itemValue = node[valueKey];
    const label = node[labelKey];

    const disabled = disabledItemValues.some(disabledValue =>
      shallowEqual(disabledValue, itemValue)
    );

    const uncheckable = uncheckableItemValues.some(uncheckableValue =>
      shallowEqual(uncheckableValue, itemValue)
    );

    // Use `value` in keys when If `value` is string or number
    const onlyKey = _.isString(itemValue) || _.isNumber(itemValue) ? itemValue : index;
    const active = value.some(item => shallowEqual(item, itemValue));
    const classes = classNames({
      [this.addPrefix('cascader-menu-has-children')]: children,
      [this.addPrefix('check-menu-item-indeterminate')]: !active && this.isSomeChildChecked(node)
    });

    return (
      <DropdownMenuItem
        labelComponentClass="div"
        classPrefix={this.addPrefix('check-menu-item')}
        key={`${layer}-${onlyKey}`}
        disabled={disabled}
        active={active}
        focus={focus}
        value={node}
        className={classes}
        onSelectItem={this.handleSelect.bind(this, layer, index)}
        onCheck={onCheck}
        checkable={!uncheckable}
      >
        {renderMenuItem ? renderMenuItem(label, node) : label}
        {children ? <span className={this.addPrefix('cascader-menu-caret')} /> : null}
      </DropdownMenuItem>
    );
  }

  renderCascade() {
    const {
      menuWidth,
      menuHeight,
      valueKey,
      renderMenu,
      cascadeItems = [],
      cascadePathItems
    } = this.props;

    const styles = {
      width: cascadeItems.length * menuWidth
    };
    const cascadeNodes = cascadeItems.map((children, layer) => {
      const onlyKey = `${layer}_${children.length}`;
      const menu = (
        <ul>
          {children.map((item, index) =>
            this.renderCascadeNode(
              item,
              index,
              layer,
              cascadePathItems[layer] &&
                shallowEqual(cascadePathItems[layer][valueKey], item[valueKey])
            )
          )}
        </ul>
      );

      const parentNode = cascadePathItems[layer - 1];
      const node = (
        <div
          key={onlyKey}
          className={this.addPrefix('cascader-menu-column')}
          ref={ref => {
            this.menus[layer] = ref;
          }}
          style={{
            height: menuHeight,
            width: menuWidth
          }}
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
