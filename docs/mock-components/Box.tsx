import React from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

// Used for display in examples
export const Box = ({ children, width, height, ...rest }: BoxProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height || 60,
        width: width,
        background: 'var(--rs-box-bg)',
        borderRadius: 'var(--rs-radius-md)',
        marginBlock: 'var(--rs-box-block-spacing)',
        marginInline: 'var(--rs-box-inline-spacing)'
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
