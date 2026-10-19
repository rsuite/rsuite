export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface ColorChannels {
  /** Hue in degrees. */
  h: number;
  /** Saturation and brightness as percentages. */
  s: number;
  v: number;
  /** Opacity from zero to one. */
  a: number;
}

const numberPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;
const clamp = (value: number, max = 1) => Math.min(max, Math.max(0, value));
const hue = (value: number) => ((value % 360) + 360) % 360;
const rounded = (value: number) => Math.round(value * 1000) / 1000;

function number(value: string): number | null {
  if (!numberPattern.test(value)) return null;
  const result = Number(value);
  return Number.isFinite(result) ? result : null;
}

function channel(value: string, max = 1): number | null {
  const percentage = value.endsWith('%');
  const result = number(percentage ? value.slice(0, -1) : value);
  return result === null ? null : clamp(percentage ? (result * max) / 100 : result, max);
}

function angle(value: string): number | null {
  const match = /^(.*?)(deg|grad|rad|turn)?$/.exec(value);
  const result = match && number(match[1]);
  if (result === null) return null;
  const factor: Record<string, number> = { deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 };
  const degrees = result * (match?.[2] ? factor[match[2]] : 1);
  return Number.isFinite(degrees) ? hue(degrees) : null;
}

function fromRgb(r: number, g: number, b: number, a: number, fallbackHue: number): ColorChannels {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = fallbackHue;
  if (delta) {
    if (max === r) h = ((g - b) / delta) * 60;
    else if (max === g) h = ((b - r) / delta + 2) * 60;
    else h = ((r - g) / delta + 4) * 60;
  }
  return { h: hue(h), s: max ? (delta / max) * 100 : 0, v: (max / 255) * 100, a };
}

/** Parse sRGB hex, rgb()/rgba(), hsl()/hsla(), or transparent without a DOM. */
export function parseColor(
  value: string | null | undefined,
  fallbackHue = 0
): ColorChannels | null {
  if (typeof value !== 'string') return null;
  const text = value.trim().toLowerCase();
  if (text === 'transparent') return { h: hue(fallbackHue), s: 0, v: 0, a: 0 };

  const hex = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/.exec(text);
  if (hex) {
    const digits = hex[1].length < 5 ? [...hex[1]].map(digit => digit + digit).join('') : hex[1];
    const values = digits.match(/../g)!.map(pair => parseInt(pair, 16));
    return fromRgb(values[0], values[1], values[2], (values[3] ?? 255) / 255, fallbackHue);
  }

  const functional = /^(rgba?|hsla?)\((.*)\)$/.exec(text);
  if (!functional) return null;
  const body = functional[2].trim();
  const legacy = body.includes(',');
  let parts: string[];
  if (legacy) {
    if (body.includes('/')) return null;
    parts = body.split(',').map(part => part.trim());
    if (parts.length !== 3 && parts.length !== 4) return null;
  } else {
    const [components, alpha, extra] = body.split('/');
    if (extra !== undefined) return null;
    parts = components.trim().split(/\s+/);
    if (parts.length !== 3) return null;
    if (alpha !== undefined) parts.push(alpha.trim());
  }
  const a = parts.length === 4 ? channel(parts[3]) : 1;
  if (a === null) return null;

  if (functional[1].startsWith('rgb')) {
    // The comma syntax requires all three channels to use the same unit.
    if (legacy && parts.slice(0, 3).some(part => part.endsWith('%') !== parts[0].endsWith('%')))
      return null;
    const [r, g, b] = parts.slice(0, 3).map(part => channel(part, 255));
    if (r === null || g === null || b === null) return null;
    return fromRgb(r, g, b, a, fallbackHue);
  }

  const h = angle(parts[0]);
  if (h === null || !parts[1].endsWith('%') || !parts[2].endsWith('%')) return null;
  const s = channel(parts[1]);
  const l = channel(parts[2]);
  if (s === null || l === null) return null;
  const v = l + s * Math.min(l, 1 - l);
  return { h, s: v ? 2 * (1 - l / v) * 100 : 0, v: v * 100, a };
}

export function toRgb(color: ColorChannels): [number, number, number] {
  const h = hue(color.h) / 60;
  const v = clamp(color.v, 100) / 100;
  const chroma = (v * clamp(color.s, 100)) / 100;
  const x = chroma * (1 - Math.abs((h % 2) - 1));
  const components = [
    [chroma, x, 0],
    [x, chroma, 0],
    [0, chroma, x],
    [0, x, chroma],
    [x, 0, chroma],
    [chroma, 0, x]
  ][Math.floor(h)];
  return components.map(value => Math.round((value + v - chroma) * 255)) as [
    number,
    number,
    number
  ];
}

export function formatColor(color: ColorChannels, format: ColorFormat = 'hex'): string {
  const rgb = toRgb(color);
  const a = clamp(color.a);
  if (format === 'hex') {
    const values = a < 1 ? [...rgb, Math.round(a * 255)] : rgb;
    return '#' + values.map(value => value.toString(16).padStart(2, '0')).join('');
  }
  if (format === 'rgb') {
    return a < 1 ? `rgba(${rgb.join(', ')}, ${rounded(a)})` : `rgb(${rgb.join(', ')})`;
  }
  const v = clamp(color.v, 100) / 100;
  const l = v * (1 - clamp(color.s, 100) / 200);
  const s = l > 0 && l < 1 ? (v - l) / Math.min(l, 1 - l) : 0;
  const components = `${rounded(hue(color.h))}, ${rounded(s * 100)}%, ${rounded(l * 100)}%`;
  return a < 1 ? `hsla(${components}, ${rounded(a)})` : `hsl(${components})`;
}
