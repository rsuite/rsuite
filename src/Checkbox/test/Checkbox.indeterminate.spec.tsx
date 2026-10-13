import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Checkbox from '..';
import CheckboxGroup from '../../CheckboxGroup';

afterEach(cleanup);

describe('Checkbox native indeterminate state', () => {
  describe.each(['plaintext', 'checkable'] as const)('%s', mode => {
    const fixture = (
      hidden: boolean,
      indeterminate = true,
      inputRef?: React.Ref<HTMLInputElement>
    ) => (
      <Checkbox
        checked
        indeterminate={indeterminate}
        plaintext={mode === 'plaintext' && hidden}
        checkable={mode !== 'checkable' || !hidden}
        inputRef={inputRef}
      >
        Choice
      </Checkbox>
    );

    it('initializes an input first mounted after its Checkbox', () => {
      const view = render(fixture(true));
      expect(screen.queryByRole('checkbox')).toBeNull();

      view.rerender(fixture(false));
      const input = screen.getByRole('checkbox') as HTMLInputElement;
      expect(input.checked).toBe(true);
      expect(input).toHaveAttribute('aria-checked', 'mixed');
      expect(input.indeterminate).toBe(true);
    });

    it('restores the native state when an input is recreated', () => {
      const inputRef = vi.fn();
      const view = render(fixture(false, true, inputRef));
      const first = screen.getByRole('checkbox') as HTMLInputElement;
      expect(first.indeterminate).toBe(true);

      view.rerender(fixture(true, true, inputRef));
      expect(screen.queryByRole('checkbox')).toBeNull();
      expect(inputRef.mock.calls).toEqual([[first], [null]]);
      view.rerender(fixture(false, true, inputRef));
      const second = screen.getByRole('checkbox') as HTMLInputElement;
      expect(second).not.toBe(first);
      expect(inputRef.mock.calls).toEqual([[first], [null], [second]]);
      expect(second.checked).toBe(true);
      expect(second).toHaveAttribute('aria-checked', 'mixed');
      expect(second.indeterminate).toBe(true);
    });

    it('applies changes made while no input is mounted', () => {
      const view = render(fixture(false, false));
      view.rerender(fixture(true, false));
      view.rerender(fixture(true, true));
      expect(screen.queryByRole('checkbox')).toBeNull();

      view.rerender(fixture(false, true));
      const input = screen.getByRole('checkbox') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-checked', 'mixed');
      expect(input.indeterminate).toBe(true);
    });

    it('keeps a recreated input determinate after clearing the prop while hidden', () => {
      const view = render(fixture(false, true));
      view.rerender(fixture(true, true));
      view.rerender(fixture(true, false));
      view.rerender(fixture(false, false));

      const input = screen.getByRole('checkbox') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-checked', 'true');
      expect(input.indeterminate).toBe(false);
    });
  });

  it('restores the native state when changing the wrapper recreates the input', () => {
    const view = render(<Checkbox indeterminate>Choice</Checkbox>);
    const first = screen.getByRole('checkbox') as HTMLInputElement;
    expect(first.indeterminate).toBe(true);

    view.rerender(
      <Checkbox as="section" indeterminate>
        Choice
      </Checkbox>
    );
    const second = screen.getByRole('checkbox') as HTMLInputElement;
    expect(second).not.toBe(first);
    expect(second).toHaveAttribute('aria-checked', 'mixed');
    expect(second.indeterminate).toBe(true);
  });

  it('restores the native state after CheckboxGroup leaves plaintext mode', () => {
    const fixture = (plaintext: boolean) => (
      <CheckboxGroup plaintext={plaintext} value={['choice']}>
        <Checkbox value="choice" indeterminate>
          Choice
        </Checkbox>
      </CheckboxGroup>
    );
    const view = render(fixture(false));
    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);
    view.rerender(fixture(true));
    expect(screen.queryByRole('checkbox')).toBeNull();
    view.rerender(fixture(false));

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);
    expect(input).toHaveAttribute('aria-checked', 'mixed');
    expect(input.indeterminate).toBe(true);
  });

  it('updates the existing input without detaching its ref or losing focus', () => {
    const inputRef = vi.fn();
    const fixture = (indeterminate?: boolean) => (
      <Checkbox inputRef={inputRef} indeterminate={indeterminate}>
        Choice
      </Checkbox>
    );
    const view = render(fixture(true));
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    input.focus();

    for (const indeterminate of [false, true, undefined]) {
      view.rerender(fixture(indeterminate));
      expect(screen.getByRole('checkbox')).toBe(input);
      expect(input.indeterminate).toBe(Boolean(indeterminate));
      expect(input).toHaveFocus();
      expect(inputRef.mock.calls).toEqual([[input]]);
    }
    view.unmount();
    expect(inputRef.mock.calls).toEqual([[input], [null]]);
  });
});
