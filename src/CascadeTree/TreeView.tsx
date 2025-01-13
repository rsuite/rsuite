import React, { useEffect, useRef } from 'react';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
import SpinnerIcon from '@rsuite/icons/Spinner';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { forwardRef, shallowEqual, mergeRefs } from '@/internals/utils';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { ListItem, useCombobox } from '@/internals/Picker';
import { useCustom } from '../CustomProvider';
import type { ItemDataType, WithAsProps, DataProps, ToArray } from '@/internals/types';
import type { SelectNode, CascadeColumn } from './types';

type SetLike<T = unknown> = {
  has(value: T): boolean;
};

export interface TreeViewProps<T = any>
  extends WithAsProps,
    Omit<DataProps<ItemDataType<T>>, 'data'> {
  data?: (readonly ItemDataType<T>[])[];
  disabledItemValues?: ToArray<NonNullable<T>>;
  activeItemValue?: T | null;
  loadingItemsSet?: SetLike<ItemDataType<T>>;
  cascadePaths?: ItemDataType<T>[];
  columnWidth?: number;
  columnHeight?: number | string;
  renderTreeNode?: (node: React.ReactNode, itemData: ItemDataType<T>) => React.ReactNode;
  renderColumn?: (childNodes: React.ReactNode, column: CascadeColumn<T>) => React.ReactNode;
  onSelect?: (node: SelectNode<T>, event: React.MouseEvent) => void;
}

const emptyArray = [];

const TreeView = forwardRef<'div', TreeViewProps>((props: TreeViewProps, ref) => {
  const {
    as: Component = 'div',
    activeItemValue,
    classPrefix = 'tree',
    className,
    childrenKey = 'children',
    disabledItemValues = emptyArray,
    columnWidth = 140,
    columnHeight = 200,
    valueKey = 'value',
    data = emptyArray,
    cascadePaths = emptyArray,
    loadingItemsSet,
    labelKey = 'label',
    style,
    renderColumn,
    renderTreeNode,
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
        if (position?.top) {
          scrollTop(column, position?.top);
        }
      }
    });
  }, [prefix]);

  const getCascadePaths = (layer: number, node: ItemDataType) => {
    const paths: ItemDataType[] = [];

    for (let i = 0; i < data.length && i < layer; i += 1) {
      if (i < layer - 1 && cascadePaths) {
        paths.push(cascadePaths[i]);
      }
    }

    paths.push(node);

    return paths;
  };

  const handleSelect = useEventCallback((layer: number, itemData: any, event: React.MouseEvent) => {
    const isLeafNode = isNil(itemData[childrenKey]);
    const cascadePaths = getCascadePaths(layer + 1, itemData);

    onSelect?.({ itemData, cascadePaths, isLeafNode }, event);
  });

  const renderCascadeNode = (nodeProps: {
    itemData: any;
    index: number;
    layer: number;
    focus: boolean;
    size: number;
  }) => {
    const { itemData, index, layer, focus, size } = nodeProps;
    const children = itemData[childrenKey];
    const value = itemData[valueKey];
    const label = itemData[labelKey];
    const disabled = disabledItemValues.some(disabledValue => shallowEqual(disabledValue, value));
    const loading = loadingItemsSet?.has(itemData) ?? false;

    // Use `value` in keys when If `value` is string or number
    const onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
    const Icon = loading ? SpinnerIcon : rtl ? ArrowLeftLineIcon : ArrowRightLineIcon;

    return (
      <ListItem
        as={'li'}
        role="treeitem"
        aria-level={layer + 1}
        aria-setsize={size}
        aria-posinset={index + 1}
        aria-label={typeof label === 'string' ? label : undefined}
        classPrefix="cascade-tree-item"
        key={`${layer}-${onlyKey}`}
        disabled={disabled}
        active={!isUndefined(activeItemValue) && shallowEqual(activeItemValue, value)}
        focus={focus}
        value={value}
        className={children ? prefix('has-children') : undefined}
        onSelect={(_value, event) => handleSelect(layer, itemData, event)}
      >
        {renderTreeNode ? renderTreeNode(label, itemData) : label}
        {children ? (
          <Icon className={prefix('caret')} spin={loading} data-testid="spinner" />
        ) : null}
      </ListItem>
    );
  };

  const cascadeNodes = data.map((children, layer) => {
    const onlyKey = `${layer}_${children.length}`;
    const parentItem = cascadePaths[layer - 1];
    const childNodes = (
      <>
        {children.map((itemData, index) => {
          const focus =
            cascadePaths[layer] && shallowEqual(cascadePaths[layer][valueKey], itemData[valueKey]);

          return renderCascadeNode({ itemData, index, layer, focus, size: children.length });
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
        style={{ height: columnHeight, width: columnWidth }}
      >
        {renderColumn
          ? renderColumn(childNodes, { items: children, parentItem, layer })
          : childNodes}
      </ul>
    );
  });

  const styles = { ...style, width: data.length * columnWidth };

  return (
    <Component
      role="tree"
      id={id ? `${id}-${popupType}` : undefined}
      aria-labelledby={labelId}
      {...rest}
      ref={mergeRefs(rootRef, ref)}
      className={classes}
      style={styles}
    >
      {cascadeNodes}
    </Component>
  );
});

TreeView.displayName = 'TreeView';

export default TreeView;
