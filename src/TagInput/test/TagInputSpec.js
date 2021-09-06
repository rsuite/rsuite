import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render } from '@test/testUtils';

import TagInput from '../index';

describe('TagInput', () => {
  it('Should create a tag', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable />);
    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);
    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: 'Enter' });

    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Space" ', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Space" />);
    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);
    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: ' ' });
    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should create a tag by tirgger="Comma" ', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable trigger="Comma" />);

    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);
    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: ',' });
    expect(onCreateSpy).to.have.been.calledWith(['abc']);
  });

  it('Should render 2 tags by events', () => {
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} />);
    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);
    input.value = 'abc';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: 'Enter' });

    ReactTestUtils.Simulate.click(picker);
    input.value = 'a';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: 'Enter' });

    assert.equal(picker.querySelectorAll('.rs-tag').length, 2);
    assert.equal(picker.querySelectorAll('.rs-tag')[0].innerText, 'abc');
    assert.equal(picker.querySelectorAll('.rs-tag')[1].innerText, 'a');
  });

  it('Should render 2 tags by value', () => {
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} value={['abc', '123']} />);
    const picker = inputRef.current.root;

    assert.equal(picker.querySelectorAll('.rs-tag').length, 2);
    assert.equal(picker.querySelectorAll('.rs-tag')[0].innerText, 'abc');
    assert.equal(picker.querySelectorAll('.rs-tag')[1].innerText, '123');
  });

  it('Should render 2 tags by defaultValue', () => {
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} defaultValue={['abc', '123']} />);
    const picker = inputRef.current.root;

    assert.equal(picker.querySelectorAll('.rs-tag').length, 2);
    assert.equal(picker.querySelectorAll('.rs-tag')[0].innerText, 'abc');
    assert.equal(picker.querySelectorAll('.rs-tag')[1].innerText, '123');
  });

  it('Should create a label only through `Enter`', () => {
    const onCreateSpy = sinon.spy();
    const inputRef = React.createRef();

    render(<TagInput ref={inputRef} onCreate={onCreateSpy} creatable />);
    const picker = inputRef.current.root;
    const input = picker.querySelector('.rs-picker-search input');

    ReactTestUtils.Simulate.click(picker);

    input.value = 'abc ';
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, { key: ' ' });
    ReactTestUtils.Simulate.keyDown(input, { key: 'Comma' });

    assert.isTrue(onCreateSpy.notCalled);

    ReactTestUtils.Simulate.keyDown(input, { key: 'Enter' });

    assert.isTrue(onCreateSpy.calledOnce);
  });
});
