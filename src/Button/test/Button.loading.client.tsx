import React, { StrictMode, useEffect, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Button from '../Button';
import IconButton from '../../IconButton';
import '../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
const nativeClicks: MouseEvent[] = [];
const callbacks: { kind: string; trusted: boolean; active?: boolean }[] = [];
let ready = false;

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

function ButtonLoadingFixture() {
  const [loading, setLoading] = useState(!options.has('disabled') && !options.has('ready'));
  const [disabled, setDisabled] = useState(options.has('disabled'));
  const shape = options.get('shape');
  useEffect(() => {
    ready = true;
  }, []);

  const common = {
    'data-testid': 'action',
    loading,
    disabled,
    toggleable: true,
    onClick: (event: React.MouseEvent) =>
      callbacks.push({ kind: 'click', trusted: event.isTrusted }),
    onToggle: (active: boolean, event: React.MouseEvent) =>
      callbacks.push({ kind: 'toggle', active, trusted: event.isTrusted })
  };
  const action =
    shape === 'icon' ? (
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
    <>
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
      <button
        onClick={() => {
          setLoading(false);
          setDisabled(false);
        }}
      >
        Enable action
      </button>
    </>
  );
}

window.__RSUITE_BUTTON_LOADING__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
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
    __RSUITE_BUTTON_LOADING__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        ready: boolean;
        callbacks: typeof callbacks;
        nativeClicks: { trusted: boolean; prevented: boolean }[];
      };
    };
  }
}

const fixture = <ButtonLoadingFixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
