import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';

describe('CheckboxGroup readOnly native state', () => {
  it.each(['input', 'label', 'Space'] as const)(
    'Should preserve selected and unselected inputs and form data after %s and unlock normally',
    async activation => {
      const onChange = vi.fn();
      const onCheckboxChange = vi.fn();
      const renderGroup = (readOnly: boolean) => (
        <form data-testid="form">
          <CheckboxGroup
            readOnly={readOnly}
            defaultValue={['first']}
            name="choice"
            onChange={onChange}
          >
            <Checkbox value="first" onChange={onCheckboxChange}>
              First
            </Checkbox>
            <Checkbox value="second" onChange={onCheckboxChange}>
              Second
            </Checkbox>
          </CheckboxGroup>
        </form>
      );
      const { rerender } = render(renderGroup(true));
      const first = screen.getByRole('checkbox', { name: 'First' }) as HTMLInputElement;
      const second = screen.getByRole('checkbox', { name: 'Second' }) as HTMLInputElement;
      const form = screen.getByTestId('form') as HTMLFormElement;
      const activate = async (input: HTMLInputElement, label: string) => {
        await act(async () => {
          if (activation === 'Space') {
            input.focus();
            userEvent.keyboard(' ');
          } else {
            await userEvent.click(activation === 'label' ? screen.getByText(label) : input);
          }
        });
      };

      await activate(first, 'First');
      await activate(second, 'Second');

      expect(first.checked).to.equal(true);
      expect(first).to.have.attribute('aria-checked', 'true');
      expect(second.checked).to.equal(false);
      expect(second).to.have.attribute('aria-checked', 'false');
      expect(new FormData(form).getAll('choice')).to.deep.equal(['first']);
      expect(onChange).not.toHaveBeenCalled();
      expect(onCheckboxChange).not.toHaveBeenCalled();

      rerender(renderGroup(false));
      await activate(second, 'Second');

      expect(first.checked).to.equal(true);
      expect(second.checked).to.equal(true);
      expect(second).to.have.attribute('aria-checked', 'true');
      expect(new FormData(form).getAll('choice')).to.deep.equal(['first', 'second']);
      expect(onChange).toHaveBeenCalledExactlyOnceWith(['first', 'second'], expect.anything());
      expect(onCheckboxChange).toHaveBeenCalledExactlyOnceWith('second', true, expect.anything());
    }
  );
});
