import React, { useCallback } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Search from '@rsuite/icons/legacy/Search';

import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface SearchBarProps extends WithAsProps {
  value?: string;
  placeholder?: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: (value: string, event: React.SyntheticEvent<HTMLElement>) => void;
}

const SearchBar: RsRefForwardingComponent<'div', SearchBarProps> = React.forwardRef(
  (props: SearchBarProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'picker-search-bar',
      value,
      children,
      className,
      placeholder,
      inputRef,
      onChange,
      ...rest
    } = props;
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const handleChange = useCallback(
      (event: React.SyntheticEvent<HTMLElement>) => {
        onChange?.(get(event, 'target.value'), event);
      },
      [onChange]
    );
    return (
      <Component role="searchbox" {...rest} ref={ref} className={classes}>
        <input
          className={prefix('input')}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          ref={inputRef}
        />
        <Search className={prefix('search-icon')} />
        {children}
      </Component>
    );
  }
);

SearchBar.displayName = 'SearchBar';
SearchBar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};

export default SearchBar;
