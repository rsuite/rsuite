import React, { useMemo, useState } from 'react';
import ReactDOM, { createPortal, flushSync } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server.browser';
import CommandPalette from '../CommandPalette';
import Modal from '../../Modal';
import type { CommandDataItem } from '../types';
import '../../styles/index.scss';

interface Options {
  data?: CommandDataItem[];
  count?: number;
  filter?: boolean;
  loading?: boolean;
  searchLocale?: string;
  preventClose?: boolean;
  autoFocus?: boolean;
  inFrame?: boolean;
  editingControl?: boolean;
}
const defaults = [
  { value: 'projects', label: 'Open projects', group: 'Workspace' },
  { value: 'archive', label: 'Archive project', group: 'Workspace', disabled: true },
  { value: 0, label: 'Open settings', group: 'Account' }
];
const root = createRoot(document.getElementById('root')!);
let frame: HTMLIFrameElement | undefined;
let renderKey = 0;
let update: React.Dispatch<React.SetStateAction<Options>>;
let selections: { value: string | number; index: number; trusted: boolean }[] = [];
let events: { key: string; trusted: boolean }[] = [];
let latencies: { key: string; milliseconds: number }[] = [];
let closed = 0;
let submitted = 0;
let openingFocus = '';
let hydrationErrors: string[] = [];

function HydrationFixture() {
  return (
    <>
      <CommandPalette open reduceMotion title="First commands" data={defaults} />
      <CommandPalette open reduceMotion title="Second commands" data={defaults} />
    </>
  );
}

function observeKeys(doc: Document) {
  doc.addEventListener(
    'keydown',
    event => {
      events.push({ key: event.key, trusted: event.isTrusted });
      const start = performance.now();
      requestAnimationFrame(() =>
        latencies.push({ key: event.key, milliseconds: performance.now() - start })
      );
    },
    true
  );
}
observeKeys(document);

function Fixture({ options }: { options: Options }) {
  const [current, setCurrent] = useState(options);
  update = setCurrent;
  const [open, setOpen] = useState(false);
  const [nested, setNested] = useState(false);
  const doc = options.inFrame ? frame!.contentDocument! : document;
  const data = useMemo<CommandDataItem[]>(
    () =>
      current.data ??
      (current.count == null
        ? defaults
        : Array.from({ length: current.count }, (_, value) => ({
            value,
            label: `Command ${String(value).padStart(5, '0')}`
          }))),
    [current.data, current.count]
  );
  const content = (
    <>
      <button
        id="command-opener"
        onClick={() => {
          const active = doc.activeElement;
          openingFocus = `${active?.tagName}|${active?.id}|${active?.getAttribute('data-testid') ?? ''}`;
          setOpen(true);
        }}
      >
        Open commands
      </button>
      <button id="outside">Outside</button>
      <form
        id="command-form"
        onSubmit={event => {
          event.preventDefault();
          submitted++;
        }}
      />
      <CommandPalette
        open={open}
        title="Run a command"
        data={data}
        container={doc.body}
        reduceMotion
        filter={current.filter}
        loading={current.loading}
        searchLocale={current.searchLocale}
        autoFocus={current.autoFocus}
        inputProps={{ id: 'command-input', form: 'command-form' }}
        onSelect={(_value, item, event) => {
          selections.push({
            value: item.value,
            index: data.indexOf(item),
            trusted: event.isTrusted
          });
          if (current.preventClose) event.preventDefault();
        }}
        onClose={() => {
          closed++;
          setOpen(false);
        }}
        footer={
          <>
            <button id="nested-opener" onClick={() => setNested(true)}>
              More help
            </button>
            <button id="close-command" onClick={() => setOpen(false)}>
              Done
            </button>
            {current.editingControl && <input aria-label="Native editing control" />}
          </>
        }
      />
      <Modal open={nested} container={doc.body} reduceMotion onClose={() => setNested(false)}>
        <Modal.Header>
          <Modal.Title>Command help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button id="nested-action">Help action</button>
        </Modal.Body>
      </Modal>
    </>
  );
  return options.inFrame ? createPortal(content, doc.body) : content;
}

declare global {
  interface Window {
    __RSUITE_COMMAND_PALETTE__: {
      runtime: { react: string; reactDOM: string };
      mount(options?: Options): Promise<void>;
      update(options: Partial<Options>): void;
      hydrate(): string;
      snapshot(): {
        selections: typeof selections;
        events: typeof events;
        latencies: typeof latencies;
        closed: number;
        submitted: number;
        openingFocus: string;
        hydrationErrors: string[];
      };
    };
  }
}

window.__RSUITE_COMMAND_PALETTE__ = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  async mount(options = {}) {
    if (options.inFrame && !frame) {
      frame = document.createElement('iframe');
      frame.id = 'command-frame';
      frame.title = 'Commands in another document';
      frame.style.cssText = 'width:900px;height:700px';
      const loaded = new Promise<void>(resolve =>
        frame!.addEventListener('load', () => resolve(), { once: true })
      );
      frame.srcdoc = '<!doctype html><html><head></head><body></body></html>';
      document.body.append(frame);
      await loaded;
      document
        .querySelectorAll('style')
        .forEach(style => frame!.contentDocument!.head.append(style.cloneNode(true)));
      observeKeys(frame.contentDocument!);
    }
    selections = [];
    events = [];
    latencies = [];
    closed = 0;
    submitted = 0;
    openingFocus = '';
    flushSync(() => root.render(<Fixture key={++renderKey} options={options} />));
  },
  update(options) {
    flushSync(() => update(current => ({ ...current, ...options })));
  },
  hydrate() {
    hydrationErrors = [];
    const host = document.createElement('div');
    document.body.append(host);
    const html = renderToString(<HydrationFixture />);
    host.innerHTML = html;
    hydrateRoot(host, <HydrationFixture />, {
      onRecoverableError: error => hydrationErrors.push(String(error))
    });
    return html;
  },
  snapshot: () => ({
    selections,
    events,
    latencies,
    closed,
    submitted,
    openingFocus,
    hydrationErrors
  })
};
