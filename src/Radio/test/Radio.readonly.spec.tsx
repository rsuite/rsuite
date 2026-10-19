import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Radio from '../Radio';

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

describe('Radio readOnly native state', () => {
  describe.each([false, true])('defaultChecked=%s', defaultChecked => {
    it.each(activations)(
      'Should preserve checked state and form data after %s and unlock normally',
      async activation => {
        const onChange = vi.fn();
        const renderRadio = (readOnly: boolean) => (
          <form data-testid="form">
            <Radio
              readOnly={readOnly}
              defaultChecked={defaultChecked}
              name="choice"
              value="yes"
              onChange={onChange}
            >
              Choice
            </Radio>
          </form>
        );
        const { rerender } = render(renderRadio(true));
        const input = screen.getByRole('radio') as HTMLInputElement;
        const form = screen.getByTestId('form') as HTMLFormElement;

        for (let i = 0; i < 2; i++) {
          await activate(input, activation);
          expect(input.checked).to.equal(defaultChecked);
          expect(input).to.have.attribute('aria-checked', String(defaultChecked));
          expect(new FormData(form).get('choice')).to.equal(defaultChecked ? 'yes' : null);
        }
        expect(onChange).not.toHaveBeenCalled();

        rerender(renderRadio(false));
        await activate(input, activation);

        expect(input.checked).to.equal(true);
        expect(input).to.have.attribute('aria-checked', 'true');
        expect(new FormData(form).get('choice')).to.equal('yes');
        expect(onChange).toHaveBeenCalledTimes(defaultChecked ? 0 : 1);
        if (!defaultChecked) {
          expect(onChange).toHaveBeenCalledWith('yes', true, expect.anything());
        }
      }
    );
  });

  it('Should prevent activation without children while preserving click callbacks', async () => {
    const onClick = vi.fn();
    const inputOnClick = vi.fn();
    render(<Radio readOnly onClick={onClick} inputProps={{ onClick: inputOnClick }} />);
    const input = screen.getByRole('radio') as HTMLInputElement;

    await activate(input, 'input');

    expect(input.checked).to.equal(false);
    expect(inputOnClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each(activations)(
    'Should keep input and wrapper click callbacks after %s',
    async activation => {
      const onClick = vi.fn();
      const inputOnClick = vi.fn();
      render(
        <Radio readOnly onClick={onClick} inputProps={{ onClick: inputOnClick }}>
          Choice
        </Radio>
      );

      await activate(screen.getByRole('radio') as HTMLInputElement, activation);

      expect(inputOnClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(activation === 'label' ? 2 : 1);
    }
  );

  it('Should preserve native mutual exclusion for independent radios sharing a name', async () => {
    const renderRadios = (readOnly: boolean) => (
      <form data-testid="form">
        <Radio name="choice" value="first" defaultChecked>
          First
        </Radio>
        <Radio name="choice" value="second" readOnly={readOnly}>
          Choice
        </Radio>
      </form>
    );
    const { rerender } = render(renderRadios(true));
    const first = screen.getByRole('radio', { name: 'First' }) as HTMLInputElement;
    const second = screen.getByRole('radio', { name: 'Choice' }) as HTMLInputElement;
    const form = screen.getByTestId('form') as HTMLFormElement;

    await activate(second, 'input');
    expect(first.checked).to.equal(true);
    expect(second.checked).to.equal(false);
    expect(new FormData(form).get('choice')).to.equal('first');

    rerender(renderRadios(false));
    await activate(second, 'input');
    expect(first.checked).to.equal(false);
    expect(second.checked).to.equal(true);
    expect(new FormData(form).get('choice')).to.equal('second');

    await activate(first, 'input');
    expect(first.checked).to.equal(true);
    expect(second.checked).to.equal(false);
    expect(new FormData(form).get('choice')).to.equal('first');
  });
});
