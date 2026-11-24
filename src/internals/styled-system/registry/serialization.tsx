import React from 'react';
import type { RegistryRule, PendingStyleInput } from './types';

export const registryAttribute = 'data-rs-style-registry';
export const stateAttribute = 'data-rs-style-state';

export function renderRules(rules: Iterable<RegistryRule>): string {
  return Array.from(rules, rule => `${rule.selector} { ${rule.cssText} }\n`).join('');
}

function serializeCSS(value: string): string {
  // Match CSS preprocessing and keep HTML from terminating the style element.
  return value
    .replace(/\r\n?|\f/g, '\n')
    .replace(/[\0\uD800-\uDFFF]/gu, '\ufffd')
    .replace(/</g, '\\3c ');
}

export function renderStyleElements(
  owner: string,
  inputs: Iterable<PendingStyleInput>
): React.ReactElement[] {
  const groups = new Map<string | undefined, PendingStyleInput[]>();
  for (const input of inputs) {
    const group = groups.get(input.nonce) || [];
    group.push(input);
    groups.set(input.nonce, group);
  }

  return Array.from(groups, ([nonce, group], index) => {
    const state = group.map(input => input.state);
    const css = serializeCSS(renderRules(group.flatMap(input => input.rules)));
    return (
      <style
        key={`${owner}-${index}`}
        nonce={nonce}
        data-rs-style-registry={owner}
        data-rs-style-state={JSON.stringify({ version: 3, inputs: state })}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });
}
