import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

import { useClassNames, shallowEqual, useCustom } from '../utils';
import { DropdownMenuCheckItem } from '../Picker';
import { isSomeParentChecked, isSomeChildChecked } from './utils';
import { ItemDataType, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from './MultiCascader';

export interface DropdownMenuProps extends WithAsProps {
  disabledItemValues: ValueType;
  value?: ValueType;
  childrenKey: string;
  valueKey: string;
  labelKey: string;
  menuWidth: number;
  menuHeight: number | string;
  cascade?: boolean;
  cascadeData: ItemDataType[][];
  cascadePaths: ItemDataType[];
  uncheckableItemValues: ValueType;
  renderMenuItem?: (itemLabel: React.MouseEventHandler, item: ItemDataType) => React.ReactNode;
  renderMenu?: (
    children: ItemDataType[],
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

const defaultProps: Partial<DropdownMenuProps> = {
  as: 'div',
  disabledItemValues: [],
  uncheckableItemValues: [],
  cascadeData: [],
  cascadePaths: [],
  menuWidth: 156,
  menuHeight: 200,
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label'
};

/**
 * TODO: reuse Menu from Cascader for consistent behavior
 */
const DropdownMenu: RsRefForwardingComponent<'div', DropdownMenuProps> = React.forwardRef(
  (props: DropdownMenuProps, ref) => {
    const {
      as: Component,
      classPrefix,
      className,
      cascade,
      cascadeData,
      cascadePaths,
      childrenKey,
      disabledItemValues,
      menuWidth,
      menuHeight,
      uncheckableItemValues,
      value,
      valueKey,
      labelKey,
      renderMenuItem,
      renderMenu,
      onCheck,
      onSelect,
      ...rest
    } = props;

    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, prefix('items'));
    const rtl = useCustom('DropdownMenu');

    const getCascadePaths = useCallback(
      (layer: number, node: ItemDataType) => {
        const paths = [];

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

    const handleSelect = useCallback(
      (layer: number, node: any, event: React.SyntheticEvent<HTMLElement>) => {
        const cascadePaths = getCascadePaths(layer + 1, node);

        onSelect?.(node, cascadePaths, event);
      },
      [getCascadePaths, onSelect]
    );

    const renderCascadeNode = (
      node: any,
      index: number,
      layer: number,
      focus: boolean,
      uncheckable: boolean
    ) => {
      const children = node[childrenKey];
      const nodeValue = node[valueKey];
      const nodeLabel = node[labelKey];

      const disabled = disabledItemValues.some(disabledValue =>
        shallowEqual(disabledValue, nodeValue)
      );

      // Use `value` in keys when If `value` is string or number
      const onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
      const Icon = node.loading ? SpinnerIcon : rtl ? AngleRightIcon : AngleLeftIcon;
      let active = value.some(v => v === nodeValue);

      if (cascade) {
        active = active || isSomeParentChecked(node, value, { valueKey });
      }

      return (
        <DropdownMenuCheckItem
          as="li"
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
        >
          {renderMenuItem ? renderMenuItem(nodeLabel, node) : nodeLabel}
          {children ? <Icon className={prefix('caret')} spin={node.loading} /> : null}
        </DropdownMenuCheckItem>
      );
    };

    const renderCascade = () => {
      const styles = { width: cascadeData.length * menuWidth };
      const columnStyles = { height: menuHeight, width: menuWidth };

      const cascadeNodes = cascadeData.map((children, layer) => {
        let uncheckableCount = 0;
        const onlyKey = `${layer}_${children.length}`;
        const menu = (
          <ul role="listbox">
            {children.map((item, index) => {
              const uncheckable = uncheckableItemValues.some(uncheckableValue =>
                shallowEqual(uncheckableValue, item[valueKey])
              );
              if (uncheckable) {
                uncheckableCount++;
              }
              return renderCascadeNode(
                item,
                index,
                layer,
                cascadePaths[layer] && shallowEqual(cascadePaths[layer][valueKey], item[valueKey]),
                uncheckable
              );
            })}
          </ul>
        );

        const parentNode = cascadePaths[layer - 1];
        const columnClasses = prefix('column', {
          'column-uncheckable': uncheckableCount === children.length
        });

        return (
          <div key={onlyKey} className={columnClasses} data-layer={layer} style={columnStyles}>
            {renderMenu ? renderMenu(children, menu, parentNode, layer) : menu}
          </div>
        );
      });
      return <div style={styles}>{cascadeNodes}</div>;
    };

    return (
      <Component {...rest} ref={ref} className={classes}>
        {renderCascade()}
      </Component>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = defaultProps;

DropdownMenu.propTypes = {
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
  cascadeData: PropTypes.array,
  cascadePaths: PropTypes.array,
  uncheckableItemValues: PropTypes.array,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func
};

export default DropdownMenu;
