import React, { useState } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Combobox from './Combobox';
import Plaintext from '@/internals/Plaintext';
import { useStyles, useControlled, useIsMounted, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs, partitionHTMLProps } from '@/internals/utils';
import { transformData, shouldDisplay } from './utils';
import { useCustom } from '../CustomProvider';
import {
  PickerToggleTrigger,
  onMenuKeyDown,
  Listbox,
  ListItem,
  PickerPopup,
  useFocusItemValue,
  usePickerRef,
  triggerPropKeys,
  PositionChildProps
} from '@/internals/Picker';
import type {
  FormControlPickerProps,
  SanitizedInputProps,
  Placement,
  Option,
  Size,
  ListboxProps,
  PopupProps
} from '@/internals/types';
import type { BoxProps } from '@/internals/Box';

export interface AutoCompleteProps<T = string>
  extends BoxProps,
    FormControlPickerProps<T, any, Option | string>,
    ListboxProps,
    PopupProps {
  /** The placement of component */
  placement?: Placement;

  /** When set to false, the Enter key selection function is invalid */
  selectOnEnter?: boolean;

  /** A component can have different sizes */
  size?: Size;

  /** Open the menu and control it */
  open?: boolean;

  /** Placeholder text */
  placeholder?: string;

  /** AutoComplete Content */
  autoComplete?: string;

  /** Custom filter function to determine whether the item will be displayed */
  filterBy?: (value: string, item: Option) => boolean;

  /** Called when a option is selected */
  onSelect?: (value: any, item: Option, event: React.SyntheticEvent) => void;

  /** Called on focus */
  onFocus?: React.FocusEventHandler;

  /** Called on blur */
  onBlur?: React.FocusEventHandler;

  /** Called on menu focus */
  onMenuFocus?: (focusItemValue: any, event: React.KeyboardEvent) => void;

  /** The callback triggered by keyboard events. */
  onKeyDown?: (event: React.KeyboardEvent) => void;

  /** Called on open */
  onOpen?: () => void;

  /** Called on close */
  onClose?: () => void;
}

/**
 * Autocomplete function of input field.
 * @see https://rsuitejs.com/components/auto-complete
 *
 * TODO: Remove unnecessary .rs-auto-complete element
 * TODO: role=combobox and aria-autocomplete on input element
 */
const AutoComplete = forwardRef<'div', AutoCompleteProps>((props: AutoCompleteProps, ref) => {
  const { propsWithDefaults } = useCustom('AutoComplete', props);
  const {
    as,
    disabled,
    className,
    placement = 'bottomStart',
    selectOnEnter = true,
    classPrefix = 'auto-complete',
    defaultValue = '',
    popupAutoWidth = true,
    popupClassName,
    popupStyle,
    data,
    value: valueProp,
    open,
    style,
    size,
    id,
    readOnly,
    plaintext,
    renderListbox,
    renderOption,
    onSelect,
    filterBy,
    onKeyDown,
    onChange,
    onClose,
    onOpen,
    onFocus,
    onBlur,
    onMenuFocus,
    ...rest
  } = propsWithDefaults;

  const datalist = transformData(data);
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const [focus, setFocus] = useState(false);
  const items = datalist?.filter(shouldDisplay(filterBy, value)) || [];
  const hasItems = items.length > 0;
  const { trigger, overlay, root } = usePickerRef(ref);
  const isMounted = useIsMounted();

  // Used to hover the focuse item  when trigger `onKeydown`
  const {
    focusItemValue,
    setFocusItemValue,
    onKeyDown: handleKeyDown
  } = useFocusItemValue(value, {
    data: datalist,
    focusToOption: false,
    callback: onMenuFocus,
    target: () => overlay.current
  });

  const handleKeyDownEvent = (event: React.KeyboardEvent) => {
    if (!overlay.current) {
      return;
    }
    onMenuKeyDown(event, {
      enter: selectOnEnter ? selectFocusMenuItem : undefined,
      esc: handleClose
    });
    handleKeyDown(event);
    onKeyDown?.(event);
  };

  const selectFocusMenuItem = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!focusItemValue) {
      return;
    }

    const focusItem = datalist.find(item => item?.value === focusItemValue);
    setValue(focusItemValue);
    setFocusItemValue(focusItemValue);

    handleSelect(focusItem, event);
    if (value !== focusItemValue) {
      handleChangeValue(focusItemValue, event);
    }

    handleClose();
  };

  const handleSelect = useEventCallback((item: Option, event: React.SyntheticEvent) => {
    onSelect?.(item.value, item, event);
  });

  const handleChangeValue = useEventCallback((value: any, event: React.SyntheticEvent) => {
    onChange?.(value, event);
  });

  const handleChange = (value: string, event: React.FormEvent<HTMLInputElement>) => {
    setFocusItemValue('');
    setValue(value);
    setFocus(true);
    handleChangeValue(value, event);
  };

  const handleClose = useEventCallback(() => {
    if (isMounted()) {
      setFocus(false);
      onClose?.();
    }
  });

  const handleOpen = useEventCallback(() => {
    setFocus(true);
    onOpen?.();
  });

  const handleItemSelect = useEventCallback(
    (nextItemValue: string, item: Option, event: React.SyntheticEvent) => {
      setValue(nextItemValue);
      setFocusItemValue(nextItemValue);
      handleSelect(item, event);

      if (value !== nextItemValue) {
        handleChangeValue(nextItemValue, event);
      }
      handleClose();
    }
  );

  const handleInputFocus = useEventCallback((event: React.FocusEvent) => {
    onFocus?.(event);
    handleOpen();
  });

  const handleInputBlur = useEventCallback((event: React.FocusEvent) => {
    setTimeout(handleClose, 300);
    onBlur?.(event);
  });

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ disabled }));
  const [htmlInputProps, restProps] = partitionHTMLProps(omit(rest, triggerPropKeys));

  const renderPopup = (positionProps: PositionChildProps, speakerRef) => {
    const { className } = positionProps;
    const classes = merge(className, popupClassName);
    const listbox = (
      <Listbox
        classPrefix="auto-complete-menu"
        listItemClassPrefix="auto-complete-item"
        listItemAs={ListItem}
        focusItemValue={focusItemValue}
        onSelect={handleItemSelect}
        renderOption={renderOption}
        data={items}
        query={value}
      />
    );

    return (
      <PickerPopup
        ref={mergeRefs(overlay, speakerRef)}
        className={classes}
        onKeyDown={handleKeyDownEvent}
        target={trigger}
        style={popupStyle}
        autoWidth={popupAutoWidth}
      >
        {renderListbox ? renderListbox(listbox) : listbox}
      </PickerPopup>
    );
  };

  if (plaintext) {
    return (
      <Plaintext ref={ref} localeKey="unfilled">
        {typeof value === 'undefined' ? defaultValue : value}
      </Plaintext>
    );
  }

  const expanded = open || (focus && hasItems);

  const triggerProps = {
    ...pick(props, triggerPropKeys),
    open: expanded
  };

  return (
    <PickerToggleTrigger
      as={as}
      id={id}
      ref={trigger}
      placement={placement}
      triggerProps={triggerProps}
      trigger={['click', 'focus']}
      speaker={renderPopup}
      className={classes}
      style={style}
      rootRef={root}
      responsive={false}
      {...restProps}
    >
      <Combobox
        {...(htmlInputProps as SanitizedInputProps)}
        disabled={disabled}
        value={value}
        size={size}
        readOnly={readOnly}
        expanded={expanded}
        focusItemValue={focusItemValue}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDownEvent}
      />
    </PickerToggleTrigger>
  );
});

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;
