import React from 'react';
import TagInput from '../index';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/utils';

import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
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
    const onCreate = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Enter" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Space" ', () => {
    const onCreate = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Space" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ' ' });
    expect(onCreate).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Comma" ', () => {
    const onCreate = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Comma" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ',' });
    expect(onCreate).to.have.been.calledWith(['abc']);
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
    const onCreate = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc ' } });
    fireEvent.keyDown(input, { key: ' ' });
    fireEvent.keyDown(input, { key: 'Comma' });

    expect(onCreate).to.not.called;

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).to.calledOnce;
  });

  it('Should call `onChange` with empty array when clicking "Clear" button', () => {
    const onChange = sinon.spy();
    render(<TagInput value={['New tag']} onChange={onChange} />);

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onChange).to.have.been.calledWith([]);
  });

  it('Should not create tag while text composing', () => {
    const onCreate = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreate} creatable trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = screen.getByRole('textbox');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'a' } });

    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });

    expect(onCreate).to.not.called;

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).to.calledOnce;
  });

  it('Should call `onTagRemove` callback', () => {
    const onTagRemove = sinon.spy();
    render(<TagInput defaultValue={['New tag']} onTagRemove={onTagRemove} />);
    fireEvent.click(screen.getAllByRole('button', { name: /Remove/i })[0]);

    expect(onTagRemove).to.have.been.calledOnce;
    expect(onTagRemove).to.have.been.calledWith('New tag');
  });
});
