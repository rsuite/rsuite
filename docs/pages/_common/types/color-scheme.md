### `ts:ColorScheme`

```ts
type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
type ShadeValue = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Color with shade type (e.g., red.50, blue.500)
type ColorShade = `${Colours}.${ShadeValue}` | `${ColorGray}.${ShadeValue}`;

// Combined type that allows both basic colors and colors with shades
type ColorScheme = Color | ColorShade;
```
