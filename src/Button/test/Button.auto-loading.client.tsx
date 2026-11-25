import React, { StrictMode, useEffect } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Button from '../Button';
import IconButton from '../../IconButton';
import '../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
const nativeClicks: MouseEvent[] = [];
const callbacks: { kind: string; trusted?: boolean; active?: boolean; message?: string }[] = [];
const tasks: { resolve(): void; reject(error: unknown): void }[] = [];
let ready = false;

if (options.has('fallback')) {
  Object.defineProperty(globalThis, 'reportError', { value: undefined, configurable: true });
}

document.addEventListener(
  'click',
  event => {
    if ((event.target as HTMLElement).closest('[data-testid="action"]')) nativeClicks.push(event);
  },
  true
);

const CustomButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  (props, ref) => <button {...props} ref={ref} />
);
CustomButton.displayName = 'CustomButton';

function Fixture() {
  const shape = options.get('shape');
  useEffect(() => {
    ready = true;
  }, []);
  const common = {
    'data-testid': 'action',
    autoLoading: true,
    toggleable: true,
    onToggle: (active: boolean, event: React.MouseEvent) => {
      callbacks.push({ kind: 'toggle', active, trusted: event.isTrusted });
    },
    onClick: (event: React.MouseEvent) => {
      callbacks.push({ kind: 'click', trusted: event.isTrusted });
      if (options.get('mode') === 'sync') throw new Error('Synchronous action failed');
      if (options.get('mode') === 'accessor') {
        return Object.defineProperty({}, 'then', {
          get() {
            throw new Error('Then accessor failed');
          }
        });
      }
      return new Promise<void>((resolve, reject) => tasks.push({ resolve, reject }));
    },
    onClickError: options.has('handled')
      ? (error: unknown, event: React.MouseEvent) => {
          callbacks.push({ kind: 'error', message: String(error), trusted: event.isTrusted });
          if (options.has('handlerThrows')) throw new Error('Error handler failed');
        }
      : undefined
  };
  const action = options.has('nativeError') ? (
    <button data-testid="action" type="button" onClick={common.onClick}>
      Run action
    </button>
  ) : shape === 'icon' ? (
    <IconButton {...common} icon={<span aria-hidden="true">+</span>}>
      Run action
    </IconButton>
  ) : (
    <Button
      {...common}
      as={shape === 'custom' ? CustomButton : shape === 'explicit-anchor' ? 'a' : undefined}
      href={shape?.includes('anchor') ? '#destination' : undefined}
      type={shape === 'submit' ? 'submit' : 'button'}
    >
      Run action
    </Button>
  );
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        callbacks.push({ kind: 'submit', trusted: event.isTrusted });
      }}
    >
      <div onClick={event => callbacks.push({ kind: 'ancestor', trusted: event.isTrusted })}>
        {action}
      </div>
    </form>
  );
}

window.__RSUITE_BUTTON_ASYNC__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  resolve: () => tasks.at(-1)!.resolve(),
  reject: () => tasks.at(-1)!.reject(new Error('Async action failed')),
  unmount: () => root.unmount(),
  snapshot: () => ({
    ready,
    callbacks: [...callbacks],
    nativeClicks: nativeClicks.map(event => ({
      trusted: event.isTrusted,
      prevented: event.defaultPrevented
    }))
  })
};

declare global {
  interface Window {
    __RSUITE_BUTTON_ASYNC__: {
      runtime: { react: string; reactDOM: string };
      resolve(): void;
      reject(): void;
      unmount(): void;
      snapshot(): {
        ready: boolean;
        callbacks: typeof callbacks;
        nativeClicks: { trusted: boolean; prevented: boolean }[];
      };
    };
  }
}

const root = createRoot(document.getElementById('root')!);
root.render(
  options.has('strict') ? (
    <StrictMode>
      <Fixture />
    </StrictMode>
  ) : (
    <Fixture />
  )
);
