import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { commands } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FormErrorMessage, { FormErrorMessageProps } from '../FormErrorMessage';
import CustomProvider from '../../CustomProvider';
import Form from '../../Form';
import '../styles/index.scss';
import '../../Form/styles/index.scss';

const initialPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'reduce'
  : 'no-preference';
const policies = [undefined, true, false];
const preferences = ['reduce', 'no-preference'] as const;
const placements = [
  'topStart',
  'topEnd',
  'bottomStart',
  'bottomEnd',
  'leftStart',
  'leftEnd',
  'rightStart',
  'rightEnd',
  'static'
] as const;
const positioned = (content: React.ReactNode) => (
  <div style={{ position: 'relative', width: 260, height: 40, margin: 60 }}>{content}</div>
);
const message = (placement: FormErrorMessageProps['placement'] = 'bottomStart') => (
  <FormErrorMessage show placement={placement} role="alert" aria-live="polite">
    Enter an email address
  </FormErrorMessage>
);
const wrap = (content: React.ReactNode, reduceMotion?: boolean) => (
  <CustomProvider reduceMotion={reduceMotion}>{positioned(content)}</CustomProvider>
);

beforeEach(() => commands.setMotionPreference('no-preference'));
afterEach(async () => {
  cleanup();
  await commands.setMotionPreference(initialPreference);
});

