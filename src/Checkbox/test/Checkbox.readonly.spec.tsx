import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Checkbox from '../Checkbox';

const activations = ['input', 'label', 'Space'] as const;

async function activate(input: HTMLInputElement, activation: (typeof activations)[number]) {
  await act(async () => {
    if (activation === 'Space') {
      input.focus();
      userEvent.keyboard(' ');
    } else {
      await userEvent.click(activation === 'label' ? screen.getByText('Choice') : input);
    }
  });
}

describe('Checkbox readOnly native state', () => {
  describe.each([false, true])('defaultChecked=%s', defaultChecked => {
    it.each(activations)(
      'Should preserve checked state and form data after %s and unlock normally',
      async activation => {
        const onChange = vi.fn();
        const renderCheckbox = (readOnly: boolean) => (
          <form data-testid="form">
            <Checkbox
              readOnly={readOnly}
              defaultChecked={defaultChecked}
              name="choice"
              value="yes"
              onChange={onChange}
            >
              Choice
            </Checkbox>
          </form>
        );
        const { rerender } = render(renderCheckbox(true));
        const input = screen.getByRole('checkbox') as HTMLInputElement;
        const form = screen.getByTestId('form') as HTMLFormElement;

        for (let i = 0; i < 2; i++) {
          await activate(input, activation);
          expect(input.checked).to.equal(defaultChecked);
          expect(input).to.have.attribute('aria-checked', String(defaultChecked));
          expect(new FormData(form).get('choice')).to.equal(defaultChecked ? 'yes' : null);
        }
        expect(onChange).not.toHaveBeenCalled();

        rerender(renderCheckbox(false));
        await activate(input, activation);

        expect(input.checked).to.equal(!defaultChecked);
        expect(input).to.have.attribute('aria-checked', String(!defaultChecked));
        expect(new FormData(form).get('choice')).to.equal(defaultChecked ? null : 'yes');
        expect(onChange).toHaveBeenCalledExactlyOnceWith('yes', !defaultChecked, expect.anything());
      }
    );
  });

  describe.each([false, true])('indeterminate defaultChecked=%s', defaultChecked => {
    it.each(activations)('Should preserve indeterminate state after %s', async activation => {
      render(
        <Checkbox readOnly indeterminate defaultChecked={defaultChecked}>
          Choice
        </Checkbox>
      );
      const input = screen.getByRole('checkbox') as HTMLInputElement;

      await activate(input, activation);

      expect(input.checked).to.equal(defaultChecked);
      expect(input.indeterminate).to.equal(true);
      expect(input).to.have.attribute('aria-checked', 'mixed');
    });
  });

  it.each(activations)('Should keep click callbacks when readOnly after %s', async activation => {
    const onClick = vi.fn();
    const onCheckboxClick = vi.fn();
    const onChange = vi.fn();
    render(
      <Checkbox readOnly onClick={onClick} onCheckboxClick={onCheckboxClick} onChange={onChange}>
        Choice
      </Checkbox>
    );

    await activate(screen.getByRole('checkbox') as HTMLInputElement, activation);

    expect(onClick).toHaveBeenCalledTimes(activation === 'label' ? 2 : 1);
    expect(onCheckboxClick).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('Should remain readOnly when onCheckboxClick stops propagation', async () => {
    const onClick = vi.fn();
    const onCheckboxClick = vi.fn((event: React.SyntheticEvent) => event.stopPropagation());
    render(
      <Checkbox readOnly onClick={onClick} onCheckboxClick={onCheckboxClick}>
        Choice
      </Checkbox>
    );
    const input = screen.getByRole('checkbox') as HTMLInputElement;

    await activate(input, 'input');

    expect(input.checked).to.equal(false);
    expect(onCheckboxClick).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});
