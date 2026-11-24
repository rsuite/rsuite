import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { version as reactDOMVersion } from 'react-dom';
import CustomProvider from '../../CustomProvider';
import DatePicker from '../../DatePicker';
import DateRangePicker from '../../DateRangePicker';
import TimePicker from '../../TimePicker';
import TimeRangePicker from '../../TimeRangePicker';
import enGB from '../../locales/en_GB';
import zhCN from '../../locales/zh_CN';
import type { PickerHandle } from '@/internals/Picker/types';
import '../styles/index.scss';
import '../../DateRangePicker/styles/index.scss';
import '../../Drawer/styles/index.scss';

const options = new URLSearchParams(location.hash.slice(1));
document.documentElement.dir = options.has('rtl') ? 'rtl' : 'ltr';
const kind = options.get('kind') || 'DatePicker';
const callbacks: { kind: string; trusted?: boolean }[] = [];
const Component = { DatePicker, DateRangePicker, TimePicker, TimeRangePicker }[kind] as any;
const isRange = kind.includes('Range');
const isTime = kind.startsWith('Time');
const initialValue = options.has('filled')
  ? isRange
    ? [new Date(2024, 1, 12, 9), new Date(isTime ? 2024 : 2026, 1, 12, 11)]
    : new Date(2024, 1, 12, 9)
  : null;
let ready = false;
const presetValue = isRange
  ? [new Date(2025, 2, 15, 14), new Date(isTime ? 2025 : 2027, 2, 15, 16)]
  : new Date(2025, 2, 15, 14);
const legacyDatePicker = { ...enGB.DatePicker };
const legacyDateRangePicker = { ...enGB.DateRangePicker };
delete legacyDatePicker.openPicker;
delete legacyDateRangePicker.openPicker;
const legacyLocale = {
  ...enGB,
  DatePicker: legacyDatePicker,
  DateRangePicker: legacyDateRangePicker
};
const CustomCaret = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} data-testid="custom-caret" viewBox="0 0 24 24">
    <path d="M2 2h20v20H2z" />
  </svg>
);

function Fixture() {
  const [open, setOpen] = useState(false);
  const [openOnInputClick, setOpenOnInputClick] = useState(false);
  const picker = useRef<PickerHandle>(null);
  useEffect(() => {
    ready = true;
  }, []);
  return (
    <CustomProvider
      reduceMotion
      theme={options.get('theme') === 'dark' ? 'dark' : 'light'}
      rtl={options.has('rtl')}
      locale={options.has('zhCN') ? zhCN : options.has('legacyLocale') ? legacyLocale : undefined}
      components={
        options.has('defaults')
          ? {
              [kind]: {
                defaultProps: {
                  openOnInputClick: false,
                  locale: { openPicker: 'Open appointment' }
                }
              }
            }
          : undefined
      }
    >
      <form
        style={{ margin: 30, fontFamily: options.has('visual') ? 'Arial, sans-serif' : undefined }}
        onSubmit={event => {
          event.preventDefault();
          callbacks.push({ kind: 'submit', trusted: event.isTrusted });
        }}
      >
        <Component
          ref={picker}
          aria-label="Appointment"
          {...(options.has('visual')
            ? { style: { width: 360 }, size: options.get('size') || 'md' }
            : {})}
          {...(options.has('defaults')
            ? {}
            : { openOnInputClick: options.has('policy') ? openOnInputClick : false })}
          responsive={options.has('responsive')}
          format={isTime ? 'HH:mm' : 'yyyy-MM-dd'}
          defaultValue={initialValue}
          {...(options.has('defaultOpen') ? { defaultOpen: true } : {})}
          {...(options.has('oneTap') ? { oneTap: true } : {})}
          {...(options.has('preset')
            ? { ranges: [{ label: 'Preset', value: presetValue, closeOverlay: true }] }
            : {})}
          locale={options.has('instanceLocale') ? { openPicker: 'Choose appointment' } : undefined}
          disabled={options.has('disabled')}
          readOnly={options.has('readOnly')}
          loading={options.has('loading')}
          plaintext={options.has('plaintext')}
          caretAs={
            options.has('caretNone') ? null : options.has('customCaret') ? CustomCaret : undefined
          }
          renderValue={options.has('renderValue') ? () => 'Appointment value' : undefined}
          onOpen={() => {
            callbacks.push({ kind: 'open' });
            if (!options.has('deny')) setOpen(true);
          }}
          onClose={() => {
            callbacks.push({ kind: 'close' });
            if (!options.has('denyClose')) setOpen(false);
          }}
          onOk={(_value: unknown, event: React.SyntheticEvent) =>
            callbacks.push({ kind: 'ok', trusted: event.isTrusted })
          }
          onShortcutClick={(_value: unknown, event: React.SyntheticEvent) =>
            callbacks.push({ kind: 'shortcut', trusted: event.isTrusted })
          }
          onChange={(_value: unknown, event: React.SyntheticEvent) =>
            callbacks.push({ kind: 'change', trusted: event?.isTrusted })
          }
          onClean={(event: React.SyntheticEvent) =>
            callbacks.push({ kind: 'clean', trusted: event.isTrusted })
          }
          {...(options.has('controlled') ? { open } : {})}
        />
        <button type="button">Outside</button>
        {options.has('policy') && (
          <button type="button" onClick={() => setOpenOnInputClick(value => !value)}>
            Toggle policy
          </button>
        )}
        {options.has('imperative') && (
          <>
            <button type="button" onClick={() => picker.current?.open?.()}>
              Open by ref
            </button>
            <button type="button" onClick={() => picker.current?.close?.()}>
              Close by ref
            </button>
          </>
        )}
      </form>
    </CustomProvider>
  );
}

declare global {
  interface Window {
    __RSUITE_DATE_OPEN_BUTTON__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { callbacks: typeof callbacks; ready: boolean };
    };
  }
}
window.__RSUITE_DATE_OPEN_BUTTON__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ callbacks, ready })
};
const fixture = <Fixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
