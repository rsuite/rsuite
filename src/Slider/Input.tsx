import React from 'react';
import { mergeStyles } from '@/internals/utils';

const rangeStyles: React.CSSProperties = {
  position: 'absolute',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  clip: 'rect(0, 0, 0, 0)'
};

const Input = React.forwardRef(
  (props: React.InputHTMLAttributes<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    const { style, ...rest } = props;
    return (
      <input type="range" readOnly ref={ref} style={mergeStyles(rangeStyles, style)} {...rest} />
    );
  }
);

Input.displayName = 'Input';

export default Input;
