import React from 'react';
import useCombobox from './hooks/useCombobox';
import Checkbox, { CheckboxProps } from '../../Checkbox';
import { useClassNames, useEventCallback } from '../hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface ListCheckItemProps extends WithAsProps, Omit<CheckboxProps, 'onSelect'> {
  active?: boolean;
  checkboxAs?: React.ElementType | string;
  focus?: boolean;
  onSelect?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onCheck?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onSelectItem?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  renderCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;
}

const ListCheckItem = forwardRef<'div', ListCheckItemProps>((props, ref) => {
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
    labelClickable,
    onKeyDown,
    onSelect,
    onCheck,
    onSelectItem,
    renderCheckbox,
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
    checkable,
    children,
    checked: active,
    className: checkboxItemClasses,
    disabled,
    value,
    indeterminate,
    labelClickable,
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
      {renderCheckbox ? (
        renderCheckbox(checkboxProps)
      ) : (
        <CheckboxItem role="checkbox" {...checkboxProps} />
      )}
    </Component>
  );
});

ListCheckItem.displayName = 'ListCheckItem';

export default ListCheckItem;
