import { isResponsiveValue } from '../responsive';
import type { StyleVariables } from '../style-rules';

type ScalarEntry = [key: string] | [key: string, value: string];
type InputEntry = ScalarEntry | [key: string, value: ScalarEntry[]];
export type StyleInputState = [
  componentId: string,
  prefix: string,
  version: number,
  vars: InputEntry[]
];

export interface StyleInput {
  componentId: string;
  prefix: string;
  version: number;
  cssVars: StyleVariables;
}

function encodeVariables(cssVars: StyleVariables): InputEntry[] {
  return Object.entries(cssVars).map(([key, value]): InputEntry => {
    if (value === undefined) return [key];
    if (isResponsiveValue(value)) {
      return [
        key,
        Object.entries(value).map(
          ([name, item]): ScalarEntry => (item === undefined ? [name] : [name, String(item)])
        )
      ];
    }
    return [key, String(value)];
  });
}

export function styleInputKey(prefix: string, cssVars: StyleVariables): string {
  return JSON.stringify([prefix, encodeVariables(cssVars)]);
}

export function encodeStyleInput(input: StyleInput): StyleInputState {
  return [input.componentId, input.prefix, input.version, encodeVariables(input.cssVars)];
}

function decodeEntries(value: unknown, responsive: boolean): Record<string, unknown> | null {
  if (!Array.isArray(value)) return null;
  const entries: [string, unknown][] = [];
  const keys = new Set<string>();
  for (const entry of value) {
    if (!Array.isArray(entry) || entry.length < 1 || entry.length > 2) return null;
    const [key, item] = entry;
    if (typeof key !== 'string' || keys.has(key)) return null;
    keys.add(key);
    if (entry.length === 1) entries.push([key, undefined]);
    else if (typeof item === 'string') entries.push([key, item]);
    else {
      if (!responsive) return null;
      const nested = decodeEntries(item, false);
      if (!nested || !isResponsiveValue(nested)) return null;
      entries.push([key, nested]);
    }
  }
  return Object.fromEntries(entries);
}

export function createStyleInput(
  componentId: string,
  prefix: string,
  cssVars: StyleVariables,
  version: number
): StyleInput {
  return {
    componentId,
    prefix,
    version,
    cssVars: decodeEntries(encodeVariables(cssVars), true) as StyleVariables
  };
}

export function readStyleInputs(value: string | null): StyleInput[] | null {
  if (!value) return null;
  try {
    const state = JSON.parse(value);
    if (state?.version !== 3 || !Array.isArray(state.inputs)) return null;
    const inputs: StyleInput[] = [];
    for (const row of state.inputs) {
      if (!Array.isArray(row) || row.length !== 4) return null;
      const [componentId, prefix, version, vars] = row;
      if (typeof componentId !== 'string' || !componentId || typeof prefix !== 'string')
        return null;
      if (!Number.isSafeInteger(version) || version < 0 || version >= Number.MAX_SAFE_INTEGER)
        return null;
      const cssVars = decodeEntries(vars, true);
      if (!cssVars) return null;
      inputs.push({ componentId, prefix, version, cssVars: cssVars as StyleVariables });
    }
    return inputs;
  } catch {
    return null;
  }
}

export function versionedStyleId(componentId: string, version: number): string {
  // Literal percent signs are reserved by encodeStyleId; 'v' cannot be a hex escape marker.
  return `${componentId}%v${version}%`;
}
