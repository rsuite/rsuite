import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import CascadeTree from '../../../CascadeTree';
import MultiCascadeTree from '../../../MultiCascadeTree';
import type { Option } from '../../types';
import '../../../styles/_themes.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';
import '../../../CascadeTree/styles/index.scss';
import '../../../MultiCascadeTree/styles/index.scss';

type Value = string | number;
type EventInfo = { trusted: boolean; originalEvent: boolean };
type Change = EventInfo & { value: Value | Value[] | null };
type Check = EventInfo & { value: Value[]; leaf: Value; checked: boolean; originalLeaf: boolean };
type Selection = EventInfo & { value: Value; originalLeaf: boolean };
const params = new URLSearchParams(window.location.hash.slice(1));
const kind = params.get('kind') || 'MultiCascader';
const scenario = params.get('scenario') || 'mixed';
const custom = params.get('custom') === 'true';
const reverse = params.get('reverse') === 'true';
const valueKey = custom ? 'code' : 'value';
const labelKey = custom ? 'title' : 'label';
const childrenKey = custom ? 'nodes' : 'children';
const multi = kind.startsWith('Multi');
const picker = kind.endsWith('Cascader');
const components = { Cascader, MultiCascader, CascadeTree, MultiCascadeTree };
const literals: Record<string, Value> = {
  quote: 'quote"key',
  slash: 'path\\segment',
  zero: 0,
  empty: ''
};
const literal = Object.hasOwn(literals, scenario);
const first: Option<Value> = {
  [labelKey]: 'First target',
  [valueKey]: literal
    ? literals[scenario]
    : scenario === 'distinct'
      ? 'first-key'
      : reverse
        ? '0'
        : 0
};
const second: Option<Value> = {
  [labelKey]: 'Second target',
  [valueKey]: scenario === 'distinct' ? 'second-key' : reverse ? 0 : '0'
};
const leaves = literal ? [first] : [first, second];
const parent: Option<Value> = {
  [labelKey]: 'Parent',
  [valueKey]: 'parent-key',
  [childrenKey]: scenario === 'loaded' ? [] : leaves
};
const initialData = scenario === 'rows' ? leaves : [parent];
const initialValue: Value[] =
  scenario === 'checked'
    ? [first[valueKey]]
    : scenario === 'reorder'
      ? [params.get('initial') === 'number' ? 0 : '0']
      : [];
const keys: { key: string; trusted: boolean }[] = [];
let capturedEvent: Event;
document.addEventListener(
  'keydown',
  event => {
    capturedEvent = event;
    keys.push({ key: event.key, trusted: event.isTrusted });
  },
  true
);
document.addEventListener(
  'click',
  event => {
    capturedEvent = event;
  },
  true
);
const eventInfo = (event: React.SyntheticEvent): EventInfo => ({
  trusted: event.nativeEvent.isTrusted,
  originalEvent: event.nativeEvent === capturedEvent
});

function Fixture() {
  const [data, setData] = useState(initialData);
  const [values, setValues] = useState<Value[]>(initialValue);
  const [value, setValue] = useState<Value | null>(null);
  const [locked, setLocked] = useState(false);
  const events = useRef({
    entered: !picker,
    loadCalls: 0,
    revision: 0,
    changes: [] as Change[],
    checks: [] as Check[],
    selections: [] as Selection[]
  });
  const Component: React.ElementType = components[kind as keyof typeof components];
  useEffect(() => {
    events.current.revision++;
    window.__RSUITE_CASCADE_IDENTITY__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      snapshot: () => ({ ...events.current, keys, values, value, locked }),
      lock: () => setLocked(true),
      reorder: () =>
        setData(previous =>
          scenario === 'rows'
            ? [...previous].reverse()
            : [{ ...previous[0], [childrenKey]: [...previous[0][childrenKey]].reverse() }]
        )
    };
  }, [data, values, value, locked]);
  return (
    <Component
      data={data}
      valueKey={valueKey}
      labelKey={labelKey}
      childrenKey={childrenKey}
      searchable
      value={multi ? values : value}
      disabledItemValues={scenario === 'disabled' ? [0] : []}
      getChildren={
        scenario === 'loaded'
          ? () => {
              events.current.loadCalls++;
              return Promise.resolve(leaves);
            }
          : undefined
      }
      {...(picker
        ? {
            defaultOpen: true,
            readOnly: locked,
            onEntered: () => {
              events.current.entered = true;
            }
          }
        : {})}
      {...(multi
        ? {
            cascade: false,
            onCheck: (
              next: Value[],
              node: Option<Value>,
              checked: boolean,
              event: React.SyntheticEvent
            ) => {
              events.current.checks.push({
                value: next,
                leaf: node[valueKey],
                checked,
                originalLeaf: leaves.includes(node),
                ...eventInfo(event)
              });
            }
          }
        : {})}
      onSelect={(node: Option<Value>, _paths: Option<Value>[], event: React.SyntheticEvent) => {
        events.current.selections.push({
          value: node[valueKey],
          originalLeaf: leaves.includes(node),
          ...eventInfo(event)
        });
      }}
      onChange={(next: Value | Value[] | null, event: React.SyntheticEvent) => {
        events.current.changes.push({ value: next, ...eventInfo(event) });
        if (Array.isArray(next)) setValues(next);
        else setValue(next);
      }}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fixture />
  </StrictMode>
);

declare global {
  interface Window {
    __RSUITE_CASCADE_IDENTITY__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        entered: boolean;
        loadCalls: number;
        revision: number;
        changes: Change[];
        checks: Check[];
        selections: Selection[];
        keys: { key: string; trusted: boolean }[];
        values: Value[];
        value: Value | null;
        locked: boolean;
      };
      lock: () => void;
      reorder: () => void;
    };
  }
}
