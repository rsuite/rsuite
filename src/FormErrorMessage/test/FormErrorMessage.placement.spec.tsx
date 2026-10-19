import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import FormErrorMessage, { FormErrorMessageProps } from '../FormErrorMessage';
import CustomProvider from '../../CustomProvider';
import Form from '../../Form';
import '../styles/index.scss';
import '../../Form/styles/index.scss';
import '../../FormControl/styles/index.scss';
import '../../FormGroup/styles/index.scss';
import '../../Input/styles/index.scss';

const sides = ['leftStart', 'leftEnd', 'rightStart', 'rightEnd'] as const;
const placements = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd', ...sides, 'static'] as const;
type Placement = NonNullable<FormErrorMessageProps['placement']>;
const directions = ['ltr', 'rtl'] as const;
const content = (placement: Placement) => (
  <FormErrorMessage show placement={placement} role="alert">
    Enter an email address
  </FormErrorMessage>
);
const scene = (placement: Placement, direction: 'ltr' | 'rtl') => (
  <CustomProvider rtl={direction === 'rtl'} reduceMotion={false}>
    <div
      data-testid="anchor"
      dir={direction}
      style={
        {
          position: 'relative',
          width: 240,
          height: 48,
          margin: '100px 320px',
          '--rs-form-errormessage-border': 'rgb(160, 40, 40)',
          '--rs-form-errormessage-bg': 'rgb(255, 240, 240)'
        } as React.CSSProperties
      }
    >
      {content(placement)}
    </div>
  </CustomProvider>
);

afterEach(cleanup);

function message(wrapper: HTMLElement) {
  const element = wrapper.querySelector<HTMLElement>(':scope > .rs-form-error-message')!;
  // Measure the final position without depending on elapsed animation time.
  element.getAnimations().forEach(animation => animation.finish());
  return element;
}

function expectPosition(
  anchor: HTMLElement,
  wrapper: HTMLElement,
  placement: Placement,
  direction: 'ltr' | 'rtl'
) {
  const element = message(wrapper);
  const box = element.getBoundingClientRect();
  const target = anchor.getBoundingClientRect();
  const close = (actual: number, expected: number) =>
    expect(Math.abs(actual - expected)).toBeLessThanOrEqual(1);
  expect(box.width).toBeGreaterThan(0);
  expect(box.height).toBeGreaterThan(0);
  if (placement === 'static') {
    expect(getComputedStyle(wrapper).position).toBe('static');
    expect(getComputedStyle(element).position).toBe('static');
    return;
  }
  if (placement.startsWith('left') || placement.startsWith('right')) {
    if (placement.startsWith('left')) close(box.right, target.left);
    else close(box.left, target.right);
    if (placement.endsWith('Start')) close(box.top, target.top);
    else close(box.bottom, target.bottom);
  } else {
    if (placement.startsWith('top')) close(box.bottom, target.top);
    else close(box.top, target.bottom);
    const leftAligned = placement.endsWith('Start') === (direction === 'ltr');
    if (leftAligned) close(box.left, target.left);
    else close(box.right, target.right);
  }
}

describe('FormErrorMessage placement', () => {
  for (const direction of directions) {
    it.each(placements)(`positions %s relative to its anchor in ${direction}`, placement => {
      const { getByTestId, getByRole } = render(scene(placement, direction));
      expectPosition(getByTestId('anchor'), getByRole('alert'), placement, direction);
    });

    it.each(sides)(`points the %s arrow toward the control in ${direction}`, placement => {
      const { getByTestId, getByRole } = render(scene(placement, direction));
      const element = message(getByRole('alert'));
      const arrow = element.querySelector<HTMLElement>('.rs-form-error-message-arrow')!;
      const left = placement.startsWith('left');
      const edge = left ? 'right' : 'left';
      const color = left ? 'borderLeftColor' : 'borderRightColor';
      const vertical = placement.endsWith('Start') ? 'top' : 'bottom';
      for (const pseudo of ['::before', '::after']) {
        const style = getComputedStyle(arrow, pseudo);
        expect(style.borderTopWidth).toBe('6px');
        expect(style.borderBottomWidth).toBe('6px');
        expect(style.borderLeftWidth).toBe(left ? '6px' : '0px');
        expect(style.borderRightWidth).toBe(left ? '0px' : '6px');
        expect(style[edge]).toBe(pseudo === '::before' ? '-6px' : '-5px');
        expect(style[color]).toBe(
          pseudo === '::before' ? 'rgb(160, 40, 40)' : 'rgb(255, 240, 240)'
        );
        expect(style[vertical]).toBe('4px');
      }
      getByTestId('anchor').style.setProperty('--rs-form-errormessage-triangle-vertical', '9px');
      expect(getComputedStyle(arrow, '::before')[vertical]).toBe('9px');
      expect(getComputedStyle(arrow, '::after')[vertical]).toBe('9px');
    });

    it(`updates placement without retaining previous offsets in ${direction}`, () => {
      const { getByTestId, getByRole, rerender } = render(scene('leftStart', direction));
      for (const placement of placements) {
        rerender(scene(placement, direction));
        expectPosition(getByTestId('anchor'), getByRole('alert'), placement, direction);
      }
    });

    it.each(sides)(`positions server-rendered %s in ${direction}`, placement => {
      const host = document.createElement('div');
      host.innerHTML = renderToString(scene(placement, direction));
      document.body.appendChild(host);
      try {
        expectPosition(
          host.querySelector<HTMLElement>('[data-testid="anchor"]')!,
          host.querySelector<HTMLElement>('[role="alert"]')!,
          placement,
          direction
        );
      } finally {
        host.remove();
      }
    });

    it.each(sides)(
      `anchors Form.Control error %s and preserves its association in ${direction}`,
      placement => {
        const { getByRole } = render(
          <CustomProvider rtl={direction === 'rtl'} reduceMotion>
            <div dir={direction} style={{ margin: '100px 320px' }}>
              <Form>
                <Form.Group controlId="placement-email">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control
                    name="email"
                    errorMessage="Enter an email address"
                    errorPlacement={placement}
                  />
                </Form.Group>
              </Form>
            </div>
          </CustomProvider>
        );
        const input = getByRole('textbox', { name: 'Email' });
        const error = getByRole('alert');
        expectPosition(
          input.closest<HTMLElement>('.rs-form-control-wrapper')!,
          error,
          placement,
          direction
        );
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-errormessage', error.id);
        expect(getComputedStyle(message(error)).animationName).toBe('none');
      }
    );
  }
});
