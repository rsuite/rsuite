import React from 'react';
import { getTransitionEnd } from '../../Animation/utils';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import InputPicker from '..';
import TagPicker from '../../TagPicker';
import Form from '../../Form';
import Schema from '../../Schema';
import MatchMediaMock from '@test/mocks/matchmedia-mock';
import '../styles/index.scss';
import '../../TagPicker/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' }
];
const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
const completePopupTransition = (popup = screen.getByTestId('picker-popup')) =>
  fireEvent(popup, new Event(getTransitionEnd()));

describe.each([
  { name: 'InputPicker', Picker: InputPicker },
  { name: 'TagPicker', Picker: TagPicker }
])('$name native editable focus', ({ Picker }) => {
  it.each([false, true])(
    'accepts native text after option navigation (virtualized: %s)',
    async virtualized => {
      render(<Picker data={data} defaultOpen virtualized={virtualized} responsive={false} />);
      completePopupTransition();
      const input = screen.getByRole('combobox') as HTMLInputElement;
      await act(async () => {
        input.focus();
        await userEvent.keyboard('{ArrowDown}');
      });
      expect(input).to.have.focus;
      expect(input).to.have.attr(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Alpha' }).id
      );
      await act(async () => {
        await userEvent.keyboard('b');
      });
      expect(input.value).to.equal('b');
      expect(input).to.have.focus;
      expect(screen.queryByRole('option', { name: 'Alpha' })).to.be.null;
      expect(input).to.have.attr(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Beta' }).id
      );
    }
  );

  it('keeps input focus across virtual windows and wrap, then filters the logical selection', async () => {
    const options = Array.from({ length: 1000 }, (_, index) => ({
      label: `Option ${index + 1}`,
      value: index + 1
    }));
    render(<Picker data={options} defaultOpen virtualized responsive={false} />);
    completePopupTransition();
    const input = screen.getByRole('combobox') as HTMLInputElement;
    await act(async () => {
      input.focus();
    });
    for (let index = 0; index < 20; index++) {
      await act(async () => {
        await userEvent.keyboard('{ArrowDown}');
      });
    }
    expect(input).to.have.focus;
    expect(input).to.have.attr(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Option 20' }).id
    );
    for (let index = 0; index < 20; index++) {
      await act(async () => {
        await userEvent.keyboard('{ArrowUp}');
      });
    }
    await waitFor(() =>
      expect(input).to.have.attr(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Option 1000' }).id
      )
    );
    expect(input).to.have.focus;
    await act(async () => {
      await userEvent.keyboard('Option 42');
    });
    expect(input.value).to.equal('Option 42');
    expect(input).to.have.focus;
    await waitFor(() =>
      expect(input).to.have.attr(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Option 42' }).id
      )
    );
  });

  it('restores the mounted active descendant when a controlled picker reopens during exit', async () => {
    const onExit = vi.fn();
    const onExited = vi.fn();
    const options = [
      { label: 'Zero', value: 0 },
      { label: 'Alpha', value: 'a' }
    ];
    const Wrapper = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <Picker
          data={options}
          value={Picker === TagPicker ? [0] : 0}
          open={open}
          onClose={() => setOpen(false)}
          onExit={() => {
            onExit();
            setOpen(true);
          }}
          onExited={onExited}
        />
      );
    };
    render(<Wrapper />);
    completePopupTransition();
    const input = screen.getByRole('combobox');
    const option = document.querySelector('.rs-picker-listbox [data-key="0"]') as HTMLElement;
    expect(input).to.have.attr('aria-activedescendant', option.id);
    await act(async () => {
      input.focus();
    });
    await act(async () => {
      await userEvent.keyboard('{Escape}');
    });
    expect(onExit).toHaveBeenCalled();
    expect(document.querySelector('.rs-picker-listbox [data-key="0"]')).to.equal(option);
    expect(input).to.have.attr('aria-expanded', 'true');
    expect(input).to.have.attr('aria-activedescendant', option.id);
    expect(onExited).not.toHaveBeenCalled();
  });

  it('moves Tab past the closed picker without a delayed focus restoration', async () => {
    const onExited = vi.fn();
    render(
      <>
        <Picker data={data} defaultOpen responsive={false} onExited={onExited} />
        <button>Next control</button>
      </>
    );
    completePopupTransition();
    const popup = screen.getByTestId('picker-popup');
    const input = screen.getByRole('combobox');
    const next = screen.getByRole('button', { name: 'Next control' });
    await act(async () => {
      input.focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    await act(() => userEvent.keyboard('{Tab}'));
    completePopupTransition(popup);
    expect(onExited).toHaveBeenCalledTimes(1);
    await act(async () => {
      await nextFrame();
      await nextFrame();
    });
    expect(next).to.have.focus;
    expect(input).to.have.attr('aria-expanded', 'false');
  });

  it('keeps the responsive dialog search input focused through native navigation, typing and selection', async () => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    const onChange = vi.fn();
    let unmount: (() => void) | undefined;
    try {
      Object.assign(window, { innerWidth: 390 });
      window.dispatchEvent(new Event('resize'));
      unmount = render(
        <Picker data={data} responsive onChange={onChange} aria-label="Country" />
      ).unmount;
      const trigger = screen.getByRole('combobox', { name: 'Country' });
      await act(async () => {
        trigger.focus();
        await userEvent.keyboard('{Enter}');
      });
      const input = within(screen.getByRole('dialog', { name: 'Country' })).getByRole('combobox', {
        name: 'Country'
      });
      await waitFor(() => expect(input).to.have.focus);
      await act(async () => {
        await userEvent.keyboard('{ArrowDown}');
      });
      expect(input).to.have.focus;
      expect(input).to.have.attr(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Alpha' }).id
      );
      await act(async () => {
        await userEvent.keyboard('b');
      });
      expect(input).to.have.value('b');
      expect(input).to.have.focus;
      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(
        Picker === TagPicker ? ['b'] : 'b',
        expect.anything()
      );
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      if (Picker === TagPicker) expect(input).to.have.focus;
      else await waitFor(() => expect(trigger).to.have.focus);
    } finally {
      unmount?.();
      media.clear();
      Object.assign(window, { innerWidth: originalWidth });
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: originalMatchMedia
      });
    }
  });

  it('labels and tabs through the actual Form input and validates once on blur', async () => {
    const onBlur = vi.fn();
    const onCheck = vi.fn();
    const model = Schema.Model({
      country: Schema.Types.StringType().isRequired('Required country')
    });
    render(
      <>
        <Form model={model} checkTrigger="blur" onCheck={onCheck}>
          <Form.Group controlId="country">
            <Form.ControlLabel>Country</Form.ControlLabel>
            <Form.Control name="country" accepter={Picker} data={data} onBlur={onBlur} />
          </Form.Group>
        </Form>
        <button>Next control</button>
      </>
    );
    await userEvent.click(screen.getByText('Country', { selector: 'label' }));
    const input = screen.getByRole('combobox', { name: 'Country' });
    expect(input).to.have.focus;
    await act(async () => {
      await userEvent.keyboard('{Tab}');
    });
    expect(screen.getByRole('button', { name: 'Next control' })).to.have.focus;
    expect(onBlur).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(onCheck).toHaveBeenCalledExactlyOnceWith({ country: 'Required country' })
    );
  });

  it('preserves focus transferred by onExited after the transition completes', async () => {
    const onExited = vi.fn(() => screen.getByRole('button', { name: 'Next control' }).focus());
    render(
      <>
        <Picker data={data} defaultOpen virtualized onExited={onExited} />
        <button>Next control</button>
      </>
    );
    completePopupTransition();
    const popup = screen.getByTestId('picker-popup');
    await act(async () => {
      screen.getByRole('combobox').focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    await act(() => userEvent.keyboard('{Escape}'));
    completePopupTransition(popup);
    expect(onExited).toHaveBeenCalledTimes(1);
    await act(async () => {
      await nextFrame();
      await nextFrame();
    });
    expect(screen.getByRole('button', { name: 'Next control' })).to.have.focus;
  });

  it('preserves focus transferred by an onClean callback', async () => {
    render(
      <>
        <Picker
          data={data}
          defaultValue={Picker === TagPicker ? ['a'] : 'a'}
          onClean={() => screen.getByRole('button', { name: 'Next control' }).focus()}
        />
        <button>Next control</button>
      </>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    await act(async () => {
      await nextFrame();
      await nextFrame();
    });
    expect(screen.getByRole('button', { name: 'Next control' })).to.have.focus;
  });
});

describe('InputPicker native focus owner and custom opener', () => {
  it('preserves focus transferred by an onSelect callback after Enter closes the popup', async () => {
    const onExited = vi.fn();
    render(
      <>
        <InputPicker
          data={data}
          defaultOpen
          onSelect={() => screen.getByRole('button', { name: 'Next control' }).focus()}
          onExited={onExited}
        />
        <button>Next control</button>
      </>
    );
    completePopupTransition();
    const popup = screen.getByTestId('picker-popup');
    await act(async () => {
      screen.getByRole('combobox').focus();
      await userEvent.keyboard('{ArrowDown}');
    });
    await act(() => userEvent.keyboard('{Enter}'));
    completePopupTransition(popup);
    expect(onExited).toHaveBeenCalledTimes(1);
    await act(async () => {
      await nextFrame();
      await nextFrame();
    });
    expect(screen.getByRole('button', { name: 'Next control' })).to.have.focus;
    expect(screen.getByRole('combobox')).to.have.attr('aria-expanded', 'false');
  });

  it('labels the real input and keeps a custom button opener from submitting its form', async () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <label htmlFor="country">Country</label>
        <InputPicker id="country" data={data} toggleAs="button" />
        <button>Next control</button>
      </form>
    );
    await userEvent.click(screen.getByText('Country', { selector: 'label' }));
    expect(screen.getByRole('combobox')).to.have.focus;
    const opener = document.querySelector('.rs-picker-toggle') as HTMLButtonElement;
    expect(opener.type).to.equal('button');
    await userEvent.click(screen.getByTestId('caret'));
    expect(screen.getByRole('combobox')).to.have.focus;
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('returns clear-button focus to the actual editable input', async () => {
    render(<InputPicker data={data} defaultValue="a" />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByRole('combobox')).to.have.focus;
    await act(async () => {
      await userEvent.keyboard('b');
    });
    expect(screen.getByRole('combobox')).to.have.value('b');
  });
});
