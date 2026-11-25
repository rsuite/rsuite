import React from 'react';
import { renderToString, version as serverVersion } from 'react-dom/server';
import canUseDOM from 'dom-lib/canUseDOM';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import Modal from '../../../Modal';
import Drawer from '../../../Drawer';
import CustomProvider from '../../../CustomProvider';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import usePortal from '../usePortal';

describe('usePortal server rendering', () => {
  beforeAll(() => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    expect(canUseDOM).toBe(false);
    expect(serverVersion).toBe(React.version);
    console.info('Portal server runtime', { react: React.version, serverVersion });
  });
  describe.each([
    { name: 'Modal', Component: Modal },
    { name: 'Drawer', Component: Drawer }
  ])('$name', ({ Component }) => {
    it.each([false, true])('does not resolve a browser-only container, open: %s', open => {
      const container = vi.fn(() => document.body);
      const html = renderToString(
        <Component open={open} container={container}>
          <p>Overlay content</p>
        </Component>
      );
      expect(html).toBe('');
      expect(container).not.toHaveBeenCalled();
    });
  });
  it.each(['closed', 'defaultOpen', 'controlledOpen'])(
    'renders a Whisper trigger without resolving its %s portal',
    mode => {
      const container = vi.fn(() => document.getElementById('overlay-target')!);
      const html = renderToString(
        <Whisper
          container={container}
          defaultOpen={mode === 'defaultOpen'}
          {...(mode === 'controlledOpen' ? { open: true } : {})}
          speaker={<Tooltip>Portal content</Tooltip>}
        >
          <button>Trigger</button>
        </Whisper>
      );
      expect(html).toContain('Trigger</button>');
      expect(html).not.toContain('Portal content');
      expect(container).not.toHaveBeenCalled();
    }
  );
  it('renders CustomProvider children without resolving its browser-only toast container', () => {
    const toastContainer = vi.fn(() => document.body);
    const html = renderToString(
      <CustomProvider toastContainer={toastContainer}>
        <button>Save</button>
      </CustomProvider>
    );
    expect(html).toBe('<button>Save</button>');
    expect(toastContainer).not.toHaveBeenCalled();
  });
  it.each([false, true])(
    'leaves its target and portal empty on the server, waitMount: %s',
    waitMount => {
      const container = vi.fn(() => document.body);
      function Example() {
        const { target, Portal } = usePortal({ container, waitMount });
        expect(target).toBeNull();
        return (
          <>
            <span>Application content</span>
            <Portal>Portal content</Portal>
          </>
        );
      }
      expect(renderToString(<Example />)).toBe('<span>Application content</span>');
      expect(container).not.toHaveBeenCalled();
    }
  );
});
