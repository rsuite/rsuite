import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import MatchMediaMock from '@test/mocks/matchmedia-mock';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import TagInput from '../../../TagInput';
import AutoComplete from '../../../AutoComplete';
import Input from '../../../Input';
import Form from '../../../Form';
import CustomProvider from '../../../CustomProvider';

const data = [
  { value: 0, label: 'Zero' },
  { value: 'beta', label: 'Beta' }
];
const pickers: [string, React.ElementType, boolean][] = [
  ['SelectPicker', SelectPicker, false],
  ['CheckPicker', CheckPicker, true],
  ['TreePicker', TreePicker, false],
  ['CheckTreePicker', CheckTreePicker, true],
  ['Cascader', Cascader, false],
  ['MultiCascader', MultiCascader, true],
  ['InputPicker', InputPicker, false],
  ['TagPicker', TagPicker, true],
  ['TagInput', TagInput, true]
];

function entries(id: string) {
  return [...new FormData(document.getElementById(id) as HTMLFormElement)];
}

describe.each(pickers)('%s explicit form owner', (name, Picker, multiple) => {
  const initial = name === 'TagInput' ? ['0', 'beta'] : multiple ? [0, 'beta'] : 0;
  const serialized = multiple ? '0,beta' : '0';
  const options = name === 'TagInput' ? {} : { data };

  it('submits a named selection from outside the form, including zero and multiple values', () => {
    render(
      <>
        <form id="owner" />
        <Picker name="choice" form="owner" defaultValue={initial} {...options} />
      </>
    );
    expect(entries('owner')).toEqual([['choice', serialized]]);
    expect((screen.getByTestId('picker-toggle-input') as HTMLInputElement).form).toBe(
      document.getElementById('owner')
    );
  });

  it('reassigns the owner and falls back to its ancestor only after removing form', () => {
    const onChange = vi.fn();
    const fixture = (
      form: string | undefined,
      value: string | number | (string | number)[] = initial
    ) => (
      <>
        <form id="first" />
        <form id="second" />
        <form id="ancestor">
          <Picker name="choice" form={form} value={value} onChange={onChange} {...options} />
        </form>
      </>
    );
    const { rerender } = render(fixture('first'));
    expect(entries('first')).toEqual([['choice', serialized]]);
    expect(entries('ancestor')).toEqual([]);
    rerender(fixture('second', multiple ? ['beta'] : 'beta'));
    expect(entries('first')).toEqual([]);
    expect(entries('second')).toEqual([['choice', 'beta']]);
    expect(entries('ancestor')).toEqual([]);
    rerender(fixture('missing'));
    expect(entries('first')).toEqual([]);
    expect(entries('second')).toEqual([]);
    expect(entries('ancestor')).toEqual([]);
    rerender(fixture(undefined));
    expect(entries('ancestor')).toEqual([['choice', serialized]]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('preserves disabled fieldsets, disabled inputs and read-only or loading submission', () => {
    const fixture = (props: Record<string, unknown>, fieldsetDisabled = false) => (
      <>
        <form id="owner" />
        <fieldset disabled={fieldsetDisabled}>
          <Picker name="choice" form="owner" value={initial} {...options} {...props} />
        </fieldset>
      </>
    );
    const { rerender } = render(fixture({ disabled: true }));
    expect(entries('owner')).toEqual([]);
    rerender(fixture({ readOnly: true }));
    expect(entries('owner')).toEqual([['choice', serialized]]);
    rerender(fixture({ loading: true }));
    expect(entries('owner')).toEqual([['choice', serialized]]);
    rerender(fixture({}, true));
    expect(entries('owner')).toEqual([]);
    rerender(fixture({}));
    expect(entries('owner')).toEqual([['choice', serialized]]);
  });
});

it.each([
  ['Input', Input],
  ['AutoComplete', AutoComplete]
] as const)('preserves existing %s native form association', (_, Component) => {
  render(
    <>
      <form id="owner" />
      <Component name="choice" form="owner" defaultValue="beta" data={[]} />
    </>
  );
  expect(entries('owner')).toEqual([['choice', 'beta']]);
});

it('applies provider form defaults and instance overrides', () => {
  const fixture = (form?: string) => (
    <CustomProvider components={{ SelectPicker: { defaultProps: { form: 'first' } } }}>
      <form id="first" />
      <form id="second" />
      <SelectPicker<string | number>
        name="choice"
        data={data}
        value={0}
        {...(form ? { form } : {})}
      />
    </CustomProvider>
  );
  const { rerender } = render(fixture());
  expect(entries('first')).toEqual([['choice', '0']]);
  rerender(fixture('second'));
  expect(entries('first')).toEqual([]);
  expect(entries('second')).toEqual([['choice', '0']]);
});

it('lets Form.Control associate its native value with a separate form', () => {
  render(
    <>
      <form id="owner" />
      <Form id="ancestor" formDefaultValue={{ choice: 0 }}>
        <Form.Control name="choice" accepter={SelectPicker} data={data} form="owner" />
      </Form>
    </>
  );
  expect(entries('ancestor')).toEqual([]);
  expect(entries('owner')).toEqual([['choice', '0']]);
});

it('submits exactly one value with a custom native button toggle', () => {
  render(
    <>
      <form id="owner" />
      <SelectPicker<string | number>
        toggleAs="button"
        name="choice"
        form="owner"
        data={data}
        value={0}
      />
    </>
  );
  expect(screen.getByRole('combobox').tagName).toBe('BUTTON');
  expect(entries('owner')).toEqual([['choice', '0']]);
});

it.each([
  ['InputPicker', InputPicker, false],
  ['TagPicker', TagPicker, true],
  ['TagInput', TagInput, true]
] as [string, React.ElementType, boolean][])(
  'keeps %s search text out of the external form',
  async (name, Picker, multiple) => {
    const onSearch = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <form id="owner" />
        <Picker
          name="choice"
          form="owner"
          defaultValue={multiple ? ['beta'] : 'beta'}
          data={data}
          responsive={false}
          onSearch={onSearch}
        />
      </CustomProvider>
    );
    const input = screen.getByRole(name === 'TagInput' ? 'textbox' : 'combobox');
    await userEvent.click(input);
    await userEvent.keyboard('Zero');
    expect(input).to.have.value('Zero');
    expect(input).not.to.have.attribute('name');
    expect(onSearch.mock.calls.at(-1)?.[1].nativeEvent.isTrusted).toBe(true);
    expect(entries('owner')).toEqual([['choice', 'beta']]);
  }
);

it.each([
  ['InputPicker', InputPicker, false],
  ['TagPicker', TagPicker, true]
] as [string, React.ElementType, boolean][])(
  'keeps the %s selection associated while its mobile search is portaled',
  async (_, Picker, multiple) => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    let unmount: (() => void) | undefined;
    try {
      Object.assign(window, { innerWidth: 390 });
      window.dispatchEvent(new Event('resize'));
      const mounted = render(
        <CustomProvider reduceMotion>
          <form id="owner" />
          <Picker
            name="choice"
            form="owner"
            aria-label="Choices"
            data={data}
            defaultValue={multiple ? [0] : 0}
            responsive
          />
        </CustomProvider>
      );
      unmount = mounted.unmount;
      fireEvent.click(screen.getByRole('combobox', { name: 'Choices' }));
      const dialog = screen.getByRole('dialog', { name: 'Choices' });
      const input = within(dialog).getByRole('combobox', { name: 'Choices' });
      await act(async () => {
        input.focus();
        await userEvent.keyboard('beta');
      });
      expect(input).to.have.value('beta');
      expect(input).not.to.have.attribute('name');
      expect(entries('owner')).toEqual([['choice', '0']]);
    } finally {
      unmount?.();
      media.clear();
      window.matchMedia = originalMatchMedia;
      Object.assign(window, { innerWidth: originalWidth });
      window.dispatchEvent(new Event('resize'));
    }
  }
);
