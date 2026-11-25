import { NextApiRequest, NextApiResponse } from 'next';
import { getPalette } from '@/utils/palette';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { color, theme } = req.query;

    // Validate inputs
    if (!color || typeof color !== 'string') {
      return res.status(400).json({ error: 'Color parameter is required' });
    }

    // Check if theme is valid
    const themeIsDefault = ['light', null, undefined].includes(theme as string | null | undefined);

    // Generate CSS content
    const cssContent = generatePaletteCss(color as string, themeIsDefault);

    // Set appropriate headers for CSS content
    res.setHeader('Content-Type', 'text/css');
    res.status(200).send(cssContent);
  } catch (error) {
    console.error('Error generating palette SCSS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Generate CSS for palette based on the provided color and theme
 */
function generatePaletteCss(color: string, themeIsDefault: boolean): string {
  // Helper functions to extract RGB components from hex color
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace('#', '');

    // Parse r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  };

  // Calculate contrast color based on YIQ formula
  const contrastColor = (color: string) => {
    const rgb = hexToRgb(color);
    const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return yiq >= 150 ? '#575757' : '#fff';
  };

  // Generate palette colors
  const palette = getPalette(color);
  const H050 = palette[0].hex;
  const H100 = palette[1].hex;
  const H200 = palette[2].hex;
  const H300 = palette[3].hex;
  const H400 = palette[4].hex;
  const H500 = palette[5].hex;
  const H600 = palette[6].hex;
  const H700 = palette[7].hex;
  const H800 = palette[8].hex;
  const H900 = palette[9].hex;

  // Get RGB components for creating rgba values
  const primaryRgb = hexToRgb(H500);
  const primary100Rgb = hexToRgb(H100);

  // Construct CSS variables
  const cssContent = `
  /* Palette CSS Variables */
  --rs-primary-50: ${H050};
  --rs-primary-100: ${H100};
  --rs-primary-200: ${H200};
  --rs-primary-300: ${H300};
  --rs-primary-400: ${H400};
  --rs-primary-500: ${H500};
  --rs-primary-600: ${H600};
  --rs-primary-700: ${H700};
  --rs-primary-800: ${H800};
  --rs-primary-900: ${H900};

  /* Background */
  --rs-bg-active: var(--rs-primary-500);

  /* Focus ring */
  --rs-state-focus-shadow: 0 0 0 2px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.25);

  /* Button */
  --rs-btn-primary-text: ${contrastColor(H500)};
  --rs-btn-primary-bg: ${themeIsDefault ? H500 : H700};
  --rs-btn-primary-hover-bg: ${H600};
  --rs-btn-primary-active-bg: ${themeIsDefault ? H700 : H500};
  --rs-btn-ghost-border: ${H700};
  --rs-btn-ghost-text: ${H700};
  --rs-btn-ghost-hover-border: ${H800};
  --rs-btn-ghost-hover-text: ${H800};
  --rs-btn-ghost-active-border: ${H900};
  --rs-btn-ghost-active-text: ${H900};
  --rs-btn-link-text: ${themeIsDefault ? H700 : H500};
  --rs-btn-link-hover-text: ${themeIsDefault ? H800 : H600};
  --rs-btn-link-active-text: ${themeIsDefault ? H900 : H700};

  /* Input */
  --rs-input-focus-border: var(--rs-primary-500);
  --rs-color-focus-ring: rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.25);

  /* Checkbox */
  --rs-checkbox-checked-bg: ${H500};

  /* Radio */
  --rs-radio-checked-bg: ${H500};

  /* Toggle */
  --rs-toggle-checked-bg: ${H500};
  --rs-toggle-checked-hover-bg: ${H600};
  --rs-toggle-checked-disabled-bg: ${H100};

  /* Slider */
  --rs-slider-thumb-border: ${H500};
  --rs-slider-thumb-hover-shadow: 0 0 0 8px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.25);
  --rs-slider-progress: ${H500};

  /* Sidenav */
  --rs-sidenav-subtle-selected-text: var(--rs-primary-700);

  /* Steps */
  --rs-steps-state-process: var(--rs-primary-500);

  /* RadioTile */
  --rs-radio-tile-checked-color: var(--rs-primary-500);

  /* Menu */
  --rs-menuitem-active-bg: rgba(${primary100Rgb.r}, ${primary100Rgb.g}, ${primary100Rgb.b}, 0.5);
`;

  return cssContent;
}
