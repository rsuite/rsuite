export enum Colours {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Cyan = 'cyan',
  Blue = 'blue',
  Violet = 'violet'
}

// Define available shade values
export type ShadeValue = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Basic color type without shades
export type Color = `${Colours}`;

export type ColorGray = 'gray';

// Color with shade type (e.g., red.50, blue.500)
export type ColorShade = `${Colours}.${ShadeValue}` | `${ColorGray}.${ShadeValue}`;

// Combined type that allows both basic colors and colors with shades
export type ColorScheme = Color | ColorShade;
