import React from 'react';

export interface DecorativeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

// Used for display in examples
export const DecorativeBox = ({ children, width, height, ...rest }: DecorativeBoxProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height || 60,
        width: width,
        background: 'var(--rs-decorative-box-bg)',
        borderRadius: 'var(--rs-radius-md)',
        marginBlock: 'var(--rs-decorative-box-block-spacing)',
        marginInline: 'var(--rs-decorative-box-inline-spacing)'
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
