import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import RadioGroup from '../RadioGroup';
import Radio from '../../Radio';
import Sinon from 'sinon';

describe('RadioGroup', () => {
  testStandardProps(<RadioGroup />);

  it('Should render a radio group', () => {
    const instance = getDOMNode(
      <RadioGroup>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    assert.equal(instance.querySelectorAll('.rs-radio').length, 2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    const instance = getDOMNode(
      <RadioGroup name={name}>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    assert.equal(instance.querySelectorAll('input[name="Test"]').length, 2);
  });

  it('Should have `radio-inline` className in radio', () => {
    const instance = getDOMNode(
      <RadioGroup inline>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );

    assert.ok(instance.className.match(/\brs-radio-group-inline\b/));
    assert.equal(instance.querySelectorAll('.rs-radio-inline').length, 2);
  });

  it('Should output a h1', () => {
    const instance = getDOMNode(
      <RadioGroup inline>
        <h1>Group</h1>
        <Radio>Test1</Radio>
      </RadioGroup>
    );
    assert.ok(instance.querySelectorAll('.h1'));
  });

  it('Should be checked when set value', () => {
    const instance = getDOMNode(
      <RadioGroup value={2}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );
    const radios = instance.querySelectorAll('.rs-radio');
    assert.ok(radios[1].className.match(/\bradio-checked\b/));
  });

  it('Should be checked when set defaultValue', () => {
    const instance = getDOMNode(
      <RadioGroup defaultValue={2}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    const radios = instance.querySelectorAll('.rs-radio');
    assert.ok(radios[1].className.match(/\bradio-checked\b/));
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(
      <RadioGroup onChange={onChange}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );

    const radios = instance.querySelectorAll('.rs-radio');
    ReactTestUtils.Simulate.change(radios[2].querySelector('input') as HTMLInputElement);

    expect(onChange).to.have.been.calledWith(3);
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();
    const onGroupChange = Sinon.spy();

    const instance = getDOMNode(
      <RadioGroup onChange={onGroupChange}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3} onChange={onChange}>
          Test2
        </Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );

    const radios = instance.querySelectorAll('.rs-radio');
    ReactTestUtils.Simulate.change(radios[2].querySelector('input') as HTMLInputElement);

    expect(onChange).to.have.been.calledOnce;
    expect(onGroupChange).to.have.been.calledOnce;
  });

  it('Should call onChange callback with correct event target', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(
      <RadioGroup name="test" onChange={onChange}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );

    const radios = instance.querySelectorAll('.rs-radio');
    ReactTestUtils.Simulate.change(radios[2].querySelector('input') as HTMLInputElement);

    expect(onChange).to.have.been.calledWith(
      3,
      Sinon.match({
        target: {
          name: 'test'
        }
      })
    );
  });

  it('Should be selected as false', () => {
    const instance = getDOMNode(
      // FIXME `value` prop does not accept boolean values
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <RadioGroup value={false}>
        {/* FIXME `value` prop does not accept boolean values */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Radio value={true}>true</Radio>
        {/* FIXME `value` prop does not accept boolean values */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Radio value={false}>false</Radio>
      </RadioGroup>
    );
    assert.equal((instance.querySelector('.rs-radio-checked') as HTMLElement).textContent, 'false');
  });

  it('Should apply appearance', () => {
    const instance = getDOMNode(<RadioGroup appearance="picker" />);

    assert.include(instance.className, 'rs-radio-group-picker');
  });

  describe('Plain text', () => {
    it("Should render selected radio's label", () => {
      const { getByTestId } = render(
        <RadioGroup plaintext value={2} data-testid="radio-group">
          <Radio value={1}>Choice 1</Radio>
          <Radio value={2}>Choice 2</Radio>
          <Radio value={3}>Choice 3</Radio>
          <Radio value={4}>Choice 4</Radio>
        </RadioGroup>
      );

      expect(getByTestId('radio-group')).to.have.text('Choice 2');
    });
    it('Should render "not selected" if none is selected', () => {
      const { getByTestId } = render(
        <RadioGroup plaintext data-testid="radio-group">
          <Radio value={1}>Choice 1</Radio>
          <Radio value={2}>Choice 2</Radio>
          <Radio value={3}>Choice 3</Radio>
          <Radio value={4}>Choice 4</Radio>
        </RadioGroup>
      );

      expect(getByTestId('radio-group')).to.have.text('Not selected');
    });
  });
});
