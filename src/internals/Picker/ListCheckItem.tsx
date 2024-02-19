import React from 'react';
import { useClassNames, useEventCallback } from '../../utils';
import Checkbox, { CheckboxProps } from '../../Checkbox';
import { WithAsProps, RsRefForwardingComponent } from '../../@types/common';
import useCombobox from './hooks/useCombobox';

export interface ListCheckItemProps extends WithAsProps {
  active?: boolean;
  checkboxAs?: React.ElementType | string;
  classPrefix?: string;
  disabled?: boolean;
  checkable?: boolean;
  indeterminate?: boolean;
  value?: string | number;
  focus?: boolean;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  onSelect?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onCheck?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onSelectItem?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  renderMenuItemCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;
}

const ListCheckItem: RsRefForwardingComponent<'div', ListCheckItemProps> = React.forwardRef(
  (props: ListCheckItemProps, ref) => {
    const {
      active = false,
      as: Component = 'div',
      checkboxAs: CheckboxItem = Checkbox,
      classPrefix = 'check-item',
      checkable = true,
      disabled,
      value,
      focus,
      children,
      className,
      indeterminate,
      onKeyDown,
      onSelect,
      onCheck,
      onSelectItem,
      renderMenuItemCheckbox,
      ...rest
    } = props;

    const handleChange = useEventCallback(
      (value: any, checked: boolean, event: React.SyntheticEvent) => {
        onSelect?.(value, event, checked);
      }
    );

    const handleCheck = useEventCallback((event: React.SyntheticEvent) => {
      if (!disabled) {
        onCheck?.(value, event, !active);
      }
    });

    const handleSelectItem = useEventCallback((event: React.SyntheticEvent) => {
      if (!disabled) {
        onSelectItem?.(value, event, !active);
      }
    });

    const { id } = useCombobox();
    const { withClassPrefix, merge, rootPrefix } = useClassNames(classPrefix);
    const checkboxItemClasses = withClassPrefix({ focus });

    const checkboxProps: CheckboxProps = {
      value,
      disabled,
      indeterminate,
      checkable,
      children,
      checked: active,
      className: checkboxItemClasses,
      onKeyDown: disabled ? undefined : onKeyDown,
      onChange: handleChange,
      onClick: handleSelectItem,
      onCheckboxClick: handleCheck
    };

    return (
      <Component
        role="option"
        aria-selected={active}
        aria-disabled={disabled}
        id={id ? `${id}-opt-${value}` : undefined}
        data-key={value}
        {...rest}
        ref={ref}
        className={merge(className, rootPrefix`picker-list-item`)}
        tabIndex={-1}
      >
        {renderMenuItemCheckbox ? (
          renderMenuItemCheckbox(checkboxProps)
        ) : (
          <CheckboxItem role="checkbox" {...checkboxProps} />
        )}
      </Component>
    );
  }
);

ListCheckItem.displayName = 'ListCheckItem';

export default ListCheckItem;
