import React from 'react';
import TagInput from '../index';
import { fireEvent, render } from '@testing-library/react';

describe('TagInput', () => {
  it('Should create a tag', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable />);

    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Space" ', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Space" />);
    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ' ' });
    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Comma" ', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Comma" />);

    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    fireEvent.click(picker);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: ',' });
    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should render 2 tags by events', () => {
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} />);
    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

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
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} value={['abc', '123']} />);
    const picker = inputRef.current.root;

    expect(picker.querySelectorAll('.rs-tag')).to.lengthOf(2);
    expect(picker.querySelectorAll('.rs-tag')[0]).to.text('abc');
    expect(picker.querySelectorAll('.rs-tag')[1]).to.text('123');
  });

  it('Should render 2 tags by defaultValue', () => {
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} defaultValue={['abc', '123']} />);
    const picker = inputRef.current.root;

    expect(picker.querySelectorAll('.rs-tag')).to.lengthOf(2);
    expect(picker.querySelectorAll('.rs-tag')[0]).to.text('abc');
    expect(picker.querySelectorAll('.rs-tag')[1]).to.text('123');
  });

  it('Should create a label only through `Enter`', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable />);
    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    fireEvent.click(picker);

    fireEvent.change(input, { target: { value: 'abc ' } });
    fireEvent.keyDown(input, { key: ' ' });
    fireEvent.keyDown(input, { key: 'Comma' });

    expect(onCreateSpy).to.not.called;

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreateSpy).to.calledOnce;
  });
});
