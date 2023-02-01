import React from 'react';
import TagInput from '../index';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { PickerHandle } from '../../Picker';

describe('TagInput', () => {
  it('Should create a tag', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Enter" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Space" ', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Space" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ' ' });
    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Comma" ', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Comma" />);

    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ',' });
    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should render 2 tags by events', () => {
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(picker.querySelectorAll('.rs-tag')).to.lengthOf(2);
    expect(picker.querySelectorAll('.rs-tag')[0]).to.text('abc');
    expect(picker.querySelectorAll('.rs-tag')[1]).to.text('a');
  });

  it('Should render 2 tags by value', () => {
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} value={['abc', '123']} trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;

    expect(picker.querySelectorAll('.rs-tag')).to.lengthOf(2);
    expect(picker.querySelectorAll('.rs-tag')[0]).to.text('abc');
    expect(picker.querySelectorAll('.rs-tag')[1]).to.text('123');
  });

  it('Should render 2 tags by defaultValue', () => {
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} defaultValue={['abc', '123']} trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;

    expect(picker.querySelectorAll('.rs-tag')).to.lengthOf(2);
    expect(picker.querySelectorAll('.rs-tag')[0]).to.text('abc');
    expect(picker.querySelectorAll('.rs-tag')[1]).to.text('123');
  });

  it('Should create a label only through `Enter`', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef<PickerHandle>();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Enter" />);
    const picker = (inputRef.current as PickerHandle).root as HTMLElement;
    const input = picker.querySelector('.rs-picker-search input') as HTMLElement;

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc ' } });
    fireEvent.keyDown(input, { key: ' ' });
    fireEvent.keyDown(input, { key: 'Comma' });

    expect(onCreateSpy).to.not.called;

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreateSpy).to.calledOnce;
  });

  it('Should call `onChange` with empty array when clicking "Clear" button', () => {
    const onChange = sinon.spy();
    render(<TagInput value={['New tag']} onChange={onChange} />);

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onChange).to.have.been.calledWith([]);
  });
});
