import React from 'react';
import TagList from './TagList';
import InputSearch, { InputSearchProps } from './InputSearch';
import { useCombobox } from '@/internals/Picker';
import { useStyles } from '@/internals/hooks';

interface TextBoxProps {
  tags?: React.ReactNode;
  inputProps?: InputSearchProps;
  readOnly?: boolean;
  disabled?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  editable?: boolean;
  multiple?: boolean;
  showTagList?: boolean;
  active?: boolean;
  activeDescendant?: string;
  hasDescription?: boolean;
  ariaLabel?: string;
  tabIndex?: number;
}

const TextBox = React.forwardRef((props: TextBoxProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    tags,
    inputProps,
    readOnly,
    disabled,
    multiple,
    onBlur,
    onFocus,
    onChange,
    inputValue,
    inputRef,
    editable,
    showTagList,
    active,
    activeDescendant,
    hasDescription,
    ariaLabel,
    tabIndex,
    ...rest
  } = props;

  const { prefix } = useStyles('picker');
  const { id, labelId, popupType, breakpoint, inputCombobox } = useCombobox();

  if (!multiple && disabled) {
    return null;
  }

  const input =
    editable && breakpoint !== 'xs' ? (
      <InputSearch
        role={inputCombobox ? 'combobox' : undefined}
        id={inputCombobox ? id : undefined}
        aria-haspopup={inputCombobox ? popupType : undefined}
        aria-expanded={inputCombobox ? !!active : undefined}
        aria-controls={inputCombobox && active ? `${id}-${popupType}` : undefined}
        aria-labelledby={inputCombobox ? labelId : undefined}
        aria-label={inputCombobox && !labelId ? ariaLabel : undefined}
        aria-describedby={inputCombobox && hasDescription ? `${id}-describe` : undefined}
        aria-autocomplete={inputCombobox ? 'list' : undefined}
        aria-activedescendant={inputCombobox && active ? activeDescendant : undefined}
        aria-readonly={inputCombobox ? readOnly || undefined : undefined}
        {...inputProps}
        tabIndex={inputCombobox ? (tabIndex ?? 0) : -1}
        readOnly={readOnly}
        onBlur={onBlur}
        onFocus={onFocus}
        inputRef={inputRef}
        onChange={onChange}
        value={inputValue}
      />
    ) : null;

  return (
    <div className={prefix`textbox`} ref={ref} {...rest}>
      {showTagList ? (
        <TagList>
          {tags}
          {input}
        </TagList>
      ) : (
        input
      )}
    </div>
  );
});

TextBox.displayName = 'TextBox';

export default TextBox;
