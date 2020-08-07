import React, { useCallback } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export interface SearchBarProps
  extends StandardProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string, event: React.SyntheticEvent<HTMLElement>) => void;
}

const SearchBar = React.forwardRef((props: SearchBarProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component = 'div',
    classPrefix = 'picker-search-bar',
    value,
    children,
    className,
    placeholder,
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
    <Component {...rest} ref={ref} className={classes}>
      <input
        className={prefix('input')}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {children}
    </Component>
  );
});

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
