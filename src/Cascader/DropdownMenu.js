// @flow

import * as React from 'react';
import { getPosition, scrollTop } from 'dom-lib';
import _ from 'lodash';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';

import { getUnhandledProps, defaultProps, prefix } from '../utils';
import stringToObject from '../utils/stringToObject';
import DropdownMenuItem from '../_picker/DropdownMenuItem';

type DefaultEvent = SyntheticEvent<*>;
type Props = {
  classPrefix: string,
  data: any[],
  disabledItemValues: any[],
  activeItemValue?: any,
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
    cascadeItems: any[],
    activePaths: any[],
    isLeafNode: boolean,
    event: DefaultEvent
  ) => void,

  cascadeItems: any[],
  cascadePathItems: any[]
};

class DropdownMenu extends React.Component<Props> {
  static defaultProps = {
    data: [],
    disabledItemValues: [],
    cascadeItems: [],
    cascadePathItems: [],
    menuWidth: 120,
    menuHeight: 200,
    childrenKey: 'children',
    valueKey: 'value',
    labelKey: 'label'
  };

  static handledProps = [];

  componentDidMount() {
    this.scrollToActiveItemTop();
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

    onSelect && onSelect(node, cascadeItems, cascadePathItems, isLeafNode, event);
  };

  stringToObject(value: any) {
    const { labelKey, valueKey } = this.props;
    return stringToObject(value, labelKey, valueKey);
  }

  scrollToActiveItemTop() {
    if (!this.menus) {
      return;
    }
    this.menus.forEach(menu => {
      if (!menu) {
        return;
      }

      let activeItem = menu.querySelector(`.${this.addPrefix('item-focus')}`);

      if (!activeItem) {
        activeItem = menu.querySelector(`.${this.addPrefix('item-active')}`);
      }

      if (activeItem) {
        const position = getPosition(activeItem, menu);
        scrollTop(menu, position.top);
      }
    });
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCascadeNode(node: any, index: number, layer: number, focus: boolean) {
    const {
      activeItemValue,
      valueKey,
      labelKey,
      childrenKey,
      disabledItemValues,
      renderMenuItem
    } = this.props;

    const children = node[childrenKey];
    const value = node[valueKey];
    const label = node[labelKey];

    const disabled = disabledItemValues.some(disabledValue => shallowEqual(disabledValue, value));

    // Use `value` in keys when If `value` is string or number
    const onlyKey = _.isString(value) || _.isNumber(value) ? value : index;

    return (
      <DropdownMenuItem
        classPrefix={this.addPrefix('item')}
        key={`${layer}-${onlyKey}`}
        disabled={disabled}
        active={!_.isUndefined(activeItemValue) && shallowEqual(activeItemValue, value)}
        focus={focus}
        value={node}
        className={children ? this.addPrefix('has-children') : undefined}
        onSelect={this.handleSelect.bind(this, layer, index)}
      >
        {renderMenuItem ? renderMenuItem(label, node) : label}
        {children ? <span className={this.addPrefix('caret')} /> : null}
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
          className={this.addPrefix('column')}
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
    const classes = classNames(this.addPrefix('items'), className);
    const unhandled = getUnhandledProps(DropdownMenu, rest);

    return (
      <div {...unhandled} className={classes}>
        {this.renderCascade()}
      </div>
    );
  }
}

export default DropdownMenu;
