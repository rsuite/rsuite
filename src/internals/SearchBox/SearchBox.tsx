import React from 'react';
import SearchIcon from '@rsuite/icons/Search';
import Input from '../../Input';
import InputGroup from '../../InputGroup';
import { useClassNames } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface SearchBoxProps extends WithAsProps {
  value?: string;
  placeholder?: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = forwardRef<'div', SearchBoxProps>((props: SearchBoxProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'search-box',
    value,
    className,
    placeholder,
    inputRef,
    onChange,
    ...rest
  } = props;
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  return (
    <Component {...rest} ref={ref} className={classes}>
      <InputGroup inside>
        <Input
          role="searchbox"
          className={prefix`input`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={inputRef}
        />

        <InputGroup.Addon>
          <SearchIcon className={prefix`icon`} />
        </InputGroup.Addon>
      </InputGroup>
    </Component>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
