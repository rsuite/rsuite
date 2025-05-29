import React from 'react';
import TagInput from '../index';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/cases';
import { PickerHandle } from '@/internals/Picker';

describe('TagInput', () => {
  testStandardProps(<TagInput />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });

  testControlledUnControlled(TagInput, {
    componentProps: { defaultOpen: true },
    value: ['Eugenia'],
    defaultValue: ['Kariane'],
    changedValue: ['Louisa'],
    simulateEvent: {
      changeValue: (prevValue: any) => {
        const input = screen.getByRole('textbox');

        userEvent.type(input, 'newtag{enter}');
        return { changedValue: [...prevValue, 'newtag'] };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute(
        'value',
        value.toString()
      );
    }
  });

  testFormControl(TagInput, {
    value: ['Eugenia'],
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should create a tag', () => {
    const onCreate = vi.fn();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Enter" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).toHaveBeenCalledWith(
      ['abc'],
      expect.objectContaining({
        label: 'abc',
        value: 'abc'
      }),
      expect.any(Object)
    );
  });

  it('Should create a tag by tirgger="Space" ', () => {
    const onCreate = vi.fn();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Space" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ' ' });
    expect(onCreate).toHaveBeenCalledWith(
      ['abc'],
      expect.objectContaining({
        label: 'abc',
        value: 'abc'
      }),
      expect.any(Object)
    );
  });

  it('Should create a tag by tirgger="Comma" ', () => {
    const onCreate = vi.fn();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Comma" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ',' });
    expect(onCreate).toHaveBeenCalledWith(
      ['abc'],
      expect.objectContaining({
        label: 'abc',
        value: 'abc'
      }),
      expect.any(Object)
    );
  });

  it('Should render 2 tags by events', () => {
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('abc', { selector: '.rs-tag-text' })).to.exist;
    expect(screen.getByText('a', { selector: '.rs-tag-text' })).to.exist;
  });

  it('Should render 2 tags by value', () => {
    render(<TagInput value={['abc', '123']} trigger="Enter" />);

    expect(screen.getByText('abc', { selector: '.rs-tag-text' })).to.exist;
    expect(screen.getByText('123', { selector: '.rs-tag-text' })).to.exist;
  });

  it('Should render 2 tags by defaultValue', () => {
    render(<TagInput defaultValue={['abc', '123']} trigger="Enter" />);

    expect(screen.getByText('abc', { selector: '.rs-tag-text' })).to.exist;
    expect(screen.getByText('123', { selector: '.rs-tag-text' })).to.exist;
  });

  it('Should create a label only through `Enter`', () => {
    const onCreate = vi.fn();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc ' } });
    fireEvent.keyDown(input, { key: ' ' });
    fireEvent.keyDown(input, { key: 'Comma' });

    expect(onCreate).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it('Should call `onChange` with empty array when clicking "Clear" button', () => {
    const onChange = vi.fn();
    render(<TagInput value={['New tag']} onChange={onChange} />);

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onChange).toHaveBeenCalledWith([], expect.any(Object));
  });

  it('Should not create tag while text composing', () => {
    const onCreate = vi.fn();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'a' } });

    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });

    expect(onCreate).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it('Should call `onTagRemove` callback', () => {
    const onTagRemove = vi.fn();
    render(<TagInput defaultValue={['New tag']} onTagRemove={onTagRemove} />);
    fireEvent.click(screen.getAllByRole('button', { name: /Remove/i })[0]);

    expect(onTagRemove).toHaveBeenCalledTimes(1);
    expect(onTagRemove).toHaveBeenCalledWith('New tag', expect.any(Object));
  });
});
