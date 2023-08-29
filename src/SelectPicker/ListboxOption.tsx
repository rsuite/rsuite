import React from 'react';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

interface ListboxOptionProps extends StandardProps, React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  disabled?: boolean;
  active?: boolean;
  title?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const ListboxOption = React.forwardRef<HTMLDivElement, ListboxOptionProps>(function ListboxOption(
  props,
  ref
) {
  const {
    selected,
    classPrefix = 'dropdown-menu-item',
    children,
    className,
    disabled,
    active,
    onKeyDown,
    ...rest
  } = props;

  const { withClassPrefix } = useClassNames(classPrefix);
  const classes = withClassPrefix({ active: selected, focus: active, disabled });

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={selected || undefined}
      aria-disabled={disabled}
      {...rest}
      className={className}
      onKeyDown={disabled ? undefined : onKeyDown}
    >
      <span className={classes}>{children}</span>
    </div>
  );
});
ListboxOption.displayName = 'Listbox.Option';

export default ListboxOption;
