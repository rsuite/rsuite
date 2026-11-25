import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import CascadeTree from '../../../CascadeTree';
import MultiCascadeTree from '../../../MultiCascadeTree';
import '../../../styles/_themes.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';
import '../../../CascadeTree/styles/index.scss';
import '../../../MultiCascadeTree/styles/index.scss';

type Value = string | number;
type Change = { value: Value | Value[] | null; trusted: boolean };
type State = { entered: boolean; value: Value | Value[] | null; changes: Change[] };
const params = new URLSearchParams(window.location.hash.slice(1));
const kind = params.get('kind') || 'Cascader';
const multiple = kind.startsWith('Multi');
const picker = kind.endsWith('Cascader');
const custom = params.get('custom') === 'true';
const dual = params.get('dual') === 'true';
const valueKey = custom ? 'code' : 'value';
const labelKey = custom ? 'title' : 'label';
const childrenKey = custom ? 'nodes' : 'children';
const literals: Record<string, Value> = { empty: '', quote: 'quote"key', space: 'path with space' };
const literal = params.get('literal');
const firstValue = literal ? literals[literal] : 0;
const first = { [valueKey]: firstValue, [labelKey]: 'First target' };
const second = { [valueKey]: '0', [labelKey]: 'Second target' };
const data = [{ [valueKey]: 'parent', [labelKey]: 'Parent', [childrenKey]: [first, second] }];
const components = { Cascader, MultiCascader, CascadeTree, MultiCascadeTree };
const Component: React.ElementType = components[kind as keyof typeof components];
const states = new Map<string, State>();

function Fixture({ name }: { name: string }) {
  const initiallySelected = params.get('selected') === 'true';
  const [value, setValue] = useState<Value | Value[] | null>(
    multiple ? (initiallySelected ? [firstValue] : []) : initiallySelected ? firstValue : null
  );
  const events = useRef({ entered: !picker, changes: [] as Change[] });
  useEffect(() => {
    states.set(name, { ...events.current, value });
  }, [name, value]);
  return (
    <section data-fixture={name} style={{ width: 360, height: 400, display: 'inline-block' }}>
      <Component
        data={data}
        value={value}
        valueKey={valueKey}
        labelKey={labelKey}
        childrenKey={childrenKey}
        disabledItemValues={params.get('disabled') === 'true' ? [firstValue] : []}
        searchable
        {...(multiple ? { cascade: false } : {})}
        {...(picker
          ? {
              label: `Picker ${name}`,
              ...(dual ? { open: true } : { defaultOpen: true }),
              container: () => document.getElementById(`popup-${name}`),
              onEntered: () => {
                events.current.entered = true;
                states.set(name, { ...events.current, value });
              }
            }
          : {})}
        onChange={(next: Value | Value[] | null, event: React.SyntheticEvent) => {
          events.current.changes.push({ value: next, trusted: event.nativeEvent.isTrusted });
          setValue(next);
        }}
      />
      <div id={`popup-${name}`} data-popup={name} />
    </section>
  );
}

window.__RSUITE_CASCADE_SEARCH_ARIA__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => Object.fromEntries(states)
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fixture name="one" />
    {dual && <Fixture name="two" />}
  </StrictMode>
);

declare global {
  interface Window {
    __RSUITE_CASCADE_SEARCH_ARIA__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => Record<string, State>;
    };
  }
}
