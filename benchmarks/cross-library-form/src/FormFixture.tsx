import React, { useCallback, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'form-adapter';
import { requests } from './api';
import { readSnapshot } from './snapshot';
import type { AdapterChannel } from './types';
import './fixture.css';

function FormFixture() {
  const channel = useRef<AdapterChannel | null>(null);
  const submissions = useRef<unknown[]>([]);
  const inputs = useRef<Array<{ value: string; trusted: boolean }>>([]);
  const submits = useRef<boolean[]>([]);
  const clicks = useRef<Array<{ text: string; trusted: boolean }>>([]);
  const keys = useRef<Array<{ key: string; trusted: boolean }>>([]);
  const pointers = useRef<
    Array<{
      type: string;
      target: string;
      text: string;
      trusted: boolean;
      x: number;
      y: number;
      submitRect: { x: number; y: number; width: number; height: number } | null;
    }>
  >([]);
  const attach = useCallback((next: AdapterChannel) => {
    channel.current = next;
  }, []);
  const submitted = useCallback((value: unknown) => {
    submissions.current.push(structuredClone(value));
  }, []);
  useEffect(() => {
    const input = (event: Event) => {
      if (event.target instanceof HTMLInputElement)
        inputs.current.push({ value: event.target.value, trusted: event.isTrusted });
      if (inputs.current.length > 200) throw new Error('Unexpected input event loop');
    };
    const submit = (event: Event) => {
      submits.current.push(event.isTrusted);
    };
    const click = (event: MouseEvent) => {
      const button = (event.target as Element).closest('button');
      if (button) clicks.current.push({ text: button.textContent ?? '', trusted: event.isTrusted });
    };
    const key = (event: KeyboardEvent) => {
      keys.current.push({ key: event.key, trusted: event.isTrusted });
    };
    const pointer = (event: PointerEvent) => {
      const node = event.target as Element;
      const rect = document.querySelector('button[type="submit"]')?.getBoundingClientRect();
      pointers.current.push({
        type: event.type,
        target: node.tagName,
        text: (node.textContent ?? '').slice(0, 100),
        trusted: event.isTrusted,
        x: event.clientX,
        y: event.clientY,
        submitRect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null
      });
      if (pointers.current.length > 200) pointers.current.shift();
    };
    document.addEventListener('input', input, true);
    document.addEventListener('submit', submit, true);
    document.addEventListener('click', click, true);
    document.addEventListener('keydown', key, true);
    document.addEventListener('pointerdown', pointer, true);
    document.addEventListener('pointerup', pointer, true);
    window.formBenchmark = {
      ready: () => !!channel.current,
      metadata: () => ({
        library: __LIBRARY__,
        reactVersion: React.version,
        production: import.meta.env.PROD,
        engine: channel.current?.engine,
        stateOwnership: channel.current?.stateOwnership,
        validationOwnership: channel.current?.validationOwnership,
        validationTrigger: 'Blur and submit',
        errorPresentation: 'Inline errors; RSuite explicitly uses static placement',
        sharedApplication:
          'Domain predicates, transport, conditional visibility, native event/submission logging; transport does not order or suppress validation results.'
      }),
      snapshot: () => ({
        ...readSnapshot(channel.current?.readValues()),
        requests: requests.map(row => ({ ...row })),
        submissions: structuredClone(submissions.current),
        inputs: [...inputs.current],
        submits: [...submits.current],
        clicks: [...clicks.current],
        keys: [...keys.current],
        pointers: [...pointers.current]
      })
    };
    return () => {
      document.removeEventListener('input', input, true);
      document.removeEventListener('submit', submit, true);
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', key, true);
      document.removeEventListener('pointerdown', pointer, true);
      document.removeEventListener('pointerup', pointer, true);
    };
  }, []);
  return (
    <main className="bench-host">
      <h1>Account form</h1>
      <Adapter attach={attach} onSubmit={submitted} />
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<FormFixture />);
