import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../../CheckboxGroup';
import Radio from '../../Radio';
import RadioGroup from '../../RadioGroup';

// Run this native keyboard integration separately so parallel pages cannot steal focus:
// RUN_ENV=test F=src/Checkbox/test/ReadOnly.keyboard.test.tsx npx vitest run --browser.headless --no-file-parallelism
async function pressSpace(input: HTMLInputElement) {
  await act(async () => {
    // An already selected radio may not dispatch a Space click.
    const click =
      input.type === 'radio' && input.checked
        ? undefined
        : new Promise<void>(resolve => {
            input.addEventListener('click', () => resolve(), { once: true });
          });
    await userEvent.type(input, ' ');
    await click;
  });
}

describe.each([
  { Component: Checkbox, role: 'checkbox' },
  { Component: Radio, role: 'radio' }
])('$role native readOnly keyboard', ({ Component, role }) => {
  it.each([false, true])(
    'Should preserve defaultChecked=%s and form data with native Space, then unlock',
    async defaultChecked => {
      const onChange = vi.fn();
      const renderControl = (readOnly: boolean) => (
        <form data-testid="form">
          <Component
            readOnly={readOnly}
            defaultChecked={defaultChecked}
            name="choice"
            value="yes"
            onChange={onChange}
          >
            Choice
          </Component>
        </form>
      );
      const { rerender } = render(renderControl(true));
      const input = screen.getByRole(role) as HTMLInputElement;
      const form = screen.getByTestId('form') as HTMLFormElement;

      await pressSpace(input);
      expect(input.checked).to.equal(defaultChecked);
      expect(input).to.have.attribute('aria-checked', String(defaultChecked));
      expect(new FormData(form).get('choice')).to.equal(defaultChecked ? 'yes' : null);
      expect(onChange).not.toHaveBeenCalled();

      rerender(renderControl(false));
      await pressSpace(input);

      const nextChecked = role === 'radio' || !defaultChecked;
      expect(input.checked).to.equal(nextChecked);
      expect(input).to.have.attribute('aria-checked', String(nextChecked));
      expect(new FormData(form).get('choice')).to.equal(nextChecked ? 'yes' : null);
      expect(onChange).toHaveBeenCalledTimes(role === 'radio' && defaultChecked ? 0 : 1);
    }
  );
});

it.each([false, true])(
  'Should preserve an indeterminate defaultChecked=%s Checkbox with native Space',
  async defaultChecked => {
    render(
      <Checkbox readOnly indeterminate defaultChecked={defaultChecked}>
        Mixed
      </Checkbox>
    );
    const input = screen.getByRole('checkbox') as HTMLInputElement;

    await pressSpace(input);

    expect(input.checked).to.equal(defaultChecked);
    expect(input.indeterminate).to.equal(true);
    expect(input).to.have.attribute('aria-checked', 'mixed');
  }
);

describe.each([
  {
    role: 'checkbox',
    renderGroup: (readOnly: boolean, onChange: () => void) => (
      <CheckboxGroup readOnly={readOnly} defaultValue={['first']} name="choice" onChange={onChange}>
        <Checkbox value="first">First</Checkbox>
        <Checkbox value="second">Second</Checkbox>
      </CheckboxGroup>
    )
  },
  {
    role: 'radio',
    renderGroup: (readOnly: boolean, onChange: () => void) => (
      <RadioGroup readOnly={readOnly} defaultValue="first" name="choice" onChange={onChange}>
        <Radio value="first">First</Radio>
        <Radio value="second">Second</Radio>
      </RadioGroup>
    )
  }
])('$role group native readOnly keyboard', ({ role, renderGroup }) => {
  it('Should preserve selected and unselected options and form data with native Space, then unlock', async () => {
    const onChange = vi.fn();
    const renderForm = (readOnly: boolean) => (
      <form data-testid="form">{renderGroup(readOnly, onChange)}</form>
    );
    const { rerender } = render(renderForm(true));
    const first = screen.getByRole(role, { name: 'First' }) as HTMLInputElement;
    const second = screen.getByRole(role, { name: 'Second' }) as HTMLInputElement;
    const form = screen.getByTestId('form') as HTMLFormElement;

    await pressSpace(first);
    await pressSpace(second);

    expect(first.checked).to.equal(true);
    expect(second.checked).to.equal(false);
    expect(second).to.have.attribute('aria-checked', 'false');
    expect(new FormData(form).getAll('choice')).to.deep.equal(['first']);
    expect(onChange).not.toHaveBeenCalled();

    rerender(renderForm(false));
    await pressSpace(second);

    expect(first.checked).to.equal(role === 'checkbox');
    expect(second.checked).to.equal(true);
    expect(second).to.have.attribute('aria-checked', 'true');
    expect(new FormData(form).getAll('choice')).to.deep.equal(
      role === 'checkbox' ? ['first', 'second'] : ['second']
    );
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

it('Should cancel native RadioGroup arrow selection and allow it after unlocking', async () => {
  const onChange = vi.fn();
  const renderGroup = (readOnly: boolean) => (
    <RadioGroup readOnly={readOnly} defaultValue="first" name="choice" onChange={onChange}>
      <Radio value="first">First</Radio>
      <Radio value="second">Second</Radio>
    </RadioGroup>
  );
  const { rerender } = render(renderGroup(true));
  const first = screen.getByRole('radio', { name: 'First' }) as HTMLInputElement;
  const second = screen.getByRole('radio', { name: 'Second' }) as HTMLInputElement;
  const selectNext = async () => {
    await act(async () => {
      await userEvent.type(first, '{ArrowRight}');
    });
  };

  await selectNext();
  expect(first.checked).to.equal(true);
  expect(second.checked).to.equal(false);
  expect(onChange).not.toHaveBeenCalled();

  rerender(renderGroup(false));
  await selectNext();
  expect(first.checked).to.equal(false);
  expect(second.checked).to.equal(true);
  expect(onChange).toHaveBeenCalledExactlyOnceWith('second', expect.anything());
});
