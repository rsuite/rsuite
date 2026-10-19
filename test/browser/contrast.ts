export function rgba(value: string): number[] {
  const color = `color(from ${value} srgb r g b / alpha)`;
  if (!CSS.supports('color', color)) throw new Error(`Cannot normalize color: ${value}`);
  const probe = document.createElement('span');
  probe.style.cssText = 'position:fixed;visibility:hidden;width:0;height:0;pointer-events:none';
  probe.style.color = color;
  document.documentElement.appendChild(probe);
  try {
    const resolved = getComputedStyle(probe).color;
    const channels = resolved.match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)!.map(Number);
    const scale = resolved.startsWith('color(srgb ') ? 255 : 1;
    return [...channels.slice(0, 3).map(channel => channel * scale), channels[3] ?? 1];
  } finally {
    probe.remove();
  }
}

export function luminance(color: number[]): number {
  const linear = color.slice(0, 3).map(channel => {
    const value = Math.min(255, Math.max(0, channel)) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function contrast(first: number[], second: number[]): number {
  const values = [luminance(first), luminance(second)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

export function background(element: Element): number[] {
  const color = rgba(getComputedStyle(element).backgroundColor);
  const behind = element.parentElement ? background(element.parentElement) : [255, 255, 255];
  return color
    .slice(0, 3)
    .map((channel, index) => channel * color[3] + behind[index] * (1 - color[3]));
}
