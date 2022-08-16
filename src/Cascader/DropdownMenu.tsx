import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import { shallowEqual, useClassNames, mergeRefs, useCustom } from '../utils';
import { DropdownMenuItem } from '../Picker';
import { ItemDataType, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from './Cascader';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';

export interface DropdownMenuProps extends Omit<WithAsProps, 'classPrefix'> {
  classPrefix: string;
  disabledItemValues: ValueType[];
  activeItemValue?: ValueType | null;
  childrenKey: string;
  cascadeData: ItemDataType[][];
  cascadePaths: ItemDataType[];
  valueKey: string;
  labelKey: string;
  menuWidth?: number;
  menuHeight?: number | string;
  renderMenuItem?: (itemLabel: React.ReactNode, item: ItemDataType) => React.ReactNode;
  renderMenu?: (
    items: ItemDataType[],
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

const DropdownMenu: RsRefForwardingComponent<'div', DropdownMenuProps> = React.forwardRef(
  (props: DropdownMenuProps, ref) => {
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
      labelKey = 'label',
      renderMenu,
      renderMenuItem,
      onSelect,
      ...rest
    } = props;
    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, prefix('items'));
    const rootRef = useRef<HTMLDivElement>();
    const { rtl } = useCustom('DropdownMenu');

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

    const getCascadePaths = useCallback(
      (layer: number, node: ItemDataType) => {
        const paths: ItemDataType[] = [];

        for (let i = 0; i < cascadeData.length && i < layer; i += 1) {
          if (i < layer - 1 && cascadePaths) {
            paths.push(cascadePaths[i]);
          }
        }

        paths.push(node);

        return paths;
      },
      [cascadeData, cascadePaths]
    );

    const handleSelect = (layer: number, node: any, event: React.MouseEvent) => {
      const isLeafNode = isNil(node[childrenKey]);
      const cascadePaths = getCascadePaths(layer + 1, node);

      onSelect?.(node, cascadePaths, isLeafNode, event);
    };

    const renderCascadeNode = (node: any, index: number, layer: number, focus: boolean) => {
      const children = node[childrenKey];
      const value = node[valueKey];
      const label = node[labelKey];

      const disabled = disabledItemValues.some(disabledValue => shallowEqual(disabledValue, value));

      // Use `value` in keys when If `value` is string or number
      const onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
      const Icon = node.loading ? SpinnerIcon : rtl ? AngleLeftIcon : AngleRightIcon;

      return (
        <DropdownMenuItem
          classPrefix="picker-cascader-menu-item"
          as={'li'}
          role="treeitem"
          key={`${layer}-${onlyKey}`}
          disabled={disabled}
          active={!isUndefined(activeItemValue) && shallowEqual(activeItemValue, value)}
          focus={focus}
          value={value}
          aria-owns={node.children ? 'treeitem-' + value + '-children' : undefined}
          className={children ? prefix('has-children') : undefined}
          onSelect={(_value, event) => handleSelect(layer, node, event)}
        >
          {renderMenuItem ? renderMenuItem(label, node) : label}
          {children ? <Icon className={prefix('caret')} spin={node.loading} /> : null}
        </DropdownMenuItem>
      );
    };

    const styles = { width: cascadeData.length * menuWidth };

    const cascadeNodes = cascadeData.map((children, layer) => {
      const onlyKey = `${layer}_${children.length}`;

      const parentNode = cascadePaths[layer - 1];

      const menu = (
        <ul
          role={layer === 0 ? 'none presentation' : 'group'}
          id={parentNode ? 'treeitem-' + parentNode[valueKey] + '-children' : undefined}
        >
          {children.map((item, index) =>
            renderCascadeNode(
              item,
              index,
              layer,
              cascadePaths[layer] && shallowEqual(cascadePaths[layer][valueKey], item[valueKey])
            )
          )}
        </ul>
      );

      return (
        <div
          key={onlyKey}
          className={prefix('column')}
          data-layer={layer}
          data-type={'column'}
          style={{ height: menuHeight, width: menuWidth }}
        >
          {renderMenu ? renderMenu(children, menu, parentNode, layer) : menu}
        </div>
      );
    });

    return (
      <Component role="tree" {...rest} ref={mergeRefs(rootRef, ref)} className={classes}>
        <div style={styles}>{cascadeNodes}</div>
      </Component>
    );
  }
);

export const dropdownMenuPropTypes = {
  classPrefix: PropTypes.string,
  disabledItemValues: PropTypes.array,
  activeItemValue: PropTypes.any,
  childrenKey: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  cascadeData: PropTypes.array,
  cascadePaths: PropTypes.array
};

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = dropdownMenuPropTypes;

export default DropdownMenu;
