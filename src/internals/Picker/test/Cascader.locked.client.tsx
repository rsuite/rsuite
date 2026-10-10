import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import type { Option } from '../../types';
import '../../../styles/_themes.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';

type Flag = 'enabled' | 'disabled' | 'readOnly' | 'loading';
type Value = string | number | null;
const options = new URLSearchParams(window.location.hash.slice(1));
const data = [
  {
    label: 'Group',
    value: 'group',
    children: [
      { label: 'Alpha leaf', value: 'alpha' },
      { label: 'Beta leaf', value: 'beta' }
    ]
  },
  { label: 'Gamma', value: 'gamma' }
];
const keys: { key: string; trusted: boolean }[] = [];
document.addEventListener('keydown', event => {
  keys.push({ key: event.key, trusted: event.isTrusted });
});

function Fixture() {
  const [flag, setFlag] = useState<Flag>('enabled');
  const [listenKeys, setListenKeys] = useState(false);
  const [value, setValue] = useState<Value>(null);
  const [values, setValues] = useState<(string | number)[]>([]);
  const events = useRef({
    entered: false,
    changes: [] as { value: unknown; trusted: boolean }[],
    selections: [] as { value: unknown; trusted: boolean }[],
    checks: [] as { value: unknown; checked: boolean; trusted: boolean }[],
    publicKeys: [] as { key: string; trusted: boolean }[]
  });
  useEffect(() => {
    window.__RSUITE_CASCADER_LOCK__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      setFlag: next => {
        setFlag(next);
        setListenKeys(true);
      },
      snapshot: () => ({ flag, value, values, keys, ...events.current })
    };
  });
  const common = {
    data,
    defaultOpen: true,
    searchable: true,
    disabled: flag === 'disabled',
    readOnly: flag === 'readOnly',
    loading: flag === 'loading',
    onEntered: () => {
      events.current.entered = true;
    },
    onSelect: (item: Option<Value>, _paths: Option<Value>[], event: React.SyntheticEvent) => {
      events.current.selections.push({ value: item.value, trusted: event.nativeEvent.isTrusted });
    },
    ...(listenKeys
      ? {
          onKeyDown: (event: React.KeyboardEvent) => {
            events.current.publicKeys.push({
              key: event.key,
              trusted: event.nativeEvent.isTrusted
            });
          }
        }
      : {})
  };
  return (
    <div style={{ padding: 24 }} data-flag={flag} data-listening={listenKeys} data-testid="fixture">
      <div>
        {options.has('check') ? (
          <MultiCascader
            {...common}
            value={values}
            onCheck={(_values, item, checked, event) => {
              events.current.checks.push({
                value: item.value,
                checked,
                trusted: event.nativeEvent.isTrusted
              });
            }}
            onChange={(next, event) => {
              setValues(next);
              events.current.changes.push({ value: next, trusted: event.nativeEvent.isTrusted });
            }}
          />
        ) : (
          <Cascader<Value>
            {...common}
            value={value}
            onChange={(next, event) => {
              setValue(next);
              events.current.changes.push({ value: next, trusted: event.nativeEvent.isTrusted });
            }}
          />
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fixture />
  </StrictMode>
);

declare global {
  interface Window {
    __RSUITE_CASCADER_LOCK__: {
      runtime: { react: string; reactDOM: string };
      setFlag: (flag: Flag) => void;
      snapshot: () => {
        flag: Flag;
        value: Value;
        values: (string | number)[];
        entered: boolean;
        keys: { key: string; trusted: boolean }[];
        changes: { value: unknown; trusted: boolean }[];
        selections: { value: unknown; trusted: boolean }[];
        checks: { value: unknown; checked: boolean; trusted: boolean }[];
        publicKeys: { key: string; trusted: boolean }[];
      };
    };
  }
}
