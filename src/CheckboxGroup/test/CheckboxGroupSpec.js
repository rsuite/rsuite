import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';

import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';
import { globalKey } from '../../utils/prefix';

describe('CheckboxGroup', () => {
  testStandardProps(<CheckboxGroup />);

  it('Should render a checkbox group', () => {
    const instance = getDOMNode(
      <CheckboxGroup>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(instance.querySelectorAll(`.${globalKey}checkbox`).length, 2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    const instance = getDOMNode(
      <CheckboxGroup name={name}>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(instance.querySelectorAll('input[name="Test"]').length, 2);
  });

  it('Should have `checkbox-inline` className in checkbox', () => {
    const instance = getDOMNode(
      <CheckboxGroup inline>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(instance.querySelectorAll(`.${globalKey}checkbox-inline`).length, 2);
  });

  it('Should output a h1', () => {
    const instance = getDOMNode(
      <CheckboxGroup inline>
        <h1>Group</h1>
        <Checkbox>Test1</Checkbox>
      </CheckboxGroup>
    );
    assert.ok(instance.querySelectorAll('.h1'));
  });

  it('Should be checked when set value', () => {
    const instance = getDOMNode(
      <CheckboxGroup value={[2, 4, '1']}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test2</Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    const checkboxs = instance.querySelectorAll(`.${globalKey}checkbox`);
    const checked = /\bcheckbox-checked\b/;
    assert.ok(!checkboxs[0].className.match(checked));
    assert.ok(!checkboxs[2].className.match(checked));
    assert.ok(checkboxs[1].className.match(checked));
    assert.ok(checkboxs[3].className.match(checked));
  });

  it('Should have underlying inputs checked when set value', () => {
    const { getByLabelText } = render(
      <CheckboxGroup value={[2, 4, '1']}>
        <Checkbox value={1}>Checkbox 1</Checkbox>
        <Checkbox value={2}>Checkbox 2</Checkbox>
        <Checkbox value={3}>Checkbox 3</Checkbox>
        <Checkbox value={4}>Checkbox 4</Checkbox>
      </CheckboxGroup>
    );

    expect(getByLabelText('Checkbox 1')).not.to.be.checked;
    expect(getByLabelText('Checkbox 2')).to.be.checked;
    expect(getByLabelText('Checkbox 3')).not.to.be.checked;
    expect(getByLabelText('Checkbox 4')).to.be.checked;
  });

  it('Should be checked when set defaultValue', () => {
    const instance = getDOMNode(
      <CheckboxGroup defaultValue={[2, 4, '1']}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test2</Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    const checkboxs = instance.querySelectorAll(`.${globalKey}checkbox`);
    const checked = /\bcheckbox-checked\b/;
    assert.ok(!checkboxs[0].className.match(checked));
    assert.ok(!checkboxs[2].className.match(checked));
    assert.ok(checkboxs[1].className.match(checked));
    assert.ok(checkboxs[3].className.match(checked));
  });

  it('Should have underlying inputs checked by default when set value', () => {
    const { getByLabelText } = render(
      <CheckboxGroup defaultValue={[2, 4, '1']}>
        <Checkbox value={1}>Checkbox 1</Checkbox>
        <Checkbox value={2}>Checkbox 2</Checkbox>
        <Checkbox value={3}>Checkbox 3</Checkbox>
        <Checkbox value={4}>Checkbox 4</Checkbox>
      </CheckboxGroup>
    );

    expect(getByLabelText('Checkbox 1')).not.to.be.checked;
    expect(getByLabelText('Checkbox 2')).to.be.checked;
    expect(getByLabelText('Checkbox 3')).not.to.be.checked;
    expect(getByLabelText('Checkbox 4')).to.be.checked;
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = sinon.spy();
    const { getByLabelText } = render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox value={1}>Option 1</Checkbox>
        <Checkbox value={2}>Option 2</Checkbox>
        <Checkbox value={3}>Option 3</Checkbox>
        <Checkbox value={4}>Option 4</Checkbox>
      </CheckboxGroup>
    );

    fireEvent.click(getByLabelText('Option 3'));

    expect(onChange).to.have.been.calledWith([3]);
  });

  it('Should call onChange callback', done => {
    let count = 0;

    function onDone() {
      count++;
      if (count === 2) {
        done();
      }
    }

    const instance = getDOMNode(
      <CheckboxGroup onChange={onDone}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3} onChange={onDone}>
          Test2
        </Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    const checkboxs = instance.querySelectorAll(`.${globalKey}checkbox`);
    ReactTestUtils.Simulate.change(checkboxs[2].querySelector('input'));
  });

  describe('Plain text', () => {
    it("Should render selected checkboxes' labels", () => {
      const { getByTestId } = render(
        <CheckboxGroup plaintext value={[2, 4]} data-testid="checkbox-group">
          <Checkbox value={1}>Test1</Checkbox>
          <Checkbox value={2}>Test2</Checkbox>
          <Checkbox value={3}>Test3</Checkbox>
          <Checkbox value={4}>Test4</Checkbox>
        </CheckboxGroup>
      );

      expect(getByTestId('checkbox-group')).to.have.text('Test2Test4');
    });
    it('Should render "not selected" if none is selected', () => {
      const { getByTestId } = render(
        <CheckboxGroup plaintext value={[]} data-testid="checkbox-group">
          <Checkbox value={1}>Test1</Checkbox>
          <Checkbox value={2}>Test2</Checkbox>
          <Checkbox value={3}>Test3</Checkbox>
          <Checkbox value={4}>Test4</Checkbox>
        </CheckboxGroup>
      );

      expect(getByTestId('checkbox-group')).to.have.text('Not selected');
    });
  });
});
