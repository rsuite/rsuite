import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import MatchMediaMock from '@test/mocks/matchmedia-mock';
import InputPicker from '..';
import TagPicker from '../../TagPicker';
import TagInput from '../../TagInput';
import CustomProvider from '../../CustomProvider';
import Form from '../../Form';

const data = [
  { value: 0, label: 'Zero' },
  { value: 'beta', label: 'Beta' },
  { value: '', label: 'Empty' }
];
const components: [string, React.ElementType, boolean][] = [
  ['InputPicker', InputPicker, false],
  ['TagPicker', TagPicker, true],
  ['TagInput', TagInput, true]
];

function entries() {
  return new FormData(screen.getByRole('form', { name: 'Settings' }) as HTMLFormElement);
}

describe.each(components)('%s native form value', (name, Picker, multiple) => {
  const initial = name === 'TagInput' ? ['0', 'beta'] : multiple ? [0, 'beta'] : 0;
  const serialized = multiple ? '0,beta' : '0';
  const options = name === 'TagInput' ? {} : { data };

  function fixture(props: Record<string, unknown> = {}) {
    return (
      <CustomProvider reduceMotion>
        <form aria-label="Settings">
          <Picker name="choice" defaultValue={initial} responsive={false} {...options} {...props} />
        </form>
      </CustomProvider>
    );
  }

  it('submits the selection exactly once, including zero and multiple values', () => {
    render(fixture());
    expect([...entries()]).toEqual([['choice', serialized]]);
    expect(screen.getByTestId('picker')).to.have.attribute('name', 'choice');
  });

  it('keeps an explicitly empty selection in the form', () => {
    render(fixture({ value: multiple ? [''] : '' }));
    expect(entries().getAll('choice')).toEqual(['']);
  });

  it('submits an empty value when no selection exists', () => {
    render(fixture({ defaultValue: undefined }));
    expect(entries().getAll('choice')).toEqual(['']);
  });

  it('submits read-only and loading selections', () => {
    const { rerender } = render(fixture({ readOnly: true }));
    expect(entries().getAll('choice')).toEqual([serialized]);
    rerender(fixture({ loading: true }));
    expect(entries().getAll('choice')).toEqual([serialized]);
  });

  it('omits disabled selections and restores the latest controlled value when enabled', () => {
    const onChange = vi.fn();
    const { rerender } = render(fixture({ value: initial, onChange }));
    expect(entries().getAll('choice')).toEqual([serialized]);
    rerender(fixture({ value: multiple ? ['beta'] : 'beta', disabled: true, onChange }));
    expect(entries().has('choice')).toBe(false);
    rerender(fixture({ value: multiple ? ['beta'] : 'beta', onChange }));
    expect(entries().getAll('choice')).toEqual(['beta']);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('honors disabled fieldsets', () => {
    render(
      <form aria-label="Settings">
        <fieldset disabled>
          <Picker name="choice" value={initial} {...options} />
        </fieldset>
      </form>
    );
    expect([...entries()]).toEqual([]);
  });

  it('changes and removes the native field name', () => {
    const { rerender } = render(fixture());
    rerender(fixture({ name: 'renamed' }));
    expect([...entries()]).toEqual([['renamed', serialized]]);
    rerender(fixture({ name: undefined }));
    expect([...entries()]).toEqual([]);
  });

  it('uses component provider defaults and instance overrides for the field name', () => {
    const defaults = {
      InputPicker: { defaultProps: { name: 'provided' } },
      TagPicker: { defaultProps: { name: 'provided' } },
      TagInput: { defaultProps: { name: 'provided' } }
    };
    const form = (props: { name?: string }) => (
      <CustomProvider components={defaults}>
        <form aria-label="Settings">
          <Picker value={initial} {...options} {...props} />
        </form>
      </CustomProvider>
    );
    const { rerender } = render(form({}));
    expect([...entries()]).toEqual([['provided', serialized]]);
    rerender(form({ name: 'instance' }));
    expect([...entries()]).toEqual([['instance', serialized]]);
  });

  it('submits the value supplied by Form.Control with its field name', () => {
    render(
      <Form aria-label="Settings" formDefaultValue={{ choice: initial }}>
        <Form.Group controlId="choice">
          <Form.ControlLabel>Choice</Form.ControlLabel>
          <Form.Control name="choice" accepter={Picker} {...options} />
        </Form.Group>
      </Form>
    );
    expect(entries().getAll('choice')).toEqual([serialized]);
  });

  it('keeps native search typing out of the submitted selection', async () => {
    const onSearch = vi.fn();
    render(fixture({ onSearch }));
    const input = screen.getByRole(name === 'TagInput' ? 'textbox' : 'combobox');
    await userEvent.click(input);
    await userEvent.keyboard('beta');
    expect(input).to.have.value('beta');
    expect(input).not.to.have.attribute('name');
    expect(onSearch).toHaveBeenCalled();
    expect(onSearch.mock.calls.at(-1)?.[1].nativeEvent.isTrusted).toBe(true);
    expect(entries().getAll('choice')).toEqual([serialized]);
  });

  it('submits the cleared value after an uncontrolled clear', async () => {
    const onChange = vi.fn();
    render(fixture({ onChange }));
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(entries().getAll('choice')).toEqual(['']);
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('preserves a controlled selection when the parent declines a clear', async () => {
    const onChange = vi.fn();
    render(fixture({ value: initial, onChange }));
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(entries().getAll('choice')).toEqual([serialized]);
    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe.each([
  ['InputPicker', InputPicker, false],
  ['TagPicker', TagPicker, true]
] as const)('%s responsive native form value', (_, Picker, multiple) => {
  it('keeps the named selection in the form while typing in the mobile portal', async () => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    let unmount: (() => void) | undefined;
    try {
      Object.assign(window, { innerWidth: 390 });
      window.dispatchEvent(new Event('resize'));
      const result = render(
        <CustomProvider reduceMotion>
          <form aria-label="Settings">
            <Picker
              name="choice"
              aria-label="Choices"
              data={data}
              defaultValue={multiple ? [0] : 0}
              responsive
            />
          </form>
        </CustomProvider>
      );
      unmount = result.unmount;
      fireEvent.click(screen.getByRole('combobox', { name: 'Choices' }));
      const dialog = screen.getByRole('dialog', { name: 'Choices' });
      const input = within(dialog).getByRole('combobox', { name: 'Choices' });
      await act(async () => {
        input.focus();
        await userEvent.keyboard('beta');
      });
      expect(input).to.have.value('beta');
      expect(input).not.to.have.attribute('name');
      expect(entries().getAll('choice')).toEqual(['0']);
    } finally {
      unmount?.();
      media.clear();
      window.matchMedia = originalMatchMedia;
      Object.assign(window, { innerWidth: originalWidth });
      window.dispatchEvent(new Event('resize'));
    }
  });
});

it('submits newly created TagInput values', async () => {
  render(
    <form aria-label="Settings">
      <TagInput name="choice" defaultValue={['first']} />
    </form>
  );
  await userEvent.click(screen.getByRole('textbox'));
  await userEvent.keyboard('second{Enter}');
  expect(entries().getAll('choice')).toEqual(['first,second']);
});
