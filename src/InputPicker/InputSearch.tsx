import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TypeChecker, useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export interface InputSearchProps
  extends StandardProps,
    Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  as?: React.ElementType | string;
  readOnly?: boolean;
  value?: string;
  inputStyle?: React.CSSProperties;
  inputRef?: React.Ref<any>;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch = React.forwardRef((props: InputSearchProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component = 'input',
    classPrefix = 'picker-search',
    children,
    className,
    value,
    inputRef,
    style,
    readOnly,
    onChange,
    ...rest
  } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event?.target?.value, event);
    },
    [onChange]
  );

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  return (
    <div ref={ref} className={classes} style={style}>
      <Component
        {...rest}
        ref={inputRef}
        readOnly={readOnly}
        className={prefix`input`}
        value={value}
        onChange={handleChange}
      />
      {children}
    </div>
  );
});

InputSearch.displayName = 'InputSearch';
InputSearch.propTypes = {
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  inputRef: TypeChecker.refType,
  as: PropTypes.elementType,
  onChange: PropTypes.func
};

export default InputSearch;
