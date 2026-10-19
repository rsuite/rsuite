import React from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { StyleManager } from '../style-manager';
import RootStyleFixture, { type RootStyleSpec } from './identifiers.fixture';

declare global {
  interface Window {
    __RSUITE_STYLE_ROOTS__: {
      hydrate: () => void;
      update: (id: string, patch: Partial<Pick<RootStyleSpec, 'color' | 'padding'>>) => void;
      unmount: (id: string) => void;
      ruleCount: () => number;
      errors: string[];
    };
  }
}

const specs = JSON.parse(document.getElementById('root-config')!.textContent!) as RootStyleSpec[];
const roots = new Map<string, Root>();
const errors: string[] = [];
window.__RSUITE_STYLE_ROOTS__ = {
  errors,
  hydrate() {
    specs.forEach(spec => {
      roots.set(
        spec.id,
        hydrateRoot(document.getElementById('root-' + spec.id)!, <RootStyleFixture spec={spec} />, {
          identifierPrefix: spec.prefix,
          onRecoverableError: error => errors.push(String(error))
        })
      );
    });
  },
  update(id, patch) {
    const spec = specs.find(item => item.id === id)!;
    Object.assign(spec, patch);
    roots.get(id)!.render(<RootStyleFixture spec={spec} />);
  },
  unmount(id) {
    roots.get(id)!.unmount();
    roots.delete(id);
  },
  ruleCount: () => StyleManager.styleMap.size
};
