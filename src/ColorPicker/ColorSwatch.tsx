import React from 'react';

export default function ColorSwatch({ color }: { color?: string }) {
  return (
    <span
      className="rs-color-picker-swatch"
      aria-hidden="true"
      style={{ '--rs-color-picker-color': color } as React.CSSProperties}
    />
  );
}
