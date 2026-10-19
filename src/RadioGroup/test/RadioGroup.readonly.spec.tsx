import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RadioGroup from '../RadioGroup';
import Radio from '../../Radio';

describe('RadioGroup readOnly native state', () => {
  it.each(['input', 'label', 'Space'] as const)(
    'Should preserve selected and unselected inputs and form data after %s and unlock normally',
    async activation => {
      const onChange = vi.fn();
      const onRadioChange = vi.fn();
      const renderGroup = (readOnly: boolean) => (
        <form data-testid="form">
          <RadioGroup readOnly={readOnly} defaultValue="first" name="choice" onChange={onChange}>
            <Radio value="first" onChange={onRadioChange}>
              First
            </Radio>
            <Radio value="second" onChange={onRadioChange}>
              Second
            </Radio>
          </RadioGroup>
        </form>
      );
      const { rerender } = render(renderGroup(true));
      const first = screen.getByRole('radio', { name: 'First' }) as HTMLInputElement;
      const second = screen.getByRole('radio', { name: 'Second' }) as HTMLInputElement;
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
      expect(new FormData(form).get('choice')).to.equal('first');
      expect(onChange).not.toHaveBeenCalled();
      expect(onRadioChange).not.toHaveBeenCalled();

      rerender(renderGroup(false));
      await activate(second, 'Second');

      expect(first.checked).to.equal(false);
      expect(second.checked).to.equal(true);
      expect(second).to.have.attribute('aria-checked', 'true');
      expect(new FormData(form).get('choice')).to.equal('second');
      expect(onChange).toHaveBeenCalledExactlyOnceWith('second', expect.anything());
      expect(onRadioChange).toHaveBeenCalledExactlyOnceWith('second', true, expect.anything());
    }
  );
});
