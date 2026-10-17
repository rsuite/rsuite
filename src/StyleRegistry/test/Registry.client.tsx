import { hydrateRoot } from 'react-dom/client';
import createStyleRegistry from '@/createStyleRegistry';
import { createRegistryFixture, type RegistrySpec } from './Registry.fixture';
import type { StyleRegistryInstance } from '@/createStyleRegistry';

const specs: RegistrySpec[] = JSON.parse(document.querySelector('#registry-config')!.textContent!);
const records = new Map<
  string,
  { spec: RegistrySpec; registry: StyleRegistryInstance; root?: ReturnType<typeof hydrateRoot> }
>(specs.map(spec => [spec.id, { spec, registry: createStyleRegistry() }]));
const errors: string[] = [];

const controls = {
  errors,
  hydrate(id: string) {
    const record = records.get(id)!;
    record.root = hydrateRoot(
      document.querySelector('#root-' + id)!,
      createRegistryFixture(record.registry, record.spec),
      {
        identifierPrefix: record.spec.prefix,
        onRecoverableError: error => errors.push(String(error))
      }
    );
  },
  update(id: string, patch: Partial<RegistrySpec>) {
    const record = records.get(id)!;
    record.spec = { ...record.spec, ...patch };
    record.root!.render(createRegistryFixture(record.registry, record.spec));
  },
  unmount(id: string) {
    records.get(id)!.root!.unmount();
  },
  append(html: string) {
    document.head.insertAdjacentHTML('beforeend', html);
  }
};

declare global {
  interface Window {
    __RSUITE_REGISTRY_TEST__: typeof controls;
    __registryInjected?: boolean;
  }
}

window.__RSUITE_REGISTRY_TEST__ = controls;
