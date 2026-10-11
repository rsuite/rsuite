import React, { StrictMode, useEffect, useRef } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import CustomProvider from '../../../CustomProvider';
import type { Option } from '../../types';
import '../../../styles/_themes.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';

type Value = string | number;
type Key = { key: string; trusted: boolean };
const params = new URLSearchParams(window.location.hash.slice(1));
const custom = params.get('custom') === 'true';
const rtl = params.get('rtl') === 'true';
const labelKey = custom ? 'title' : 'label';
const valueKey = custom ? 'code' : 'value';
const childrenKey = custom ? 'nodes' : 'children';
const value: Value =
  params.get('value') === 'zero' ? 0 : params.get('value') === 'empty' ? '' : 'parent-key';
const child: Option<Value> = { [labelKey]: 'Child', [valueKey]: 'child-key' };
const parent: Option<Value> = { [labelKey]: 'Parent', [valueKey]: value, [childrenKey]: [child] };
const data = [parent, { [labelKey]: 'Last', [valueKey]: 'last-key' }];
const keys: Key[] = [];
document.addEventListener('keydown', event =>
  keys.push({ key: event.key, trusted: event.isTrusted })
);

function Fixture() {
  const events = useRef({ entered: false, changes: 0, selections: 0 });
  const Component: React.ElementType = params.get('picker') === 'multi' ? MultiCascader : Cascader;
  useEffect(() => {
    window.__RSUITE_CASCADER_PARENT_VALUES__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      snapshot: () => ({
        ...events.current,
        keys,
        parentValue: parent[valueKey],
        childPreserved: parent[childrenKey][0] === child
      })
    };
  }, []);
  return (
    <CustomProvider rtl={rtl}>
      <Component
        defaultOpen
        data={data}
        labelKey={labelKey}
        valueKey={valueKey}
        childrenKey={childrenKey}
        onEntered={() => {
          events.current.entered = true;
        }}
        onChange={() => events.current.changes++}
        onSelect={() => events.current.selections++}
      />
    </CustomProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fixture />
  </StrictMode>
);

declare global {
  interface Window {
    __RSUITE_CASCADER_PARENT_VALUES__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        entered: boolean;
        changes: number;
        selections: number;
        keys: Key[];
        parentValue: Value;
        childPreserved: boolean;
      };
    };
  }
}
