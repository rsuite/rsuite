import React, { useEffect, useRef } from 'react';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import { shallowEqual, useClassNames, mergeRefs, useCustom, useEventCallback } from '../utils';
import { ListItem, useCombobox } from '../internals/Picker';
import { ItemDataType, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from './Cascader';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';

type SetLike<T = unknown> = {
  has(value: T): boolean;
};

export interface TreeViewProps extends Omit<WithAsProps, 'classPrefix'> {
  classPrefix: string;
  disabledItemValues: ValueType[];
  activeItemValue?: ValueType | null;
  childrenKey: string;
  cascadeData: (readonly ItemDataType[])[];
  loadingItemsSet?: SetLike<ItemDataType>;
  cascadePaths: ItemDataType[];
  valueKey: string;
  labelKey: string;
  menuWidth?: number;
  menuHeight?: number | string;
  renderMenuItem?: (itemLabel: React.ReactNode, item: ItemDataType) => React.ReactNode;
  renderMenu?: (
    items: readonly ItemDataType[],
    menu: React.ReactNode,
    parentNode?: ItemDataType,
    layer?: number
  ) => React.ReactNode;
  onSelect?: (
    node: ItemDataType,
    cascadePaths: ItemDataType[],
    isLeafNode: boolean,
    event: React.MouseEvent
  ) => void;
}

const emptyArray = [];

const TreeView: RsRefForwardingComponent<'div', TreeViewProps> = React.forwardRef(
  (props: TreeViewProps, ref) => {
    const {
      as: Component = 'div',
      activeItemValue,
      classPrefix,
      className,
      childrenKey = 'children',
      disabledItemValues = emptyArray,
      menuWidth = 120,
      menuHeight = 200,
      valueKey = 'value',
      cascadeData = emptyArray,
      cascadePaths = emptyArray,
      loadingItemsSet,
      labelKey = 'label',
      style,
      renderMenu,
      renderMenuItem,
      onSelect,
      ...rest
    } = props;
    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, prefix('items'));
    const rootRef = useRef<HTMLDivElement>();
    const { rtl } = useCustom();
    const { id, labelId, popupType } = useCombobox();

    useEffect(() => {
      const columns = rootRef.current?.querySelectorAll('[data-type="column"]') || [];
      columns.forEach(column => {
        if (!column) {
          return;
        }
        let activeItem = column.querySelector(`.${prefix('item-focus')}`);

        if (!activeItem) {
          activeItem = column.querySelector(`.${prefix('item-active')}`);
        }

        if (activeItem) {
          const position = getPosition(activeItem, column);
          // Let the active option scroll into view.
          scrollTop(column, position?.top);
        }
      });
    }, [prefix]);

    const getCascadePaths = (layer: number, node: ItemDataType) => {
      const paths: ItemDataType[] = [];

      for (let i = 0; i < cascadeData.length && i < layer; i += 1) {
        if (i < layer - 1 && cascadePaths) {
          paths.push(cascadePaths[i]);
        }
      }

      paths.push(node);

      return paths;
    };

    const handleSelect = useEventCallback((layer: number, node: any, event: React.MouseEvent) => {
      const isLeafNode = isNil(node[childrenKey]);
      const cascadePaths = getCascadePaths(layer + 1, node);

      onSelect?.(node, cascadePaths, isLeafNode, event);
    });

    const renderCascadeNode = (nodeProps: {
      node: any;
      index: number;
      layer: number;
      focus: boolean;
      size: number;
    }) => {
      const { node, index, layer, focus, size } = nodeProps;
      const children = node[childrenKey];
      const value = node[valueKey];
      const label = node[labelKey];
      const disabled = disabledItemValues.some(disabledValue => shallowEqual(disabledValue, value));
      const loading = loadingItemsSet?.has(node) ?? false;

      // Use `value` in keys when If `value` is string or number
      const onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
      const Icon = loading ? SpinnerIcon : rtl ? AngleLeftIcon : AngleRightIcon;

      return (
        <ListItem
          as={'li'}
          role="treeitem"
          aria-level={layer + 1}
          aria-setsize={size}
          aria-posinset={index + 1}
          aria-label={typeof label === 'string' ? label : undefined}
          classPrefix="picker-cascader-menu-item"
          key={`${layer}-${onlyKey}`}
          disabled={disabled}
          active={!isUndefined(activeItemValue) && shallowEqual(activeItemValue, value)}
          focus={focus}
          value={value}
          className={children ? prefix('has-children') : undefined}
          onSelect={(_value, event) => handleSelect(layer, node, event)}
        >
          {renderMenuItem ? renderMenuItem(label, node) : label}
          {children ? (
            <Icon className={prefix('caret')} spin={loading} data-testid="spinner" />
          ) : null}
        </ListItem>
      );
    };

    const cascadeNodes = cascadeData.map((children, layer) => {
      const onlyKey = `${layer}_${children.length}`;
      const parentNode = cascadePaths[layer - 1];
      const menu = (
        <>
          {children.map((item, index) => {
            const focus =
              cascadePaths[layer] && shallowEqual(cascadePaths[layer][valueKey], item[valueKey]);

            return renderCascadeNode({ node: item, index, layer, focus, size: children.length });
          })}
        </>
      );

      return (
        <ul
          role="group"
          data-layer={layer}
          data-type={'column'}
          key={onlyKey}
          className={prefix('column')}
          style={{ height: menuHeight, width: menuWidth }}
        >
          {renderMenu ? renderMenu(children, menu, parentNode, layer) : menu}
        </ul>
      );
    });

    const styles = { ...style, width: cascadeData.length * menuWidth };

    return (
      <Component
        role="tree"
        id={`${id}-${popupType}`}
        aria-labelledby={labelId}
        {...rest}
        ref={mergeRefs(rootRef, ref)}
        className={classes}
        style={styles}
      >
        {cascadeNodes}
      </Component>
    );
  }
);

TreeView.displayName = 'TreeView';

export default TreeView;
