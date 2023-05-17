import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import RadioGroup from '../RadioGroup';
import Radio from '../../Radio';
import Sinon from 'sinon';

describe('RadioGroup', () => {
  testStandardProps(<RadioGroup />);

  it('Should render a radio group', () => {
    render(
      <RadioGroup>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).to.have.lengthOf(2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    render(
      <RadioGroup name={name}>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).to.have.attr('name', 'Test');
    }
  });

  it('Should have `radio-inline` className in radio', () => {
    const { container } = render(
      <RadioGroup inline>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );

    expect(container.firstChild).to.have.class('rs-radio-group-inline');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('.rs-radio-inline')).to.have.lengthOf(2);
  });

  it('Should output a h1', () => {
    render(
      <RadioGroup inline>
        <h1 data-testid="h1">Group</h1>
        <Radio>Test1</Radio>
      </RadioGroup>
    );

    expect(screen.getByTestId('h1')).to.exist;
  });

  it('Should be checked when set value', () => {
    render(
      <RadioGroup value={2}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test3</Radio>
        <Radio value={4}>Test4</Radio>
      </RadioGroup>
    );

    expect(screen.getByLabelText('Test2')).to.be.checked;
    expect(
      screen.getByText((_content, element) => element?.textContent === 'Test2', {
        selector: '.rs-radio'
      })
    ).to.have.class('rs-radio-checked');
  });

  it('Should be checked when set defaultValue', () => {
    render(
      <RadioGroup defaultValue={2}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test3</Radio>
        <Radio>Test4</Radio>
      </RadioGroup>
    );

    expect(screen.getByLabelText('Test2')).to.be.checked;
    expect(
      screen.getByText((_content, element) => element?.textContent === 'Test2', {
        selector: '.rs-radio'
      })
    ).to.have.class('rs-radio-checked');
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = Sinon.spy();
    render(
      <RadioGroup onChange={onChange}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test3</Radio>
        <Radio value={4}>Test4</Radio>
      </RadioGroup>
    );

    fireEvent.click(screen.getByText('Test3'));
    expect(onChange).to.have.been.calledWith(3);
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();
    const onGroupChange = Sinon.spy();

    render(
      <RadioGroup onChange={onGroupChange}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3} onChange={onChange}>
          Test3
        </Radio>
        <Radio value={4}>Test4</Radio>
      </RadioGroup>
    );

    fireEvent.click(screen.getByText('Test3'));

    expect(onChange).to.have.been.calledOnce;
    expect(onGroupChange).to.have.been.calledOnce;
  });

  it('Should call onChange callback with correct event target', () => {
    const onChange = Sinon.spy();
    render(
      <RadioGroup name="test" onChange={onChange}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test3</Radio>
        <Radio value={4}>Test4</Radio>
      </RadioGroup>
    );

    fireEvent.click(screen.getByText('Test3'));

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
    render(
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

    expect(screen.getByRole('radio', { name: 'false' })).to.be.checked;
  });

  it('Should apply appearance', () => {
    const instance = getDOMNode(<RadioGroup appearance="picker" />);

    assert.include(instance.className, 'rs-radio-group-picker');
  });

  describe('Plain text', () => {
    it("Should render selected radio's label", () => {
      render(
        <RadioGroup plaintext value={2} data-testid="radio-group">
          <Radio value={1}>Choice 1</Radio>
          <Radio value={2}>Choice 2</Radio>
          <Radio value={3}>Choice 3</Radio>
          <Radio value={4}>Choice 4</Radio>
        </RadioGroup>
      );

      expect(screen.getByTestId('radio-group')).to.have.text('Choice 2');
    });
    it('Should render "not selected" if none is selected', () => {
      render(
        <RadioGroup plaintext data-testid="radio-group">
          <Radio value={1}>Choice 1</Radio>
          <Radio value={2}>Choice 2</Radio>
          <Radio value={3}>Choice 3</Radio>
          <Radio value={4}>Choice 4</Radio>
        </RadioGroup>
      );

      expect(screen.getByTestId('radio-group')).to.have.text('Not selected');
    });
  });
});
