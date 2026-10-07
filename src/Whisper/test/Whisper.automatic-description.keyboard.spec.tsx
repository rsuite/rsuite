import React, { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import Whisper from '../Whisper';
import Tooltip from '../../Tooltip';
import CustomProvider from '../../CustomProvider';

let errors: unknown[][];
beforeEach(() => {
  errors = [];
  vi.mocked(console.error).mockImplementation((...args) => errors.push(args));
});
afterEach(() => {
  expect(errors, 'React errors during native description interactions').toEqual([]);
  vi.mocked(console.error).mockImplementation(() => {});
});

async function native(action: () => Promise<void>) {
  await act(action);
}

async function expectAssociation(button: HTMLElement, description: string) {
  const tooltip = await screen.findByRole('tooltip');
  await waitFor(() => {
    expect(tooltip.isConnected).toBe(true);
    expect(tooltip.id).not.toBe('');
    expect(button.getAttribute('aria-describedby')?.split(/[ \t\n\r\f]+/)).toContain(tooltip.id);
    expect(button.ownerDocument.getElementById(tooltip.id)).toBe(tooltip);
    expect(screen.getByRole('button', { name: button.textContent!, description })).toBe(button);
  });
  return tooltip;
}

describe('Whisper automatic Tooltip descriptions', () => {
  it('adds the mounted Tooltip text to authored help on native focus and removes it on blur', async () => {
    const trusted: boolean[] = [];
    const tabKeys: boolean[] = [];
    render(
      <>
        <button
          onKeyDown={e => {
            if (e.key === 'Tab') tabKeys.push(e.nativeEvent.isTrusted);
          }}
        >
          Before
        </button>
        <span id="automatic-author-help" hidden>
          Existing help
        </span>
        <Whisper trigger="focus" speaker={<Tooltip>Extra help</Tooltip>}>
          <button
            aria-describedby="automatic-author-help"
            onFocus={e => trusted.push(e.nativeEvent.isTrusted)}
          >
            Focus trigger
          </button>
        </Whisper>
        <button>Outside</button>
      </>
    );
    const button = screen.getByRole('button', { name: 'Focus trigger' });
    expect(button.getAttribute('aria-describedby')).toBe('automatic-author-help');
    const snapshot = (tooltip: HTMLElement) => ({
      id: tooltip.id,
      role: tooltip.getAttribute('role'),
      connected: tooltip.isConnected,
      target: tooltip.ownerDocument.getElementById(tooltip.id) === tooltip,
      tokens: button.getAttribute('aria-describedby'),
      focused: document.activeElement === button,
      text: tooltip.textContent,
      description:
        screen.queryByRole('button', {
          name: 'Focus trigger',
          description: 'Existing help Extra help'
        }) === button
    });
    let firstMount: ReturnType<typeof snapshot> | undefined;
    let firstVisible: ReturnType<typeof snapshot> | undefined;
    const observer = new MutationObserver(() => {
      const tooltip = document.querySelector<HTMLElement>('[role="tooltip"]');
      if (tooltip && !firstMount) firstMount = snapshot(tooltip);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    let frame: number;
    const sampleVisible = () => {
      const tooltip = document.querySelector<HTMLElement>('[role="tooltip"]');
      if (tooltip) {
        const style = getComputedStyle(tooltip);
        const rect = tooltip.getBoundingClientRect();
        if (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== 'hidden' &&
          style.display !== 'none' &&
          Number(style.opacity) > 0
        )
          firstVisible = snapshot(tooltip);
      }
      if (!firstVisible) frame = requestAnimationFrame(sampleVisible);
    };
    frame = requestAnimationFrame(sampleVisible);
    try {
      await native(() => userEvent.click(screen.getByRole('button', { name: 'Before' })));
      await native(() => userEvent.tab());
      expect(document.activeElement).toBe(button);
      expect(tabKeys).toEqual([true]);
      expect(trusted).toEqual([true]);
      const tooltip = await expectAssociation(button, 'Existing help Extra help');
      const expectedSnapshot = {
        id: tooltip.id,
        role: 'tooltip',
        connected: true,
        target: true,
        tokens: `automatic-author-help ${tooltip.id}`,
        focused: true,
        text: 'Extra help',
        description: true
      };
      expect(firstMount).toEqual(expectedSnapshot);
      await waitFor(() => expect(firstVisible).toEqual(expectedSnapshot));
      expect(button.getAttribute('aria-describedby')).toBe(`automatic-author-help ${tooltip.id}`);
      await native(() => userEvent.tab());
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Outside' }));
      await waitFor(() => expect(tooltip.isConnected).toBe(false));
      expect(
        screen.getByRole('button', { name: 'Focus trigger', description: 'Existing help' })
      ).toBe(button);
      expect(button.getAttribute('aria-describedby')).toBe('automatic-author-help');
      await native(() => userEvent.tab({ shift: true }));
      expect(document.activeElement).toBe(button);
      expect((await expectAssociation(button, 'Existing help Extra help')).id).toBe(tooltip.id);
      expect(trusted).toEqual([true, true]);
    } finally {
      observer.disconnect();
      cancelAnimationFrame(frame);
    }
  });

  it('uses a stable generated ID across native hover, exit, and reopening', async () => {
    const trusted: boolean[] = [];
    render(
      <Whisper trigger="hover" speaker={<Tooltip>Hover help</Tooltip>}>
        <button onMouseOver={e => trusted.push(e.nativeEvent.isTrusted)}>Hover trigger</button>
      </Whisper>
    );
    const button = screen.getByRole('button', { name: 'Hover trigger' });
    expect(button.hasAttribute('aria-describedby')).toBe(false);
    await native(() => userEvent.hover(button));
    const tooltip = await expectAssociation(button, 'Hover help');
    const id = tooltip.id;
    expect(trusted.length).toBeGreaterThan(0);
    expect(trusted.every(Boolean)).toBe(true);
    await native(() => userEvent.unhover(button));
    await waitFor(() => expect(tooltip.isConnected).toBe(false));
    expect(button.hasAttribute('aria-describedby')).toBe(false);
    await native(() => userEvent.hover(button));
    expect((await expectAssociation(button, 'Hover help')).id).toBe(id);
  });

  it('preserves a provider-authored Tooltip ID and ASCII token order on native focus', async () => {
    render(
      <CustomProvider
        components={{ Tooltip: { defaultProps: { id: 'provider-tooltip', role: 'tooltip' } } }}
      >
        <span id="provider-help" hidden>
          Provider help
        </span>
        <Whisper trigger="focus" speaker={<Tooltip id={undefined}>Extra help</Tooltip>}>
          <button aria-describedby={'provider-help\t provider-help\n provider-tooltip'}>
            Provider trigger
          </button>
        </Whisper>
      </CustomProvider>
    );
    const button = screen.getByRole('button', { name: 'Provider trigger' });
    await native(() => userEvent.click(button));
    expect((await expectAssociation(button, 'Provider help Extra help')).id).toBe(
      'provider-tooltip'
    );
    expect(button.getAttribute('aria-describedby')).toBe('provider-help provider-tooltip');
  });

  it('retains explicit controlId behavior on native focus', async () => {
    render(
      <Whisper
        controlId="explicit-native"
        trigger="focus"
        speaker={<Tooltip>Explicit help</Tooltip>}
      >
        <button>Explicit trigger</button>
      </Whisper>
    );
    const button = screen.getByRole('button', { name: 'Explicit trigger' });
    expect(button.getAttribute('aria-describedby')).toBe('explicit-native');
    await native(() => userEvent.click(button));
    expect((await expectAssociation(button, 'Explicit help')).id).toBe('explicit-native');
  });

  it('leaves a generic speaker without an implicit association', async () => {
    render(
      <Whisper trigger="focus" speaker={<div data-testid="generic-native">Generic help</div>}>
        <button>Generic trigger</button>
      </Whisper>
    );
    const button = screen.getByRole('button', { name: 'Generic trigger' });
    await native(() => userEvent.click(button));
    expect((await screen.findByTestId('generic-native')).id).toBe('');
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  it('does not publish a dangling automatic token when controlled open is vetoed', async () => {
    const focused: boolean[] = [];
    render(
      <Whisper
        open={false}
        onFocus={e => focused.push(e.nativeEvent.isTrusted)}
        trigger="focus"
        speaker={<Tooltip>Vetoed help</Tooltip>}
      >
        <button>Veto trigger</button>
      </Whisper>
    );
    const button = screen.getByRole('button', { name: 'Veto trigger' });
    await native(() => userEvent.click(button));
    expect(focused).toEqual([true]);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  it('updates committed provider IDs and roles without replacing the speaker host', async () => {
    function App({ id, role }: { id: string; role: 'tooltip' | 'dialog' }) {
      return (
        <CustomProvider components={{ Tooltip: { defaultProps: { id, role } } }}>
          <Whisper trigger="focus" speaker={<Tooltip>Dynamic help</Tooltip>}>
            <button>Dynamic trigger</button>
          </Whisper>
        </CustomProvider>
      );
    }
    const view = render(<App id="dynamic-one" role="tooltip" />);
    const button = screen.getByRole('button', { name: 'Dynamic trigger' });
    await native(() => userEvent.click(button));
    const tooltip = await expectAssociation(button, 'Dynamic help');
    view.rerender(<App id="dynamic-two" role="tooltip" />);
    await waitFor(() => expect(button.getAttribute('aria-describedby')).toBe('dynamic-two'));
    expect(document.getElementById('dynamic-two')).toBe(tooltip);
    view.rerender(<App id="dynamic-two" role="dialog" />);
    await waitFor(() => expect(button.hasAttribute('aria-describedby')).toBe(false));
    expect(screen.getByRole('dialog')).toBe(tooltip);
    view.rerender(<App id="dynamic-two" role="tooltip" />);
    await expectAssociation(button, 'Dynamic help');
    expect(document.getElementById('dynamic-two')).toBe(tooltip);
  });

  it('tracks a replaced physical host and clears the association when its speaker is detached', async () => {
    function App({ as, show = true }: { as: 'div' | 'aside'; show?: boolean }) {
      return (
        <Whisper
          trigger="focus"
          speaker={
            show ? <Tooltip as={as}>Replacement help</Tooltip> : <div>Replacement generic</div>
          }
        >
          <button>Replacement trigger</button>
        </Whisper>
      );
    }
    const view = render(<App as="div" />);
    const button = screen.getByRole('button', { name: 'Replacement trigger' });
    await native(() => userEvent.click(button));
    const old = await expectAssociation(button, 'Replacement help');
    view.rerender(<App as="aside" />);
    const replacement = await expectAssociation(button, 'Replacement help');
    expect(replacement.tagName).toBe('ASIDE');
    expect(replacement).not.toBe(old);
    expect(old.isConnected).toBe(false);
    view.rerender(<App as="aside" show={false} />);
    await waitFor(() => expect(replacement.isConnected).toBe(false));
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  it('keeps the association during physical exit and removes it after owner-handled native Escape', async () => {
    const trusted: boolean[] = [];
    const exiting: string[] = [];
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <Whisper
          open={open}
          onFocus={() => setOpen(true)}
          onExit={() =>
            exiting.push(
              screen
                .getByRole('button', { name: 'Escape trigger' })
                .getAttribute('aria-describedby')!
            )
          }
          speaker={<Tooltip>Escape help</Tooltip>}
        >
          <button
            onKeyDown={e => {
              trusted.push(e.nativeEvent.isTrusted);
              if (e.key === 'Escape') setOpen(false);
            }}
          >
            Escape trigger
          </button>
        </Whisper>
      );
    }
    render(<App />);
    const button = screen.getByRole('button', { name: 'Escape trigger' });
    await native(() => userEvent.click(button));
    const tooltip = await expectAssociation(button, 'Escape help');
    await native(() => userEvent.keyboard('{Escape}'));
    expect(trusted).toEqual([true]);
    expect(exiting).toEqual([tooltip.id]);
    await waitFor(() => expect(tooltip.isConnected).toBe(false));
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  it('preserves the physical speaker across explicit and implicit association changes', async () => {
    function App({ controlId }: { controlId?: string }) {
      return (
        <Whisper
          controlId={controlId}
          trigger="focus"
          speaker={<Tooltip id="stable-authored">Stable help</Tooltip>}
        >
          <button>Stable trigger</button>
        </Whisper>
      );
    }
    const view = render(<App />);
    const button = screen.getByRole('button', { name: 'Stable trigger' });
    await native(() => userEvent.click(button));
    const tooltip = await expectAssociation(button, 'Stable help');
    view.rerender(<App controlId="unused-requested" />);
    await expectAssociation(button, 'Stable help');
    expect(document.getElementById('stable-authored')).toBe(tooltip);
    view.rerender(<App />);
    await expectAssociation(button, 'Stable help');
    expect(document.getElementById('stable-authored')).toBe(tooltip);
  });

  it('isolates nested overlay triggers and nested standalone Tooltips from the outer owner', async () => {
    render(
      <Whisper
        trigger="focus"
        speaker={
          <Tooltip data-testid="outer-tooltip">
            <Whisper defaultOpen speaker={<div>Inner generic</div>}>
              <button>Inner trigger</button>
            </Whisper>
            <Tooltip data-testid="inner-tooltip">Inner standalone</Tooltip>
          </Tooltip>
        }
      >
        <button>Outer trigger</button>
      </Whisper>
    );
    const outer = screen.getByRole('button', { name: 'Outer trigger' });
    await native(() => userEvent.click(outer));
    const tooltip = await screen.findByTestId('outer-tooltip');
    await waitFor(() => expect(outer.getAttribute('aria-describedby')).toBe(tooltip.id));
    expect(tooltip.id).not.toBe('');
    expect(
      screen.getByRole('button', { name: 'Inner trigger' }).hasAttribute('aria-describedby')
    ).toBe(false);
    expect(screen.getByTestId('inner-tooltip').id).toBe('');
  });

  it('supports StrictMode with distinct IDs and no ref feedback loop', async () => {
    render(
      <React.StrictMode>
        <Whisper defaultOpen speaker={<Tooltip>First help</Tooltip>}>
          <button>First trigger</button>
        </Whisper>
        <Whisper defaultOpen speaker={<Tooltip>Second help</Tooltip>}>
          <button>Second trigger</button>
        </Whisper>
      </React.StrictMode>
    );
    const first = screen.getByRole('button', { name: 'First trigger' });
    const second = screen.getByRole('button', { name: 'Second trigger' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'First trigger', description: 'First help' })).toBe(
        first
      );
      expect(
        screen.getByRole('button', { name: 'Second trigger', description: 'Second help' })
      ).toBe(second);
    });
    expect(first.getAttribute('aria-describedby')).not.toBe(
      second.getAttribute('aria-describedby')
    );
    await native(() => userEvent.click(first));
    expect(errors).toEqual([]);
  });

  it('leaves render-function speakers and triggers under their existing author-managed contract', async () => {
    render(
      <>
        <Whisper
          defaultOpen
          speaker={(props, ref) => (
            <Tooltip
              id={props.id}
              className={props.className}
              ref={ref}
              data-testid="function-speaker"
            >
              Function help
            </Tooltip>
          )}
        >
          <button>Function speaker trigger</button>
        </Whisper>
        <Whisper
          defaultOpen
          speaker={<Tooltip data-testid="function-trigger-tooltip">Function trigger help</Tooltip>}
        >
          {(props, ref) => (
            <button {...props} ref={ref}>
              Function trigger
            </button>
          )}
        </Whisper>
      </>
    );
    expect((await screen.findByTestId('function-speaker')).id).toBe('');
    expect(
      screen
        .getByRole('button', { name: 'Function speaker trigger' })
        .hasAttribute('aria-describedby')
    ).toBe(false);
    expect(screen.getByTestId('function-trigger-tooltip').id).toBe('');
    expect(
      screen.getByRole('button', { name: 'Function trigger' }).hasAttribute('aria-describedby')
    ).toBe(false);
    await native(() => userEvent.click(screen.getByRole('button', { name: 'Function trigger' })));
  });

  it('retains a mounted association when the controlled owner refuses blur closing', async () => {
    render(
      <>
        <Whisper open trigger="focus" speaker={<Tooltip>Retained help</Tooltip>}>
          <button>Retained trigger</button>
        </Whisper>
        <button>Retained outside</button>
      </>
    );
    const button = screen.getByRole('button', { name: 'Retained trigger' });
    await native(() => userEvent.click(button));
    const tooltip = await expectAssociation(button, 'Retained help');
    await native(() => userEvent.tab());
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Retained outside' }));
    expect(tooltip.isConnected).toBe(true);
    await expectAssociation(button, 'Retained help');
  });

  it.each([
    { id: 'invalid tooltip token', role: 'tooltip' as const },
    { id: 'overridden-tooltip-role', role: 'dialog' as const }
  ])('does not associate an invalid physical target ($id, $role)', async ({ id, role }) => {
    render(
      <Whisper
        trigger="focus"
        speaker={
          <Tooltip id={id} role={role}>
            Excluded help
          </Tooltip>
        }
      >
        <button>Excluded trigger</button>
      </Whisper>
    );
    const button = screen.getByRole('button', { name: 'Excluded trigger' });
    await native(() => userEvent.click(button));
    await waitFor(() => expect(document.getElementById(id)?.isConnected).toBe(true));
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  it('does not associate a Tooltip mounted in a different document', async () => {
    const iframe = document.createElement('iframe');
    document.body.append(iframe);
    let view: ReturnType<typeof render> | undefined;
    try {
      const container = iframe.contentDocument!.body;
      view = render(
        <Whisper
          trigger="focus"
          container={container}
          speaker={<Tooltip>Other document help</Tooltip>}
        >
          <button>Other document trigger</button>
        </Whisper>
      );
      const button = screen.getByRole('button', { name: 'Other document trigger' });
      await native(() => userEvent.click(button));
      await waitFor(() =>
        expect(container.querySelector('[role="tooltip"]')?.isConnected).toBe(true)
      );
      expect(button.hasAttribute('aria-describedby')).toBe(false);
    } finally {
      view?.unmount();
      iframe.remove();
    }
  });

  it('preserves the committed description while an eligibility change suspends', async () => {
    const waiting = new Promise<void>(() => {});
    const attempts: boolean[] = [];
    const moved: boolean[] = [];
    function Suspend({ pending }: { pending: boolean }) {
      if (pending) {
        attempts.push(true);
        throw waiting;
      }
      return null;
    }
    function App() {
      const [explicit, setExplicit] = useState(false);
      return (
        <>
          <button onClick={() => React.startTransition(() => setExplicit(true))}>
            Suspend eligibility change
          </button>
          <React.Suspense fallback={<span>Suspended fallback</span>}>
            <Whisper
              open
              trigger="hover"
              followCursor
              controlId={explicit ? 'pending-description' : undefined}
              speaker={<Tooltip>Committed help</Tooltip>}
            >
              <button onMouseMove={e => moved.push(e.nativeEvent.isTrusted)}>
                Committed trigger
              </button>
            </Whisper>
            <Suspend pending={explicit} />
          </React.Suspense>
        </>
      );
    }
    render(<App />);
    const button = screen.getByRole('button', { name: 'Committed trigger' });
    const tooltip = await expectAssociation(button, 'Committed help');
    const changed: (string | null)[] = [];
    const observer = new MutationObserver(records => {
      for (const record of records) changed.push(record.oldValue);
    });
    observer.observe(button, {
      attributes: true,
      attributeFilter: ['aria-describedby'],
      attributeOldValue: true
    });
    try {
      await native(() =>
        userEvent.click(screen.getByRole('button', { name: 'Suspend eligibility change' }))
      );
      await waitFor(() => expect(attempts.length).toBeGreaterThan(0));
      expect(screen.queryByText('Suspended fallback')).toBeNull();
      await native(() => userEvent.hover(button));
      expect(moved.length).toBeGreaterThan(0);
      expect(moved.every(Boolean)).toBe(true);
      await expectAssociation(button, 'Committed help');
      expect(document.getElementById(tooltip.id)).toBe(tooltip);
      expect(button.getAttribute('aria-describedby')).toBe(tooltip.id);
      expect(changed).toEqual([]);
    } finally {
      observer.disconnect();
    }
  });
});
