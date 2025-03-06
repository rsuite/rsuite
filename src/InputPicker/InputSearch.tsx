import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useStyles, useEventCallback } from '@/internals/hooks';
import type { WithAsProps, HTMLPropsWithoutChange } from '@/internals/types';

export interface InputSearchProps extends WithAsProps, HTMLPropsWithoutChange<HTMLInputElement> {
  readOnly?: boolean;
  value?: string;
  inputStyle?: React.CSSProperties;
  inputRef?: React.Ref<any>;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch = forwardRef<'input', InputSearchProps>((props, ref) => {
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

  const handleChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event?.target?.value, event);
  });

  const { withPrefix, merge, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

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

export default InputSearch;
