import React from 'react';
import getTransitionEnd from 'dom-lib/getTransitionEnd';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import {
  data,
  initialTarget,
  menu,
  mountPicker,
  pickerCases,
  pickerElement,
  selectedValue
} from './VirtualizedPickerTestSupport';

async function expectFocus(value: number, focused = true) {
  await waitFor(() => {
    const option = menu().getByRole('option', { name: `Option ${value}` });
    const combobox = screen.getByRole('combobox');
    if (focused) expect(combobox.tagName === 'INPUT' ? combobox : option).to.have.focus;
    const activeId = combobox.getAttribute('aria-activedescendant');
    expect(activeId).toBe(option.id);
    expect(document.getElementById(activeId!)).toBe(option);
    expect(document.getElementById(combobox.getAttribute('aria-controls')!)).to.contain(option);
    expect(
      Array.from(document.querySelectorAll('[id]')).filter(node => node.id === activeId)
    ).toHaveLength(1);
    const bounds = option.getBoundingClientRect();
    const viewport = option.closest('.rs-virt-list')!.getBoundingClientRect();
    expect(bounds.height).toBeGreaterThan(0);
    expect(Math.round(bounds.top)).toBeGreaterThanOrEqual(Math.round(viewport.top));
    expect(Math.round(bounds.bottom)).toBeLessThanOrEqual(Math.round(viewport.bottom));
  });
}

// Focus the initial control once; subsequent native keys follow the current focus owner.
describe.each(pickerCases)('$name virtualized native keyboard', testCase => {
  it('keeps focus through consecutive arrows beyond the mounted rows and selects the intended item', async () => {
    const { onChange, onEntered } = mountPicker(testCase);
    fireEvent(screen.getByTestId('picker-popup'), new Event(getTransitionEnd()));
    expect(onEntered).toHaveBeenCalledTimes(1);
    await act(async () => {
      initialTarget().focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    await expectFocus(1);

    await act(async () => {
      await userEvent.keyboard('{ArrowUp}');
    });
    await expectFocus(1000);
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
    await expectFocus(1);

    for (let index = 1; index < 20; index++) {
      await act(async () => {
        await userEvent.keyboard('{ArrowDown}');
      });
      await expectFocus(index + 1);
    }
    await expectFocus(20);

    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      selectedValue(testCase, 20),
      expect.anything()
    );
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;

    if (testCase.multiple) {
      expect(menu().getByRole('option', { name: 'Option 20' })).to.have.attribute(
        'aria-selected',
        'true'
      );
      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      expect(onChange).toHaveBeenLastCalledWith([], expect.anything());
      expect(onChange).toHaveBeenCalledTimes(2);
      await expectFocus(20);
      expect(menu().getByRole('option', { name: 'Option 20' })).to.have.attribute(
        'aria-selected',
        'false'
      );
    } else {
      expect(screen.getByRole('combobox')).to.have.focus;
    }
  });

  it('jumps over disabled rows when every initially mounted option is disabled', async () => {
    const { onChange, onEntered } = mountPicker(testCase, {
      disabledItemValues: Array.from({ length: 12 }, (_, index) => index + 1)
    });
    fireEvent(screen.getByTestId('picker-popup'), new Event(getTransitionEnd()));
    expect(onEntered).toHaveBeenCalledTimes(1);
    await act(async () => {
      initialTarget().focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    await expectFocus(13);
    await act(async () => {
      await userEvent.keyboard('{Enter}');
    });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      selectedValue(testCase, 13),
      expect.anything()
    );
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
  });

  it('leaves focus and the active option intact when another control cancels a pending request', async () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const onEntered = vi.fn();
    const onChange = vi.fn();
    render(
      <div onKeyDown={() => buttonRef.current?.focus()}>
        {pickerElement(testCase, {
          open: true,
          defaultValue: selectedValue(testCase, 1),
          disabledItemValues: data
            .map(item => item.value)
            .filter(value => value !== 1 && value !== 500),
          onEntered,
          onChange
        })}
        <button ref={buttonRef}>Next control</button>
      </div>
    );
    fireEvent(screen.getByTestId('picker-popup'), new Event(getTransitionEnd()));
    expect(onEntered).toHaveBeenCalledTimes(1);
    await act(async () => {
      (testCase.editable
        ? initialTarget()
        : menu().getByRole('option', { name: 'Option 1' })
      ).focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    expect(screen.getByRole('button', { name: 'Next control' })).to.have.focus;
    await expectFocus(1, false);
    expect(menu().queryByRole('option', { name: 'Option 500' })).toBeNull();
    expect(document.querySelector('.rs-virt-list')?.scrollTop).toBe(0);
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each(['removed', 'disabled'])(
    'cancels a pending request when its option is %s before commit',
    async change => {
      const onEntered = vi.fn();
      const onChange = vi.fn();
      function Fixture() {
        const [changed, setChanged] = React.useState(false);
        return (
          <div onKeyDown={event => event.key === 'ArrowUp' && setChanged(true)}>
            {pickerElement(testCase, {
              defaultValue: selectedValue(testCase, 1),
              data: changed && change === 'removed' ? data.slice(0, 20) : data,
              disabledItemValues: changed && change === 'disabled' ? [1000] : [],
              onEntered,
              onChange
            })}
          </div>
        );
      }
      render(<Fixture />);
      fireEvent(screen.getByTestId('picker-popup'), new Event(getTransitionEnd()));
      expect(onEntered).toHaveBeenCalledTimes(1);
      await act(async () => {
        (testCase.editable
          ? initialTarget()
          : menu().getByRole('option', { name: 'Option 1' })
        ).focus();
        await userEvent.keyboard('{ArrowUp}');
      });
      await expectFocus(1);
      expect(menu().getByRole('option', { name: 'Option 1' })).to.have.attribute(
        'aria-setsize',
        change === 'removed' ? '20' : '1000'
      );
      expect(document.querySelector('.rs-virt-list')?.scrollTop).toBe(0);
      expect(onChange).not.toHaveBeenCalled();

      await act(() => userEvent.keyboard('{ArrowDown}'));
      await expectFocus(2);
      await act(() => userEvent.keyboard('{Enter}'));
      expect(onChange).toHaveBeenCalledExactlyOnceWith(
        testCase.multiple ? [1, 2] : 2,
        expect.anything()
      );
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    }
  );
});
