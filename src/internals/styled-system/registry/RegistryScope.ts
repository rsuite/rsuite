import { registryAttribute, renderRules, stateAttribute } from './serialization';
import { createStyleRules, type StyleVariables } from '../style-rules';
import { encodeStyleInput, readStyleInputs, versionedStyleId } from './style-input';
import { StyleVersions } from './StyleVersions';
import type { StyleInput } from './style-input';
import type { RegistryRule, RuleOptions, PendingStyleInput } from './types';

/** One provider's rules, including server-rendered children which have not hydrated yet. */
export class RegistryScope {
  readonly rules = new Map<string, RegistryRule>();
  readonly pending = new Map<string, RegistryRule>();
  readonly pendingInputs = new Map<string, PendingStyleInput>();
  private versions = new StyleVersions();
  private inputElements = new WeakMap<
    HTMLStyleElement,
    { value: string | null; inputs: StyleInput[] | null }
  >();
  private unclaimed = new Map<string, RegistryRule>();
  private claimed = new Set<string>();
  private serverKeys = new Set<string>();
  private elements = new Map<string | undefined, HTMLStyleElement>();
  private leases = 0;
  private releaseVersion = 0;
  private registered = false;
  private observer?: MutationObserver;

  constructor(
    readonly owner: string,
    private register: (scope: RegistryScope) => void,
    private unregister: (scope: RegistryScope) => void
  ) {}

  private activate(): void {
    if (this.registered) return;
    this.registered = true;
    this.register(this);
    this.unclaimed.forEach((rule, key) => this.rules.set(key, rule));
    if (typeof document !== 'undefined') {
      this.observer = new MutationObserver(records => {
        const hasServerStyles = records.some(
          record =>
            (record.type === 'attributes' &&
              record.target instanceof HTMLStyleElement &&
              record.target.getAttribute(registryAttribute) === this.owner) ||
            Array.from(record.addedNodes).some(
              node =>
                node instanceof HTMLStyleElement &&
                node.getAttribute(registryAttribute) === this.owner
            )
        );
        if (hasServerStyles) this.adopt();
      });
      this.observer.observe(document.head, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [stateAttribute, registryAttribute]
      });
    }
  }

  collect(selector: string, cssText: string, options?: RuleOptions): boolean {
    this.activate();
    const key = options?.key ?? selector;
    const previous = this.rules.get(key);
    if (
      previous?.selector === selector &&
      previous.cssText === cssText &&
      previous.nonce === options?.nonce
    )
      return false;
    const rule = { key, selector, cssText, nonce: options?.nonce };
    this.rules.set(key, rule);
    this.pending.set(key, rule);
    return true;
  }

  private readInputs(element: HTMLStyleElement): StyleInput[] | null {
    const value = element.getAttribute(stateAttribute);
    const cached = this.inputElements.get(element);
    if (cached?.value === value) return cached.inputs;
    const inputs = readStyleInputs(value);
    this.inputElements.set(element, { value, inputs });
    inputs?.forEach(input => this.versions.register(input));
    return inputs;
  }

  getStyleId(componentId: string, cssVars: StyleVariables, prefix: string): string {
    if (typeof document !== 'undefined')
      this.serverElements().forEach(element => this.readInputs(element));
    return this.versions.getId(componentId, cssVars, prefix, typeof document === 'undefined');
  }

  collectStyles(
    componentId: string,
    cssVars: StyleVariables,
    prefix: string,
    nonce?: string
  ): void {
    const input = this.versions.get(componentId, cssVars, prefix, true);
    const id = versionedStyleId(componentId, input.version);
    const rules = createStyleRules(id, input.cssVars, prefix).map(rule => ({
      ...rule,
      key: rule.key ?? rule.selector,
      nonce
    }));
    let changed = false;
    for (const rule of rules) {
      if (this.collect(rule.selector, rule.cssText, { key: rule.key, nonce })) changed = true;
    }
    if (changed)
      this.pendingInputs.set(JSON.stringify([componentId, input.version]), {
        state: encodeStyleInput(input),
        rules,
        nonce
      });
  }

  private serverElements(): HTMLStyleElement[] {
    return Array.from(
      document.querySelectorAll<HTMLStyleElement>(`style[${registryAttribute}]`)
    ).filter(element => element.getAttribute(registryAttribute) === this.owner);
  }

  private adopt(): void {
    this.activate();
    const adopted: HTMLStyleElement[] = [];
    for (const element of this.serverElements()) {
      const inputs = this.readInputs(element);
      if (!inputs) continue;
      for (const input of inputs) {
        const id = versionedStyleId(input.componentId, input.version);
        for (const generated of createStyleRules(id, input.cssVars, input.prefix)) {
          const key = generated.key ?? generated.selector;
          this.serverKeys.add(key);
          if (this.claimed.has(key)) continue;
          const rule = { ...generated, key, nonce: element.nonce || undefined };
          this.rules.set(key, rule);
          this.unclaimed.set(key, rule);
        }
      }
      adopted.push(element);
    }
    if (adopted.length) {
      this.updateStyles();
      adopted.forEach(element => element.remove());
    }
  }

  private updateStyles(): void {
    const groups = new Map<string | undefined, RegistryRule[]>();
    this.rules.forEach(rule => {
      const group = groups.get(rule.nonce) || [];
      group.push(rule);
      groups.set(rule.nonce, group);
    });
    this.elements.forEach((element, nonce) => {
      if (!groups.has(nonce)) {
        element.remove();
        this.elements.delete(nonce);
      }
    });
    groups.forEach((rules, nonce) => {
      let element = this.elements.get(nonce);
      if (!element) {
        element = document.createElement('style');
        element.setAttribute('data-rs-style-registry-client', this.owner);
        if (nonce !== undefined) element.nonce = nonce;
        element.textContent = renderRules(rules);
        document.head.appendChild(element);
        this.elements.set(nonce, element);
      } else {
        element.textContent = renderRules(rules);
      }
    });
  }

  addRule(selector: string, cssText: string, options?: RuleOptions): void {
    this.adopt();
    const key = options?.key ?? selector;
    this.claimed.add(key);
    this.unclaimed.delete(key);
    this.collect(selector, cssText, options);
    this.updateStyles();
  }

  removeRule(key: string): void {
    this.adopt();
    if (this.serverKeys.has(key)) this.claimed.add(key);
    else this.claimed.delete(key);
    this.unclaimed.delete(key);
    this.rules.delete(key);
    this.pending.delete(key);
    this.updateStyles();
  }

  retain(): () => void {
    this.activate();
    this.leases++;
    this.releaseVersion++;
    this.adopt();
    this.updateStyles();
    return () => {
      this.leases--;
      const version = ++this.releaseVersion;
      // StrictMode immediately re-establishes effects. Keep unhydrated rules during that cycle.
      queueMicrotask(() => {
        if (this.leases || version !== this.releaseVersion) return;
        this.observer?.disconnect();
        this.observer = undefined;
        this.elements.forEach(element => element.remove());
        this.elements.clear();
        this.serverElements().forEach(element => element.remove());
        this.rules.clear();
        this.pending.clear();
        this.pendingInputs.clear();
        this.registered = false;
        this.unregister(this);
      });
    };
  }
}
