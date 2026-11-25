import React, { StrictMode, useEffect, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import DatePicker from '../../../DatePicker';
import DateRangePicker from '../../../DateRangePicker';
import TimePicker from '../../../TimePicker';
import TimeRangePicker from '../../../TimeRangePicker';
import AutoComplete from '../../../AutoComplete';
import CustomProvider from '../../../CustomProvider';
import '../../../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
const data = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' }
];
const tree = [{ label: 'Group', value: 'group', children: data }];
let ready = false;
const events: string[] = [];

function ResponsivePickerFixture() {
  const [open, setOpen] = useState(false);
  const query = options.get('query');
  const common = {
    id: 'country',
    'aria-label': 'Country',
    responsive: query === 'true' ? true : query === 'false' ? false : (query ?? undefined),
    ...(options.has('controlled') ? { open } : {}),
    onOpen: () => {
      events.push('open');
      setOpen(true);
    },
    onClose: () => {
      events.push('close');
      setOpen(false);
    }
  };
  useEffect(() => {
    ready = true;
  }, []);
  let picker: React.ReactNode;
  switch (options.get('component')) {
    case 'SelectPicker':
      picker = <SelectPicker {...common} data={data} />;
      break;
    case 'CheckPicker':
      picker = <CheckPicker {...common} data={data} />;
      break;
    case 'Cascader':
      picker = <Cascader {...common} data={tree} />;
      break;
    case 'MultiCascader':
      picker = <MultiCascader {...common} data={tree} />;
      break;
    case 'TreePicker':
      picker = <TreePicker {...common} data={tree} />;
      break;
    case 'CheckTreePicker':
      picker = <CheckTreePicker {...common} data={tree} />;
      break;
    case 'InputPicker':
      picker = <InputPicker {...common} data={data} />;
      break;
    case 'TagPicker':
      picker = <TagPicker {...common} data={data} />;
      break;
    case 'DatePicker':
      picker = <DatePicker {...common} />;
      break;
    case 'DateRangePicker':
      picker = <DateRangePicker {...common} />;
      break;
    case 'TimePicker':
      picker = <TimePicker {...common} />;
      break;
    case 'TimeRangePicker':
      picker = <TimeRangePicker {...common} />;
      break;
    case 'AutoComplete':
      picker = <AutoComplete aria-label="Country" data={['Alpha', 'Beta']} />;
      break;
  }
  return (
    <CustomProvider reduceMotion>
      <div data-testid="owner">{picker}</div>
    </CustomProvider>
  );
}

window.__RSUITE_PICKER_RESPONSIVE__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, events: [...events] })
};

declare global {
  interface Window {
    __RSUITE_PICKER_RESPONSIVE__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; events: string[] };
    };
  }
}

const fixture = <ResponsivePickerFixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
