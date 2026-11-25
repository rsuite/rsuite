import React from 'react';

interface ThemeIconProps extends React.SVGProps<SVGSVGElement> {
  theme: 'light' | 'dark' | 'high-contrast';
  width?: number;
  height?: number;
}

const colors = {
  light: {
    border: '#e6e6e6',
    background: '#fff',
    content: '#8e8e93',
    highlight: '#1675e0'
  },
  dark: {
    border: '#3c3f43',
    background: '#1a1d24',
    content: '#6a6f76',
    highlight: '#6a6f76'
  },
  'high-contrast': {
    border: '#3c3f43',
    background: '#000',
    content: '#6a6f76',
    highlight: '#ffff00'
  }
};

const ThemeIcon = (props: ThemeIconProps) => {
  const { theme, className, width = 24, height = 23, ...rest } = props;

  const currentColors = colors[theme] || colors.light;

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        width,
        height,
        border: `1px solid ${currentColors.border}`,
        backgroundColor: currentColors.background,
        borderRadius: 2
      }}
    >
      <svg
        viewBox="0 0 22 14"
        width="100%"
        height="100%"
        focusable={false}
        aria-hidden={true}
        {...rest}
      >
        <rect width="21" height="13" x="0.5" y="0.5" fill={currentColors.background} />
        <rect x="2" y="2" width="18" height="2.5" fill={currentColors.content} />
        <rect x="2" y="5.5" width="12" height="1.5" fill={currentColors.highlight} />
        <rect x="2" y="8" width="14" height="1.5" fill={currentColors.content} />
        <rect x="2" y="10.5" width="8" height="1.5" rx="0.3" fill={currentColors.highlight} />
      </svg>
    </span>
  );
};

export default ThemeIcon;
