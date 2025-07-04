import React from 'react';
import { MarkdownRenderer } from 'react-code-view';

export const copyButtonProps = {
  className: 'rs-btn rs-btn-icon',
  'data-size': 'xs',
  'data-appearance': 'subtle',
  'data-shape': 'circle'
};

export const HTMLRenderer = ({
  children,
  ...props
}: React.ComponentProps<typeof MarkdownRenderer>) => {
  return (
    <MarkdownRenderer copyButtonProps={copyButtonProps} {...props}>
      {children}
    </MarkdownRenderer>
  );
};

export default HTMLRenderer;
