import { createStyleInput, styleInputKey, versionedStyleId } from './style-input';
import type { StyleInput } from './style-input';
import type { StyleVariables } from '../style-rules';

interface ComponentVersions {
  next: number;
  server: Map<string, StyleInput>;
  current?: { key: string; input: StyleInput };
}

/** Distinguish retried server styles without hashing values or keeping unbounded client histories. */
export class StyleVersions {
  private components = new Map<string, ComponentVersions>();

  register(input: StyleInput): void {
    let component = this.components.get(input.componentId);
    if (!component) {
      component = { next: 0, server: new Map() };
      this.components.set(input.componentId, component);
    }
    const key = styleInputKey(input.prefix, input.cssVars);
    if (!component.server.has(key)) component.server.set(key, input);
    component.next = Math.max(component.next, input.version + 1);
  }

  get(componentId: string, cssVars: StyleVariables, prefix: string, server: boolean): StyleInput {
    let component = this.components.get(componentId);
    if (!component && !server) return { componentId, cssVars, prefix, version: 0 };
    if (!component) {
      component = { next: 0, server: new Map() };
      this.components.set(componentId, component);
    }
    const key = styleInputKey(prefix, cssVars);
    const previous = component.server.get(key);
    if (previous) return previous;
    if (!server && component.current?.key === key) return component.current.input;
    const input = createStyleInput(componentId, prefix, cssVars, component.next++);
    if (server) component.server.set(key, input);
    else component.current = { key, input };
    return input;
  }

  getId(componentId: string, cssVars: StyleVariables, prefix: string, server: boolean): string {
    const input = this.get(componentId, cssVars, prefix, server);
    return versionedStyleId(componentId, input.version);
  }
}
