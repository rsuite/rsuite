import React from 'react';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import { useClassNames, shallowEqual, useCustom, useEventCallback } from '../utils';
import { ListCheckItem, useCombobox } from '../internals/Picker';
import { isSomeParentChecked, isSomeChildChecked } from './utils';
import { ItemDataType, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from './MultiCascader';

export interface TreeViewProps extends WithAsProps {
  disabledItemValues: ValueType;
  value: ValueType;
  childrenKey: string;
  valueKey: string;
  labelKey: string;
  menuWidth?: number;
  menuHeight?: number | string;
  cascade?: boolean;
  cascadeData: (readonly ItemDataType[])[];
  cascadePaths?: ItemDataType[];
  uncheckableItemValues: ValueType;
  renderMenuItem?: (itemLabel: React.MouseEventHandler, item: ItemDataType) => React.ReactNode;
  renderMenu?: (
    children: readonly ItemDataType[],
    menu: React.ReactNode,
    parentNode?: ItemDataType,
    layer?: number
  ) => React.ReactNode;
  onCheck?: (node: ItemDataType, event: React.SyntheticEvent, checked: boolean) => void;
  onSelect?: (
    node: ItemDataType,
    cascadePaths: ItemDataType[],
    event: React.SyntheticEvent
  ) => void;
}

const emptyArray = [];

/**
 * TODO: reuse Menu from Cascader for consistent behavior
 */
const TreeView: RsRefForwardingComponent<'div', TreeViewProps> = React.forwardRef(
  (props: TreeViewProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'menu',
      className,
      cascade,
      cascadeData = emptyArray,
      cascadePaths = emptyArray,
      childrenKey = 'children',
      disabledItemValues = emptyArray,
      menuWidth = 156,
      menuHeight = 200,
      uncheckableItemValues = emptyArray,
      value,
      valueKey = 'value',
      labelKey = 'label',
      style,
      renderMenuItem,
      renderMenu,
      onCheck,
      onSelect,
      ...rest
    } = props;

    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, prefix('items'));
    const { rtl } = useCustom();
    const { id, labelId, popupType, multiple } = useCombobox();

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

    const handleSelect = useEventCallback(
      (layer: number, node: any, event: React.SyntheticEvent) => {
        const cascadePaths = getCascadePaths(layer + 1, node);

        onSelect?.(node, cascadePaths, event);
      }
    );

    const renderCascadeNode = (nodeProps: {
      node: any;
      index: number;
      layer: number;
      focus: boolean;
      uncheckable: boolean;
      size: number;
    }) => {
      const { node, index, layer, focus, uncheckable, size } = nodeProps;
      const children = node[childrenKey];
      const nodeValue = node[valueKey];
      const label = node[labelKey];

      const disabled = disabledItemValues.some(disabledValue =>
        shallowEqual(disabledValue, nodeValue)
      );

      // Use `value` in keys when If `value` is string or number
      const onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
      const Icon = node.loading ? SpinnerIcon : rtl ? AngleLeftIcon : AngleRightIcon;
      let active = value.some(v => v === nodeValue);

      if (cascade) {
        active = active || isSomeParentChecked(node, value, { valueKey });
      }

      return (
        <ListCheckItem
          as="li"
          role="treeitem"
          aria-level={layer + 1}
          aria-setsize={size}
          aria-posinset={index + 1}
          aria-label={typeof label === 'string' ? label : undefined}
          key={`${layer}-${onlyKey}`}
          disabled={disabled}
          active={active}
          focus={focus}
          // Pass the node as a value to Item, and use it in event callbacks.
          value={nodeValue}
          className={children ? prefix('has-children') : undefined}
          indeterminate={
            cascade && !active && isSomeChildChecked(node, value, { valueKey, childrenKey })
          }
          onSelectItem={(_value, event) => handleSelect(layer, node, event)}
          onCheck={(_value, event, checked) => onCheck?.(node, event, checked)}
          checkable={!uncheckable}
          labelClickable={false}
        >
          {renderMenuItem ? renderMenuItem(label, node) : label}
          {children ? <Icon className={prefix('caret')} spin={node.loading} /> : null}
        </ListCheckItem>
      );
    };

    const columnStyles = { height: menuHeight, width: menuWidth };
    const cascadeNodes = cascadeData.map((children, layer) => {
      let uncheckableCount = 0;
      const onlyKey = `${layer}_${children.length}`;
      const menu = (
        <>
          {children.map((item, index) => {
            const uncheckable = uncheckableItemValues.some(uncheckableValue =>
              shallowEqual(uncheckableValue, item[valueKey])
            );
            if (uncheckable) {
              uncheckableCount++;
            }

            const focus =
              cascadePaths[layer] && shallowEqual(cascadePaths[layer][valueKey], item[valueKey]);
            return renderCascadeNode({
              node: item,
              index,
              layer,
              focus,
              uncheckable,
              size: children.length
            });
          })}
        </>
      );

      const parentNode = cascadePaths[layer - 1];
      const columnClasses = prefix('column', {
        'column-uncheckable': uncheckableCount === children.length
      });

      return (
        <ul
          role="group"
          key={onlyKey}
          className={columnClasses}
          data-layer={layer}
          style={columnStyles}
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
        aria-multiselectable={multiple}
        {...rest}
        ref={ref}
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
