import React from 'react';

export interface DecorativeBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  w?: number;
  h?: number;
}

// Used for display in examples
export const DecorativeBox = ({ children, w, h, ...rest }: DecorativeBoxProps) => {
  return (
    <div
      className="rs-decorative-box"
      style={{
        height: h || 60,
        width: w
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
