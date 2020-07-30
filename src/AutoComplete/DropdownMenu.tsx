import React from 'react';
import PropTypes from 'prop-types';
import { MenuWrapper } from '../Picker';
import AutoCompleteItem from './AutoCompleteItem';
import { StandardProps, ItemDataType } from '../@types/common';
import { useClassNames } from '../utils';

interface DropdownMenuProps extends StandardProps {
  /** The data of component */
  data: any[];

  /** Custom selected option */
  renderItem: (itemData: ItemDataType) => React.ReactNode;

  /** Additional classes for menu */
  className?: string;

  /** The callback triggered by keyboard events. */
  onKeyDown?: (event: React.KeyboardEvent) => void;

  /** Called when a option is selected */
  onSelect?: (item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => void;

  focusItemValue: string | number | ReadonlyArray<string>;
}

const DropdownMenu = React.forwardRef((props: DropdownMenuProps, ref: React.Ref<any>) => {
  const {
    classPrefix = 'auto-complete-menu',
    className,
    focusItemValue,
    data = [],
    renderItem,
    onKeyDown,
    onSelect,
    ...rest
  } = props;

  const [withPrifix, merge] = useClassNames(classPrefix);
  const classes = merge(className, withPrifix());

  return (
    <MenuWrapper {...rest} className={classes} onKeyDown={onKeyDown} ref={ref}>
      <ul role="menu">
        {data.map((item: ItemDataType) => (
          <AutoCompleteItem
            key={item.value}
            focus={focusItemValue === item.value}
            itemData={item}
            onSelect={onSelect}
            renderItem={renderItem}
          >
            {item.label}
          </AutoCompleteItem>
        ))}
      </ul>
    </MenuWrapper>
  );
});

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = {
  classPrefix: PropTypes.string,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  className: PropTypes.string,
  focusItemValue: PropTypes.string
};

export default DropdownMenu;
