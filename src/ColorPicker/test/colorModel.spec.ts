import { describe, expect, it } from 'vitest';
import { formatColor, parseColor, toRgb } from '../colorModel';

describe('ColorPicker color model', () => {
  it.each([
    ['#f00', '#ff0000', 0, 100, 100],
    ['#0f0', '#00ff00', 120, 100, 100],
    ['#00f', '#0000ff', 240, 100, 100],
    ['#ff0', '#ffff00', 60, 100, 100],
    ['#0ff', '#00ffff', 180, 100, 100],
    ['#f0f', '#ff00ff', 300, 100, 100],
    ['#fff', '#ffffff', 0, 0, 100],
    ['#000', '#000000', 0, 0, 0],
    ['  #Ff0000  ', '#ff0000', 0, 100, 100],
    ['rgb(255, 0, 0)', '#ff0000', 0, 100, 100],
    ['rgb(100% 0% 0%)', '#ff0000', 0, 100, 100],
    ['rgb(300, -10, 0)', '#ff0000', 0, 100, 100],
    ['hsl(120, 100%, 50%)', '#00ff00', 120, 100, 100],
    ['hsl(-120deg 100% 50%)', '#0000ff', 240, 100, 100],
    ['hsl(.5turn 100% 50%)', '#00ffff', 180, 100, 100],
    ['hsl(200grad 100% 50%)', '#00ffff', 180, 100, 100],
    ['hsl(3.141592653589793rad 100% 50%)', '#00ffff', 180, 100, 100]
  ])('parses %s', (value, hex, h, s, v) => {
    const color = parseColor(value as string)!;
    expect(color.h).toBeCloseTo(h as number);
    expect(color.s).toBeCloseTo(s as number);
    expect(color.v).toBeCloseTo(v as number);
    expect(color.a).toBe(1);
    expect(formatColor(color)).toBe(hex);
  });

  it.each([
    ['#1234', '#11223344', 0x44 / 255],
    ['#12345600', '#12345600', 0],
    ['#123456ff', '#123456', 1],
    ['rgba(255, 0, 0, .5)', '#ff000080', 0.5],
    ['rgb(255 0 0 / 50%)', '#ff000080', 0.5],
    ['hsla(0, 100%, 50%, .5)', '#ff000080', 0.5],
    ['hsl(0 100% 50% / 50%)', '#ff000080', 0.5],
    ['rgb(255 0 0 / -10%)', '#ff000000', 0],
    ['rgb(255 0 0 / 200%)', '#ff0000', 1],
    ['transparent', '#00000000', 0]
  ])('preserves opacity in %s', (value, hex, alpha) => {
    const color = parseColor(value as string)!;
    expect(color.a).toBe(alpha);
    expect(formatColor(color)).toBe(hex);
  });

  it.each([
    null,
    undefined,
    '',
    ' ',
    '#12',
    '#12345',
    '#1234567',
    '#ggg',
    'ff0000',
    'rgb()',
    'rgb(1,2)',
    'rgb(1,,3)',
    'rgb(1,2,3,)',
    'rgb(1,2,3 / .5)',
    'rgb(1 2 3 .5)',
    'rgb(1 2 3 /)',
    'rgb(1 2 3 / .5 / .5)',
    'rgb(1 2 NaN)',
    'rgb(1 2 Infinity)',
    'rgb(1 2 1e999)',
    'rgb(1,2%,3)',
    'hsl(0,100,50)',
    'hsl(deg 100% 50%)',
    'hsl(1e308turn 100% 50%)',
    'hsl(0 100% nope)',
    'var(--color)',
    'url(example.svg)',
    'rgb(1 2 3) trailing'
  ])('rejects invalid or unsupported input %j', value => {
    expect(parseColor(value)).toBeNull();
  });

  it('keeps a selected hue when RGB becomes achromatic', () => {
    expect(parseColor('#888', 240)?.h).toBe(240);
    expect(parseColor('#000', 120)?.h).toBe(120);
    expect(parseColor('transparent', 300)?.h).toBe(300);
    expect(parseColor('hsl(90 0% 50%)', 240)?.h).toBe(90);
  });

  it('serializes RGB and HSL with opacity', () => {
    const color = { h: 120, s: 100, v: 100, a: 0.5 };
    expect(toRgb(color)).toEqual([0, 255, 0]);
    expect(formatColor(color, 'rgb')).toBe('rgba(0, 255, 0, 0.5)');
    expect(formatColor(color, 'hsl')).toBe('hsla(120, 100%, 50%, 0.5)');
    expect(formatColor({ ...color, a: 1 }, 'rgb')).toBe('rgb(0, 255, 0)');
    expect(formatColor({ ...color, a: 1 }, 'hsl')).toBe('hsl(120, 100%, 50%)');
  });

  it('round trips all channel boundary combinations without losing bytes', () => {
    for (const r of [0, 1, 127, 128, 254, 255]) {
      for (const g of [0, 1, 127, 128, 254, 255]) {
        for (const b of [0, 1, 127, 128, 254, 255]) {
          const hex = '#' + [r, g, b].map(value => value.toString(16).padStart(2, '0')).join('');
          expect(formatColor(parseColor(hex)!)).toBe(hex);
        }
      }
    }
  });

  it('agrees with the browser for supported CSS color inputs', () => {
    const node = document.createElement('div');
    document.body.append(node);
    try {
      for (const input of [
        '#2468',
        'rgb(20% 40% 60% / 50%)',
        'hsl(210 50% 40%)',
        'hsl(-.25turn 80% 25% / .25)',
        'rgb(300 -10 0 / 200%)'
      ]) {
        node.style.color = input;
        expect(node.style.color).not.toBe('');
        const expected = getComputedStyle(node).color;
        node.style.color = formatColor(parseColor(input)!, 'rgb');
        expect(getComputedStyle(node).color).toBe(expected);
      }
    } finally {
      node.remove();
    }
  });
});
