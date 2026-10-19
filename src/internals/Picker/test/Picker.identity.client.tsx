import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import '../../../styles/_themes.scss';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';

const pickers = { SelectPicker, CheckPicker, InputPicker, TagPicker };
const params = new URLSearchParams(window.location.hash.slice(1));
const mode = params.get('mode');
const custom = mode === 'custom';
const fillers =
  mode === 'distant'
    ? Array.from({ length: 50 }, (_, index) => ({
        label: `Disabled ${index}`,
        value: `disabled-${index}`
      }))
    : [];
const initialData = [
  { label: 'Number zero', value: mode === 'distinct' ? 1 : 0 },
  ...fillers,
  { label: 'Disabled neighbor', value: 'disabled' },
  { label: 'String zero', value: '0' },
  { label: 'Last control', value: 'last' }
];
type Value = string | number | (string | number)[] | null;
type Key = { key: string; trusted: boolean };
type Change = { value: Value; trusted: boolean; originalEvent: boolean };
const keys: Key[] = [];
let capturedEvent: KeyboardEvent;
document.addEventListener(
  'keydown',
  event => {
    capturedEvent = event;
    keys.push({ key: event.key, trusted: event.isTrusted });
  },
  true
);

function Fixture() {
  const [data, setData] = useState(initialData);
  const events = useRef({ changes: [] as Change[], entered: false, revision: 0 });
  const Component: React.ElementType = pickers[params.get('picker') as keyof typeof pickers];
  useEffect(() => {
    events.current.revision++;
    window.__RSUITE_PICKER_IDENTITY__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      snapshot: () => ({ ...events.current, keys }),
      reorder: () => setData(previous => [...previous].reverse())
    };
  }, [data]);
  return (
    <Component
      defaultOpen
      id="typed-picker"
      data={custom ? data.map(item => ({ code: item.value, title: item.label })) : data}
      valueKey={custom ? 'code' : 'value'}
      labelKey={custom ? 'title' : 'label'}
      disabledItemValues={[
        'disabled',
        ...fillers.map(item => item.value),
        ...(mode === 'disabled' ? [0] : [])
      ]}
      virtualized={mode === 'virtual' || mode === 'distant'}
      listboxMaxHeight={180}
      listProps={{ itemSize: 36, overscanCount: 0 }}
      onEntered={() => {
        events.current.entered = true;
      }}
      onChange={(value: Value, event: React.SyntheticEvent) =>
        events.current.changes.push({
          value,
          trusted: event.nativeEvent.isTrusted,
          originalEvent: event.nativeEvent === capturedEvent
        })
      }
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
    __RSUITE_PICKER_IDENTITY__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { changes: Change[]; entered: boolean; revision: number; keys: Key[] };
      reorder: () => void;
    };
  }
}
