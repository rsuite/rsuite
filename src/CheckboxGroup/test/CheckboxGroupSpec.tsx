import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';

import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';

describe('CheckboxGroup', () => {
  testStandardProps(<CheckboxGroup />);

  it('Should render a checkbox group', () => {
    render(
      <CheckboxGroup>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getAllByRole('checkbox')).to.have.lengthOf(2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    render(
      <CheckboxGroup name={name}>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );

    for (const checkbox of screen.getAllByRole('checkbox')) {
      expect(checkbox).to.have.attr('name', name);
    }
  });

  it('Should have `checkbox-inline` className in checkbox', () => {
    render(
      <CheckboxGroup inline>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );

    for (const checkbox of screen.getByRole('group').childNodes) {
      expect(checkbox).to.have.class('rs-checkbox-inline');
    }
  });

  it('Should be checked when set value', () => {
    render(
      <CheckboxGroup value={[2, 4, '1']}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test3</Checkbox>
        <Checkbox value={4}>Test4</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Test1')).to.not.be.checked;
    expect(screen.getByLabelText('Test2')).to.be.checked;
    expect(screen.getByLabelText('Test3')).to.not.be.checked;
    expect(screen.getByLabelText('Test4')).to.be.checked;
  });

  it('Should have underlying inputs checked when set value', () => {
    render(
      <CheckboxGroup value={[2, 4, '1']}>
        <Checkbox value={1}>Checkbox 1</Checkbox>
        <Checkbox value={2}>Checkbox 2</Checkbox>
        <Checkbox value={3}>Checkbox 3</Checkbox>
        <Checkbox value={4}>Checkbox 4</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Checkbox 1')).not.to.be.checked;
    expect(screen.getByLabelText('Checkbox 2')).to.be.checked;
    expect(screen.getByLabelText('Checkbox 3')).not.to.be.checked;
    expect(screen.getByLabelText('Checkbox 4')).to.be.checked;
  });

  it('Should be checked when set defaultValue', () => {
    render(
      <CheckboxGroup defaultValue={[2, 4, '1']}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test3</Checkbox>
        <Checkbox value={4}>Test4</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Test1')).not.to.be.checked;
    expect(screen.getByLabelText('Test2')).to.be.checked;
    expect(screen.getByLabelText('Test3')).not.to.be.checked;
    expect(screen.getByLabelText('Test4')).to.be.checked;
  });

  it('Should have underlying inputs checked by default when set value', () => {
    render(
      <CheckboxGroup defaultValue={[2, 4, '1']}>
        <Checkbox value={1}>Checkbox 1</Checkbox>
        <Checkbox value={2}>Checkbox 2</Checkbox>
        <Checkbox value={3}>Checkbox 3</Checkbox>
        <Checkbox value={4}>Checkbox 4</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Checkbox 1')).not.to.be.checked;
    expect(screen.getByLabelText('Checkbox 2')).to.be.checked;
    expect(screen.getByLabelText('Checkbox 3')).not.to.be.checked;
    expect(screen.getByLabelText('Checkbox 4')).to.be.checked;
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = sinon.spy();
    render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox value={1}>Option 1</Checkbox>
        <Checkbox value={2}>Option 2</Checkbox>
        <Checkbox value={3}>Option 3</Checkbox>
        <Checkbox value={4}>Option 4</Checkbox>
      </CheckboxGroup>
    );

    fireEvent.click(screen.getByLabelText('Option 3'));

    expect(onChange).to.have.been.calledWith([3]);
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    const onGroupChange = sinon.spy();

    render(
      <CheckboxGroup onChange={onGroupChange}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3} onChange={onChange}>
          Test3
        </Checkbox>
        <Checkbox value={4}>Test4</Checkbox>
      </CheckboxGroup>
    );

    fireEvent.click(screen.getByLabelText('Test3'));

    expect(onChange).to.have.been.calledOnce;
    expect(onGroupChange).to.have.been.calledOnce;
  });

  describe('Plain text', () => {
    it("Should render selected checkboxes' labels", () => {
      render(
        <CheckboxGroup plaintext value={[2, 4]} data-testid="checkbox-group">
          <Checkbox value={1}>Test1</Checkbox>
          <Checkbox value={2}>Test2</Checkbox>
          <Checkbox value={3}>Test3</Checkbox>
          <Checkbox value={4}>Test4</Checkbox>
        </CheckboxGroup>
      );

      expect(screen.getByTestId('checkbox-group')).to.have.text('Test2Test4');
    });
    it('Should render "not selected" if none is selected', () => {
      render(
        <CheckboxGroup plaintext value={[]} data-testid="checkbox-group">
          <Checkbox value={1}>Test1</Checkbox>
          <Checkbox value={2}>Test2</Checkbox>
          <Checkbox value={3}>Test3</Checkbox>
          <Checkbox value={4}>Test4</Checkbox>
        </CheckboxGroup>
      );

      expect(screen.getByTestId('checkbox-group')).to.have.text('Not selected');
    });
  });
});
