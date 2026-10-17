import { addClass, removeClass, hasClass } from '../DOMHelper';
import { prefix } from '@/internals/utils';
import type { CustomProviderProps } from '@/internals/Provider/CustomContext';

type Theme = NonNullable<CustomProviderProps['theme']>;

interface ThemeState {
  baseline: Set<string>;
  applied?: Set<string>;
  owners: Map<symbol, string>;
}

const themes: Theme[] = ['light', 'dark', 'high-contrast'];
const bodies = new WeakMap<HTMLElement, Map<string, ThemeState>>();

function sameClasses(left: Set<string>, right?: Set<string>) {
  return !!right && left.size === right.size && [...left].every(name => right.has(name));
}

function externalClasses(current: Set<string>, state: ThemeState) {
  return new Set(
    [...current].filter(name => !state.applied?.has(name) || state.baseline.has(name))
  );
}

export function registerThemeClass(body: HTMLElement, classPrefix: string, theme: Theme) {
  const names = themes.map(theme => prefix(classPrefix, `theme-${theme}`));
  // Legacy prefixes with and without a trailing dash address the same classes.
  const key = names[0];
  const read = () => new Set(names.filter(name => hasClass(body, name)));
  let groups = bodies.get(body);
  if (!groups) {
    groups = new Map();
    bodies.set(body, groups);
  }
  let state = groups.get(key);
  const current = read();
  if (state && !sameClasses(current, state.applied)) {
    const baseline = externalClasses(current, state);
    state.owners.clear();
    state = { baseline, owners: new Map() };
    groups.set(key, state);
  } else if (!state) {
    state = { baseline: current, owners: new Map() };
    groups.set(key, state);
  }
  const owner = Symbol();
  state.owners.set(owner, prefix(classPrefix, `theme-${theme}`));

  const apply = (next: Set<string>) => {
    next.forEach(name => addClass(body, name));
    names.forEach(name => {
      if (!next.has(name)) removeClass(body, name);
    });
    state.applied = next;
  };
  apply(new Set([prefix(classPrefix, `theme-${theme}`)]));

  return () => {
    if (!state.owners.delete(owner)) return;
    const current = read();
    if (sameClasses(current, state.applied)) {
      const latest = [...state.owners.values()].pop();
      apply(latest ? new Set([latest]) : state.baseline);
    } else {
      // Outside changes supersede older effects, including their introduced classes.
      const external = externalClasses(current, state);
      state.owners.clear();
      apply(external);
    }
    if (state.owners.size === 0 && groups.get(key) === state) {
      groups.delete(key);
      if (groups.size === 0) bodies.delete(body);
    }
  };
}
