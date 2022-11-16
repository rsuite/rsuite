import React from 'react';
import { render } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import StepItem from '../StepItem';
import User from '@rsuite/icons/legacy/User';

describe('StepItem', () => {
  testStandardProps(<StepItem />);

  it('Should render a StepItem', () => {
    const instance = getDOMNode(<StepItem />);
    assert.equal(instance.className, 'rs-steps-item');
  });

  it('Should render a content dom', () => {
    const instance = getDOMNode(<StepItem />);
    assert.equal(instance.querySelectorAll('.rs-steps-item-content').length, 1);
  });

  it('Should have a status', () => {
    const instance = getDOMNode(<StepItem status="process" />);
    assert.ok(instance.className.match(/\brs-steps-item-status-process\b/));
  });

  it('Should render custom icon', () => {
    const instance = getDOMNode(<StepItem icon={<User />} />);
    assert.ok(instance.className.match(/\brs-steps-item-custom\b/));
    assert.isNotNull(instance.querySelector('[aria-label="user"]'));
  });

  it('Should output a number ', () => {
    const instance = getDOMNode(<StepItem stepNumber={10} />);
    assert.equal(instance.textContent, '10');
  });

  (['wait', 'process'] as const).forEach(status => {
    it(`Should render stepNumber when status is "${status}"`, () => {
      const { getByTestId } = render(
        <StepItem stepNumber={2} status={status} data-testid="item" />
      );

      expect(getByTestId('item')).to.have.text('2');
    });
  });

  it('Should render description ', () => {
    const instance = getDOMNode(<StepItem description={'test'} />);
    assert.equal(instance.textContent, 'test');
  });

  it('Should render title ', () => {
    const instance = getDOMNode(<StepItem title={'test'} />);
    assert.equal(instance.textContent, 'test');
  });
});
