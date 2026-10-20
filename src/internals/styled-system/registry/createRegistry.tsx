import React from 'react';
import { RegistryScope } from './RegistryScope';
import { renderStyleElements } from './serialization';
import type { StyleRegistryInstance } from './types';

interface RegistryController {
  getScope(owner: string): RegistryScope;
}

const controllers = new WeakMap<StyleRegistryInstance, RegistryController>();

export function createRegistry(): StyleRegistryInstance {
  const scopes = new Map<string, RegistryScope>();
  const registry: StyleRegistryInstance = {
    getStyleElement(): React.ReactElement | null {
      if (typeof document !== 'undefined') return null;
      const elements = Array.from(scopes.values()).flatMap(scope =>
        renderStyleElements(scope.owner, scope.pendingInputs.values())
      );
      return elements.length ? <>{elements}</> : null;
    },
    flush() {
      scopes.forEach(scope => {
        scope.pending.clear();
        scope.pendingInputs.clear();
      });
    }
  };
  controllers.set(registry, {
    getScope(owner) {
      return (
        scopes.get(owner) ||
        new RegistryScope(
          owner,
          scope => scopes.set(owner, scope),
          scope => {
            if (scopes.get(owner) === scope) scopes.delete(owner);
          }
        )
      );
    }
  });
  return registry;
}

export function getRegistryScope(registry: StyleRegistryInstance, owner: string): RegistryScope {
  const controller = controllers.get(registry);
  if (!controller) throw new Error('StyleRegistry requires a registry from createStyleRegistry().');
  return controller.getScope(owner);
}
