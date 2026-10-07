import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { server, userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import { flushSync } from 'react-dom';
import FormErrorSummary from '../FormErrorSummary';
import Form from '../../Form';
import Input from '../../Input';
import NumberInput from '../../NumberInput';
import DateInput from '../../DateInput';
import SelectPicker from '../../SelectPicker';
import Modal from '../../Modal';
import Drawer from '../../Drawer';
import CustomProvider from '../../CustomProvider';
import { SchemaModel, StringType } from '../../Schema';
import '../styles/index.scss';
import '../../Input/styles/index.scss';
import '../../NumberInput/styles/index.scss';
import '../../DateInput/styles/index.scss';
import '../../SelectPicker/styles/index.scss';
import '../../Modal/styles/index.scss';
import '../../Drawer/styles/index.scss';

const item = {
  name: 'contact',
  label: 'Contact:',
  message: 'Complete this field.',
  controlId: 'summary-contact'
};

// macOS WebKit uses Option+Tab to include links in sequential keyboard navigation.
const tabToLink =
  server.browser === 'webkit' && /^Mac/.test(navigator.platform) ? '{Alt>}{Tab}{/Alt}' : '{Tab}';

async function activateFirstLink(summary: HTMLElement) {
  act(() => summary.focus());
  await act(async () => userEvent.keyboard(tabToLink));
  expect(screen.getByRole('link')).toHaveFocus();
  await act(async () => userEvent.keyboard('{Enter}'));
}

function contrastRatio(foreground: string, background: string, backdrop: string) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d')!;
  const luminance = (color: string, base: string) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = backdrop;
    context.fillRect(0, 0, 1, 1);
    context.fillStyle = base;
    context.fillRect(0, 0, 1, 1);
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    const channels = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map(channel => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const first = luminance(foreground, background);
  const second = luminance(background, backdrop);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

describe('FormErrorSummary native navigation', () => {
  it.each(['light', 'dark', 'high-contrast'] as const)(
    'keeps readable error text and visible keyboard focus in the %s theme',
    async theme => {
      const bodyClassName = document.body.className;
      try {
        render(
          <CustomProvider theme={theme}>
            <div data-testid="surface" style={{ background: 'var(--rs-body)' }}>
              <FormErrorSummary header="Errors" items={[item]} />
            </div>
          </CustomProvider>
        );
        const summary = screen.getByRole('region');
        act(() => summary.focus());
        const style = getComputedStyle(summary);
        const backdrop = getComputedStyle(screen.getByTestId('surface')).backgroundColor;
        const header = getComputedStyle(screen.getByRole('heading'));
        expect(contrastRatio(style.color, style.backgroundColor, backdrop)).toBeGreaterThanOrEqual(
          4.5
        );
        expect(contrastRatio(header.color, style.backgroundColor, backdrop)).toBeGreaterThanOrEqual(
          4.5
        );
        expect(style.outlineStyle).toBe('solid');
        expect(contrastRatio(style.outlineColor, backdrop, backdrop)).toBeGreaterThanOrEqual(3);
        await act(async () => userEvent.keyboard(tabToLink));
        const link = screen.getByRole('link');
        expect(link).toHaveFocus();
        expect(link.matches(':focus-visible')).toBe(true);
        const linkStyle = getComputedStyle(link);
        expect(
          contrastRatio(linkStyle.color, style.backgroundColor, backdrop)
        ).toBeGreaterThanOrEqual(4.5);
        expect(linkStyle.outlineStyle).toBe('solid');
        expect(
          contrastRatio(linkStyle.outlineColor, style.backgroundColor, backdrop)
        ).toBeGreaterThanOrEqual(3);
      } finally {
        document.body.className = bodyClassName;
      }
    }
  );

  it.each([Input, NumberInput, DateInput])(
    'focuses the real %s control without changing its value',
    async Accepter => {
      const onChange = vi.fn();
      const onSelect = vi.fn();
      render(
        <Form
          aria-label="Contact form"
          checkTrigger="none"
          onChange={onChange}
          style={{ maxHeight: 400, overflow: 'auto', scrollBehavior: 'smooth' }}
          formDefaultValue={{
            contact:
              Accepter === DateInput
                ? new Date(2024, 0, 15)
                : Accepter === NumberInput
                  ? 42
                  : 'Alice'
          }}
        >
          <Form.ErrorSummary header="Check your information" items={[item]} onSelect={onSelect} />
          <div style={{ height: 1400 }} />
          <Form.Group controlId="summary-contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control name="contact" accepter={Accepter} />
          </Form.Group>
        </Form>
      );
      const control = document.getElementById('summary-contact')!;
      const initialValue = (control as HTMLInputElement).value;
      await activateFirstLink(screen.getByRole('region'));
      expect(control).toHaveFocus();
      const formRect = screen.getByRole('form').getBoundingClientRect();
      expect(control.getBoundingClientRect().top).toBeGreaterThanOrEqual(formRect.top - 1);
      expect(control.getBoundingClientRect().bottom).toBeLessThanOrEqual(formRect.bottom + 1);
      expect((control as HTMLInputElement).value).toBe(initialValue);
      expect(onChange).not.toHaveBeenCalled();
      expect(onSelect).toHaveBeenCalledOnce();
      expect(onSelect.mock.calls[0][0]).toBe(item);
      expect(onSelect.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    }
  );

  it('navigates to the real SelectPicker combobox without opening it or changing its value', async () => {
    const selectedItem = {
      name: 'contact',
      label: 'Supplier:',
      message: 'Review the supplier selection.',
      controlId: 'summary-contact'
    };
    const onFormChange = vi.fn();
    const onSummarySelect = vi.fn();
    const onPickerSelect = vi.fn();
    const onPickerOpen = vi.fn();
    render(
      <Form
        aria-label="Supplier form"
        checkTrigger="none"
        formValue={{ contact: 'partner-a' }}
        onChange={onFormChange}
        style={{ maxHeight: 400, overflow: 'auto', scrollBehavior: 'smooth' }}
      >
        <Form.ErrorSummary
          header="Check the supplier information"
          items={[selectedItem]}
          onSelect={onSummarySelect}
        />
        <div style={{ height: 1400 }} />
        <Form.Group controlId="summary-contact">
          <Form.Label>Supplier</Form.Label>
          <Form.Control
            name="contact"
            accepter={SelectPicker}
            data={[
              { label: 'Partner A', value: 'partner-a' },
              { label: 'Partner B', value: 'partner-b' }
            ]}
            onSelect={onPickerSelect}
            onOpen={onPickerOpen}
          />
        </Form.Group>
      </Form>
    );
    const control = await screen.findByRole('combobox', { name: 'Supplier' });
    expect(document.getElementById('summary-contact')).toBe(control);
    const hiddenInput = control.querySelector<HTMLInputElement>('input[name="contact"]');
    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput).toHaveAttribute('aria-hidden', 'true');
    expect(hiddenInput).toHaveValue('partner-a');
    expect(control).toHaveAttribute('aria-expanded', 'false');
    expect(control).toHaveTextContent('Partner A');
    const form = screen.getByRole('form', { name: 'Supplier form' });
    expect(control.getBoundingClientRect().top).toBeGreaterThan(
      form.getBoundingClientRect().bottom
    );
    await activateFirstLink(screen.getByRole('region', { name: 'Check the supplier information' }));
    await waitFor(() => {
      expect(control).toHaveFocus();
      const formRect = form.getBoundingClientRect();
      const controlRect = control.getBoundingClientRect();
      expect(controlRect.top).toBeGreaterThanOrEqual(formRect.top - 1);
      expect(controlRect.bottom).toBeLessThanOrEqual(formRect.bottom + 1);
    });
    expect(screen.getByRole('combobox', { name: 'Supplier' })).toBe(control);
    expect(hiddenInput).not.toHaveFocus();
    expect(hiddenInput).toHaveValue('partner-a');
    expect(control).toHaveTextContent('Partner A');
    expect(control).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(onFormChange).not.toHaveBeenCalled();
    expect(onPickerSelect).not.toHaveBeenCalled();
    expect(onPickerOpen).not.toHaveBeenCalled();
    expect(onSummarySelect).toHaveBeenCalledOnce();
    expect(onSummarySelect.mock.calls[0][0]).toBe(selectedItem);
    expect(onSummarySelect.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
  });

  it('uses the exact quote, backslash and Unicode control ID', async () => {
    const controlId = 'payments[0].账户"\\';
    render(
      <>
        <FormErrorSummary header="Errors" items={[{ ...item, controlId }]} />
        <input id={controlId} aria-label="Target" />
        <input id="payments" aria-label="Other form" />
      </>
    );
    await activateFirstLink(screen.getByRole('region'));
    expect(screen.getByRole('textbox', { name: 'Target' })).toHaveFocus();
    expect(screen.getByRole('textbox', { name: 'Other form' })).not.toHaveFocus();
  });

  it('does not focus an ARIA-disabled focusable widget', async () => {
    render(
      <>
        <FormErrorSummary header="Errors" items={[item]} />
        <div id="summary-contact" role="combobox" aria-disabled="true" tabIndex={0}>
          Unchanged selection
        </div>
      </>
    );
    await activateFirstLink(screen.getByRole('region'));
    expect(screen.getByRole('link')).toHaveFocus();
    expect(screen.getByRole('combobox')).not.toHaveFocus();
    expect(screen.getByRole('combobox')).toHaveTextContent('Unchanged selection');
  });

  it.each([
    'disabled',
    'fieldset',
    'hidden',
    'visibility',
    'inert',
    'aria-hidden',
    'aria-disabled',
    'missing',
    'wrapper'
  ] as const)('does not move focus or scroll for a %s target', async state => {
    render(
      <>
        <FormErrorSummary header="Errors" items={[item]} />
        {state !== 'missing' && (
          <fieldset disabled={state === 'fieldset'}>
            <div
              hidden={state === 'hidden'}
              ref={node => {
                if (state === 'inert') node?.setAttribute('inert', '');
              }}
              aria-hidden={state === 'aria-hidden' ? true : undefined}
              aria-disabled={state === 'aria-disabled' ? true : undefined}
              style={{ visibility: state === 'visibility' ? 'hidden' : undefined }}
              id={state === 'wrapper' ? 'summary-contact' : undefined}
            >
              <input
                id={state === 'wrapper' ? 'summary-descendant' : 'summary-contact'}
                disabled={state === 'disabled'}
              />
            </div>
          </fieldset>
        )}
      </>
    );
    const control = document.getElementById('summary-contact');
    const scroll = control ? vi.spyOn(control, 'scrollIntoView') : undefined;
    await activateFirstLink(screen.getByRole('region'));
    expect(screen.getByRole('link')).toHaveFocus();
    if (scroll) expect(scroll).not.toHaveBeenCalled();
  });

  it('preserves externally owned callback focus', async () => {
    const onSelect = vi.fn((_item, event) => {
      screen.getByRole('button', { name: 'Outside' }).focus();
      expect(event.nativeEvent.isTrusted).toBe(true);
    });
    render(
      <>
        <FormErrorSummary header="Errors" items={[item]} onSelect={onSelect} />
        <input id="summary-contact" />
        <button>Outside</button>
      </>
    );
    await activateFirstLink(screen.getByRole('region'));
    expect(screen.getByRole('button')).toHaveFocus();
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('does not navigate after the onSelect callback unmounts the summary', async () => {
    function Fixture() {
      const [show, setShow] = React.useState(true);
      return (
        <>
          {show && (
            <FormErrorSummary
              header="Errors"
              items={[item]}
              onSelect={() => flushSync(() => setShow(false))}
            />
          )}
          <input id="summary-contact" aria-label="Contact" />
        </>
      );
    }
    render(<Fixture />);
    const focus = vi.spyOn(screen.getByRole('textbox'), 'focus');
    await activateFirstLink(screen.getByRole('region'));
    expect(screen.queryByRole('region')).toBeNull();
    expect(focus).not.toHaveBeenCalled();
  });

  it.each([Modal, Drawer])('keeps navigation within its %s dialog', async Dialog => {
    render(
      <>
        <Dialog open animationTimeout={0} enforceFocus={false}>
          <Dialog.Body>
            <FormErrorSummary header="Errors" items={[item]} />
          </Dialog.Body>
        </Dialog>
        <input id="summary-contact" aria-label="Outside target" />
      </>
    );
    await activateFirstLink(await screen.findByRole('region'));
    expect(screen.getByRole('link')).toHaveFocus();
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  it.each([Modal, Drawer])('navigates to a visible field within its %s dialog', async Dialog => {
    render(
      <Dialog open animationTimeout={0}>
        <Dialog.Body>
          <FormErrorSummary header="Errors" items={[item]} />
          <input id="summary-contact" aria-label="Contact" />
        </Dialog.Body>
      </Dialog>
    );
    await activateFirstLink(await screen.findByRole('region'));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('allows the application to reveal and focus a lazy field after cancelling navigation', async () => {
    const onSelect = vi.fn();
    function Fixture() {
      const [visible, setVisible] = React.useState(false);
      const inputRef = React.useRef<HTMLInputElement>(null);
      React.useEffect(() => {
        if (visible) inputRef.current?.focus();
      }, [visible]);
      return (
        <>
          <FormErrorSummary
            header="Errors"
            items={[item]}
            onSelect={(selected, event) => {
              onSelect(selected, event.nativeEvent.isTrusted);
              event.preventDefault();
              setVisible(true);
            }}
          />
          {visible && <input ref={inputRef} id="summary-contact" aria-label="Lazy contact" />}
        </>
      );
    }
    render(<Fixture />);
    await activateFirstLink(screen.getByRole('region'));
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(onSelect).toHaveBeenCalledExactlyOnceWith(item, true);
  });

  it('looks up the current target after the callback synchronously replaces the field', async () => {
    function Fixture() {
      const [version, setVersion] = React.useState(0);
      return (
        <>
          <FormErrorSummary
            header="Errors"
            items={[item]}
            onSelect={() => flushSync(() => setVersion(1))}
          />
          <input
            key={version}
            id="summary-contact"
            aria-label="Contact"
            defaultValue={version ? 'New' : 'Old'}
          />
        </>
      );
    }
    render(<Fixture />);
    const previous = screen.getByRole('textbox');
    await activateFirstLink(screen.getByRole('region'));
    expect(previous.isConnected).toBe(false);
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(screen.getByRole('textbox')).toHaveValue('New');
  });

  it('focuses the summary only when the application requests it after a failed submit commit', async () => {
    const model = SchemaModel({ contact: StringType().isRequired('Enter a contact.') });
    const onSubmit = vi.fn();
    function Fixture() {
      const ref = React.useRef<HTMLDivElement>(null);
      const [errors, setErrors] = React.useState<Record<string, string>>({});
      const [attempt, setAttempt] = React.useState(0);
      React.useEffect(() => {
        if (attempt) ref.current?.focus();
      }, [attempt]);
      return (
        <Form
          model={model}
          checkTrigger="none"
          onCheck={setErrors}
          onError={() => setAttempt(previous => previous + 1)}
          onSubmit={onSubmit}
        >
          <Form.ErrorSummary
            ref={ref}
            header="Errors"
            items={errors.contact ? [{ ...item, message: errors.contact }] : []}
          />
          <Form.Group controlId="summary-contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control name="contact" />
          </Form.Group>
          <button type="submit">Submit</button>
        </Form>
      );
    }
    render(<Fixture />);
    act(() => screen.getByRole('button').focus());
    await act(async () => userEvent.keyboard('{Enter}'));
    await waitFor(() => expect(screen.getByRole('region')).toHaveFocus());
    expect(screen.getByRole('listitem')).toHaveTextContent('Enter a contact.');
    expect(onSubmit).not.toHaveBeenCalled();
    await act(async () => userEvent.keyboard(tabToLink));
    expect(screen.getByRole('link')).toHaveFocus();
    await act(async () => userEvent.keyboard('{Enter}'));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});
