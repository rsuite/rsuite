import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import MultiCascader from '..';
import CustomProvider from '../../CustomProvider';
import type { Option } from '../../internals/types';
import '../../styles/_themes.scss';
import '../styles/index.scss';

type Value = string | number;
type Key = { key: string; trusted: boolean };
type Change = { value: Value[]; trusted: boolean };
type Selection = { path: Value[]; rawParent: boolean; trusted: boolean };
type Check = { value: Value[]; rawLeaf: boolean; checked: boolean; trusted: boolean };
const scenario = window.location.hash.slice(1);
const custom = scenario === 'custom';
const childrenKey = custom ? 'nodes' : 'children';
const labelKey = custom ? 'title' : 'label';
const valueKey = custom ? 'code' : 'value';
const multilevel = custom || scenario === 'standard';
const leaf: Option<Value> = {
  [labelKey]: multilevel ? 'Enabled leaf' : scenario === 'async' ? 'Loaded child' : 'Child',
  [valueKey]: ['numeric', 'async', 'standard', 'custom'].includes(scenario)
    ? 42
    : scenario === 'string'
      ? 'child-key'
      : 'child'
};
const data: Option<Value>[] = multilevel
  ? [
      {
        [labelKey]: 'Root',
        [valueKey]: 8,
        [childrenKey]: [
          {
            [labelKey]: 'Branch',
            [valueKey]: 'branch',
            [childrenKey]: [{ [labelKey]: 'Disabled leaf', [valueKey]: 'blocked' }, leaf]
          }
        ]
      }
    ]
  : [
      { label: 'Parent', value: 'parent', children: scenario === 'async' ? [] : [leaf] },
      { label: 'Last', value: 'last' }
    ];
const keys: Key[] = [];
document.addEventListener('keydown', event => {
  keys.push({ key: event.key, trusted: event.isTrusted });
});

function Fixture() {
  const [value, setValue] = useState<Value[]>([]);
  const outside = useRef<HTMLButtonElement>(null);
  const resolveChildren = useRef<((children: Option<Value>[]) => void) | null>(null);
  const events = useRef({
    entered: false,
    loadCalls: 0,
    changes: [] as Change[],
    selections: [] as Selection[],
    checks: [] as Check[]
  });
  useEffect(() => {
    window.__RSUITE_MULTI_CASCADER_COLUMNS__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      resolveChildren: () => resolveChildren.current?.([leaf]),
      snapshot: () => ({ value, keys, ...events.current })
    };
  });
  return (
    <CustomProvider rtl={scenario === 'rtl'}>
      <div style={{ padding: 24 }}>
        <button ref={outside}>Outside action</button>
        <MultiCascader
          defaultOpen
          data={data}
          childrenKey={childrenKey}
          labelKey={labelKey}
          valueKey={valueKey}
          {...(multilevel || scenario === 'mouse' ? { value } : {})}
          cascade={!multilevel && !['async', 'mouse'].includes(scenario)}
          disabledItemValues={['blocked']}
          onEntered={() => {
            events.current.entered = true;
          }}
          getChildren={
            scenario === 'async'
              ? () => {
                  events.current.loadCalls++;
                  return new Promise(resolve => {
                    resolveChildren.current = resolve;
                  });
                }
              : undefined
          }
          renderColumn={
            scenario === 'column-focus'
              ? children => (
                  <div
                    onFocus={event => {
                      if ((event.target as HTMLElement).dataset.key === 'child') {
                        outside.current?.focus();
                      }
                    }}
                  >
                    {children}
                  </div>
                )
              : undefined
          }
          onChange={(next, event) => {
            events.current.changes.push({ value: next, trusted: event.nativeEvent.isTrusted });
            setValue(next);
            if (scenario === 'mouse') outside.current?.focus();
          }}
          onSelect={(node, path, event) => {
            events.current.selections.push({
              path: path.map(item => item[valueKey]),
              rawParent: node === data[0],
              trusted: event.nativeEvent.isTrusted
            });
          }}
          onCheck={(next, node, checked, event) => {
            events.current.checks.push({
              value: next,
              rawLeaf: node === leaf,
              checked,
              trusted: event.nativeEvent.isTrusted
            });
          }}
        />
      </div>
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
    __RSUITE_MULTI_CASCADER_COLUMNS__: {
      runtime: { react: string; reactDOM: string };
      resolveChildren: () => void;
      snapshot: () => {
        value: Value[];
        keys: Key[];
        entered: boolean;
        loadCalls: number;
        changes: Change[];
        selections: Selection[];
        checks: Check[];
      };
    };
  }
}
