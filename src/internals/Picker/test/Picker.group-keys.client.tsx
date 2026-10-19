import React, { StrictMode, useEffect } from 'react';
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
const data = [
  { value: 0, label: 'Number zero', category: 0 },
  { value: '0', label: 'String zero', category: '0' },
  { value: 'other', label: 'Other', category: 1 }
];
type Value = string | number | (string | number)[] | null;
const events = {
  entered: false,
  groupClicks: [] as boolean[],
  changes: [] as { value: Value; trusted: boolean }[],
  selections: [] as { value: Value; originalItem: boolean; trusted: boolean }[]
};
document.addEventListener('click', event => {
  if ((event.target as Element).closest('.rs-picker-menu-group')) {
    events.groupClicks.push(event.isTrusted);
  }
});

function Fixture() {
  const Component: React.ElementType = pickers[params.get('picker') as keyof typeof pickers];
  useEffect(() => {
    window.__RSUITE_GROUP_KEYS__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      snapshot: () => events
    };
  }, []);
  return (
    <Component
      defaultOpen
      data={data}
      groupBy="category"
      renderOptionGroup={title => `Group: ${title}`}
      virtualized={params.has('virtualized')}
      listboxMaxHeight={320}
      onEntered={() => {
        events.entered = true;
      }}
      onChange={(value: Value, event: React.SyntheticEvent) =>
        events.changes.push({ value, trusted: event.nativeEvent.isTrusted })
      }
      onSelect={(value: Value, item: (typeof data)[number], event: React.SyntheticEvent) =>
        events.selections.push({
          value,
          originalItem: item === data[1],
          trusted: event.nativeEvent.isTrusted
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
    __RSUITE_GROUP_KEYS__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => typeof events;
    };
  }
}
