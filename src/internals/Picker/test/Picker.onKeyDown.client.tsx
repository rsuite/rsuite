import React, { StrictMode, useEffect, useRef } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import '../../../styles/_themes.scss';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../TreePicker/styles/index.scss';
import '../../../CheckTreePicker/styles/index.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';

const pickers = { SelectPicker, CheckPicker, TreePicker, CheckTreePicker, Cascader, MultiCascader };
const params = new URLSearchParams(window.location.hash.slice(1));
const mode = params.get('mode');
const data = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' }
];
type Key = { key: string; trusted: boolean; originalEvent: boolean };
let capturedEvent: KeyboardEvent;
document.addEventListener('keydown', event => (capturedEvent = event), true);

function Fixture() {
  const events = useRef({ keys: [] as Key[], changes: 0, clean: 0 });
  const outside = useRef<HTMLButtonElement>(null);
  const Component: React.ElementType = pickers[params.get('picker') as keyof typeof pickers];
  useEffect(() => {
    window.__RSUITE_PICKER_KEYDOWN__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      snapshot: () => ({ ...events.current })
    };
  }, []);
  return (
    <>
      <button ref={outside}>Outside action</button>
      <Component
        data={data}
        readOnly={mode === 'readOnly'}
        loading={mode === 'loading'}
        defaultValue={params.has('selected') ? 'alpha' : undefined}
        {...(mode === 'control'
          ? {}
          : {
              onKeyDown: (event: React.KeyboardEvent) => {
                events.current.keys.push({
                  key: event.key,
                  trusted: event.nativeEvent.isTrusted,
                  originalEvent: event.nativeEvent === capturedEvent
                });
                if (mode === 'focus' && event.key === 'Enter') outside.current?.focus();
              }
            })}
        onChange={() => events.current.changes++}
        onClean={() => events.current.clean++}
      />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fixture />
  </StrictMode>
);

declare global {
  interface Window {
    __RSUITE_PICKER_KEYDOWN__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { keys: Key[]; changes: number; clean: number };
    };
  }
}