function expectMotion(
  wrapper: HTMLElement,
  reduced: boolean,
  placement: FormErrorMessageProps['placement'] = 'bottomStart'
) {
  const content = wrapper.querySelector<HTMLElement>(':scope > .rs-form-error-message')!;
  const style = getComputedStyle(content);
  const animation = placement?.startsWith('top')
    ? 'errorMessageSlideUpIn'
    : placement?.startsWith('bottom')
      ? 'errorMessageSlideDownIn'
      : 'none';
  expect(style.animationName).toBe(reduced ? 'none' : animation);
  if (!reduced && animation !== 'none') expect(style.animationDuration).toBe('0.3s');
  if (reduced) expect(style.transform).toBe('none');
  expect(style.display).not.toBe('none');
  expect(style.visibility).toBe('visible');
  expect(style.opacity).toBe('1');
  expect(content.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(content.getBoundingClientRect().height).toBeGreaterThan(0);
  expect(content).toHaveTextContent('Enter an email address');
  const arrow = content.querySelector(':scope > .rs-form-error-message-arrow')!;
  expect(getComputedStyle(arrow).display === 'none').toBe(placement === 'static');
}

describe('FormErrorMessage reduced motion', () => {
  for (const preference of preferences) {
    describe.each(placements)(`placement %s with system ${preference}`, placement => {
      it.each(policies)('honors provider %s and preserves visible feedback', async policy => {
        await commands.setMotionPreference(preference);
        const { getByRole } = render(wrap(message(placement), policy));
        const error = getByRole('alert');
        expectMotion(error, policy ?? preference === 'reduce', placement);
        expect(error).toHaveAttribute('aria-live', 'polite');
      });
    });

    for (const placement of ['topEnd', 'static'] as const) {
      it.each(policies)(
        `server placement=${placement} system=${preference} honors provider %s`,
        async policy => {
          await commands.setMotionPreference(preference);
          const host = document.createElement('div');
          host.innerHTML = renderToString(wrap(message(placement), policy));
          document.body.appendChild(host);
          try {
            expectMotion(
              host.querySelector<HTMLElement>('[role="alert"]')!,
              policy ?? preference === 'reduce',
              placement
            );
          } finally {
            host.remove();
          }
        }
      );
    }
  }

  it('responds to system changes without a provider', async () => {
    const { getByRole } = render(positioned(message()));
    expectMotion(getByRole('alert'), false);
    await act(() => commands.setMotionPreference('reduce'));
    expectMotion(getByRole('alert'), true);
    await act(() => commands.setMotionPreference('no-preference'));
    expectMotion(getByRole('alert'), false);
  });

  it('responds to provider changes and resumes the system policy', async () => {
    await commands.setMotionPreference('reduce');
    const { getByRole, rerender } = render(wrap(message(), false));
    expectMotion(getByRole('alert'), false);
    rerender(wrap(message(), true));
    expectMotion(getByRole('alert'), true);
    rerender(wrap(message(), false));
    expectMotion(getByRole('alert'), false);
    rerender(wrap(message()));
    expectMotion(getByRole('alert'), true);
  });

  it.each([true, false])('uses the nearest provider inside outer policy %s', outerPolicy => {
    const { getByTestId } = render(
      wrap(
        <FormErrorMessage show placement="bottomStart" data-testid="outer">
          Enter an email address
          <CustomProvider reduceMotion={!outerPolicy}>
            <span style={{ display: 'inline-block', position: 'relative', width: 220, height: 40 }}>
              <FormErrorMessage as="span" show placement="bottomStart" data-testid="inner">
                Enter an email address
              </FormErrorMessage>
            </span>
          </CustomProvider>
        </FormErrorMessage>,
        outerPolicy
      )
    );
    expectMotion(getByTestId('outer'), outerPolicy);
    expectMotion(getByTestId('inner'), !outerPolicy);
  });

  it('keeps provider policy in control of its motion attribute', () => {
    const { getByRole } = render(
      wrap(
        <FormErrorMessage show placement="bottomStart" role="alert" data-rs-motion="allow">
          Enter an email address
        </FormErrorMessage>,
        true
      )
    );
    expectMotion(getByRole('alert'), true);
  });

  it('preserves component defaults and a forwarded ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByRole } = render(
      <CustomProvider
        reduceMotion
        components={{ FormErrorMessage: { defaultProps: { show: true, placement: 'topStart' } } }}
      >
        {positioned(
          <FormErrorMessage ref={ref} role="alert">
            Enter an email address
          </FormErrorMessage>
        )}
      </CustomProvider>
    );
    expectMotion(getByRole('alert'), true, 'topStart');
    expect(ref.current).toBe(getByRole('alert'));
  });

  it('preserves show and placement changes', () => {
    const view = (show: boolean, placement: FormErrorMessageProps['placement']) =>
      wrap(
        <FormErrorMessage show={show} placement={placement} role="alert">
          Enter an email address
        </FormErrorMessage>,
        true
      );
    const { getByRole, queryByRole, rerender } = render(view(false, 'bottomStart'));
    expect(queryByRole('alert')).toBeNull();
    rerender(view(true, 'bottomStart'));
    expectMotion(getByRole('alert'), true);
    rerender(view(true, 'static'));
    expectMotion(getByRole('alert'), true, 'static');
    rerender(view(true, 'topEnd'));
    expectMotion(getByRole('alert'), true, 'topEnd');
    rerender(view(false, 'topEnd'));
    expect(queryByRole('alert')).toBeNull();
  });

  it.each(['topStart', 'topEnd', 'bottomStart', 'bottomEnd'] as const)(
    'keeps RTL placement %s and its arrow visible',
    placement => {
      const { getByRole } = render(
        <CustomProvider rtl reduceMotion>
          {positioned(message(placement))}
        </CustomProvider>
      );
      expectMotion(getByRole('alert'), true, placement);
    }
  );

  it('preserves FormControl error association, focus and edits', () => {
    const onChange = vi.fn();
    const view = (errorMessage?: string) => (
      <CustomProvider reduceMotion>
        <Form>
          <Form.Group controlId="motion-email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" errorMessage={errorMessage} onChange={onChange} />
          </Form.Group>
        </Form>
      </CustomProvider>
    );
    const { getByRole, queryByRole, rerender } = render(view('Enter an email address'));
    const input = getByRole('textbox', { name: 'Email' });
    const error = getByRole('alert');
    expectMotion(error, true);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-errormessage', error.id);
    input.focus();
    fireEvent.change(input, { target: { value: 'user@example.com' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveFocus();
    rerender(view());
    expect(queryByRole('alert')).toBeNull();
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toHaveAttribute('aria-errormessage');
    expect(input).toHaveFocus();
  });
});
