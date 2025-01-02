import { Colours, Color } from '../types/colours';

export const isPresetColor = (color?: Color | React.CSSProperties['color']) => {
  if (!color) {
    return false;
  }

  if (color === 'default') {
    return true;
  }

  return Object.values(Colours).includes(color as Colours);
};

/**
 * Convert short hex color to full hex color
 * e.g. #fff -> #ffffff
 */
export const expandHexColor = (color: string): string => {
  const hex = color.toLowerCase().replace('#', '');
  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  return `#${hex}`;
};

/**
 * Calculate relative luminance of a color
 * Using the formula from WCAG 2.0
 */
export const getLuminance = (color: string): number => {
  // Convert hex to rgb
  const fullHex = expandHexColor(color);
  const hex = fullHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert rgb to relative luminance
  const rs = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gs = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bs = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Get contrasting text color (black or white) based on background color
 */
export const getContrastText = (bgColor: string): string => {
  // For non-hex colors, return default dark text
  if (!bgColor.startsWith('#')) {
    return 'var(--rs-text-primary)';
  }

  const luminance = getLuminance(bgColor);
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

/**
 * Create CSS color variables for custom colors
 * Returns background and optional text color variables
 */
export const createColorVariables = (
  color?: Color | React.CSSProperties['color'],
  bgFieldName = '--rs-color-bg',
  textFieldName?: string
): React.CSSProperties | undefined => {
  if (color && !isPresetColor(color)) {
    const colorStr = color.toString();
    // Only convert to hex if it's a hex color
    const bgColor = colorStr.startsWith('#') ? expandHexColor(colorStr) : colorStr;
    const styles: React.CSSProperties = {
      [bgFieldName]: bgColor
    };

    if (textFieldName) {
      styles[textFieldName] = getContrastText(bgColor);
    }

    return styles;
  }

  return undefined;
};
