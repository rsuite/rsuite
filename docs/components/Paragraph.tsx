import * as React from 'react';
import { Placeholder } from 'rsuite';

interface ParagraphProps {
  rows: number;
  width: string | number;
  style: React.CSSProperties;
  children: React.ReactNode;
}

export default function Paragraph({
  rows = 4,
  width = '100%',
  style,
  children,
  ...props
}: ParagraphProps) {
  return (
    <div style={{ width, ...style }} className="paragraph">
      <Placeholder.Paragraph rows={rows} {...props}>
        <p>This is a Test.</p>
      </Placeholder.Paragraph>
      {children}
    </div>
  );
}
