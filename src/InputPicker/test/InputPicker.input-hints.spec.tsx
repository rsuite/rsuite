import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import MatchMediaMock from '@test/mocks/matchmedia-mock';
import InputPicker from '..';
import TagPicker from '../../TagPicker';
import TagInput from '../../TagInput';
import CustomProvider from '../../CustomProvider';

type Hints = Pick<React.InputHTMLAttributes<HTMLInputElement>, 'inputMode' | 'enterKeyHint'>;
const hints: Hints = { inputMode: 'decimal', enterKeyHint: 'done' };
const data = [{ label: 'Beta', value: 'b' }];
const components = [
  { name: 'InputPicker', create: (props: Hints) => <InputPicker data={data} {...props} /> },
  { name: 'TagPicker', create: (props: Hints) => <TagPicker data={data} {...props} /> },
  { name: 'TagInput', create: (props: Hints) => <TagInput {...props} /> }
];

function editableInput(container: HTMLElement) {
  const inputs = container.querySelectorAll('input:not([aria-hidden="true"])');
  expect(inputs).to.have.length(1);
  return inputs[0] as HTMLInputElement;
}

describe.each(components)('$name input hints', ({ create }) => {
  it('forwards hints to the editable input and keeps them off the wrapper', () => {
    const { container } = render(create(hints));
    const input = editableInput(container);
    expect(input).to.have.attribute('inputmode', 'decimal');
    expect(input).to.have.attribute('enterkeyhint', 'done');
    expect(container.firstElementChild).not.to.have.attribute('inputmode');
    expect(container.firstElementChild).not.to.have.attribute('enterkeyhint');
  });

  it('updates and removes the input hints', () => {
    const { container, rerender } = render(create(hints));
    const input = editableInput(container);
    expect(input).to.have.attribute('inputmode', 'decimal');
    rerender(create({ inputMode: 'tel', enterKeyHint: 'search' }));
    expect(editableInput(container)).to.equal(input);
    expect(input).to.have.attribute('inputmode', 'tel');
    expect(input).to.have.attribute('enterkeyhint', 'search');
    rerender(create({}));
    expect(input).not.to.have.attribute('inputmode');
    expect(input).not.to.have.attribute('enterkeyhint');
  });

  it('leaves the browser hints unset by default', () => {
    const { container } = render(create({}));
    const input = editableInput(container);
    expect(input).not.to.have.attribute('inputmode');
    expect(input).not.to.have.attribute('enterkeyhint');
  });

  it('supports provider defaults and instance overrides', () => {
    const fixture = (props: Hints) => (
      <CustomProvider
        components={{
          InputPicker: { defaultProps: hints },
          TagPicker: { defaultProps: hints },
          TagInput: { defaultProps: hints }
        }}
      >
        {create(props)}
      </CustomProvider>
    );
    const { container, rerender } = render(fixture({}));
    const input = editableInput(container);
    expect(input).to.have.attribute('inputmode', 'decimal');
    expect(input).to.have.attribute('enterkeyhint', 'done');
    rerender(fixture({ inputMode: 'none', enterKeyHint: 'enter' }));
    expect(input).to.have.attribute('inputmode', 'none');
    expect(input).to.have.attribute('enterkeyhint', 'enter');
    rerender(fixture({}));
    expect(input).to.have.attribute('inputmode', 'decimal');
    expect(input).to.have.attribute('enterkeyhint', 'done');
  });
});

describe.each([
  { name: 'InputPicker', Picker: InputPicker },
  { name: 'TagPicker', Picker: TagPicker }
])('$name responsive input hints', ({ Picker }) => {
  it('routes and updates hints on the dialog search input while preserving native typing', async () => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    const onSearch = vi.fn();
    let unmount: (() => void) | undefined;
    try {
      Object.assign(window, { innerWidth: 390 });
      window.dispatchEvent(new Event('resize'));
      const fixture = (props: Hints) => (
        <CustomProvider reduceMotion>
          <Picker data={data} responsive aria-label="Choices" onSearch={onSearch} {...props} />
        </CustomProvider>
      );
      const result = render(fixture(hints));
      unmount = result.unmount;
      const opener = screen.getByRole('combobox', { name: 'Choices' });
      fireEvent.click(opener);
      const dialog = screen.getByRole('dialog', { name: 'Choices' });
      const input = within(dialog).getByRole('combobox', { name: 'Choices' });
      expect(input).to.have.attribute('inputmode', 'decimal');
      expect(input).to.have.attribute('enterkeyhint', 'done');
      expect(opener).not.to.have.attribute('inputmode');
      expect(opener).not.to.have.attribute('enterkeyhint');
      await act(async () => {
        input.focus();
        await userEvent.keyboard('b');
      });
      expect(input).to.have.value('b');
      expect(input).to.have.focus;
      expect(onSearch).toHaveBeenCalledExactlyOnceWith('b', expect.anything());
      expect(onSearch.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      result.rerender(fixture({ inputMode: 'text', enterKeyHint: 'search' }));
      expect(input).to.have.attribute('inputmode', 'text');
      expect(input).to.have.attribute('enterkeyhint', 'search');
      result.rerender(fixture({}));
      expect(input).not.to.have.attribute('inputmode');
      expect(input).not.to.have.attribute('enterkeyhint');
      expect(input).to.have.value('b');
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
});
