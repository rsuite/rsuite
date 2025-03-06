import React from 'react';
import TagList from './TagList';
import InputSearch, { InputSearchProps } from './InputSearch';
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
    ...rest
  } = props;

  const { prefix } = useStyles('picker');

  if (!multiple && disabled) {
    return null;
  }

  const input = editable ? (
    <InputSearch
      {...inputProps}
      tabIndex={-1}
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
