import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Tag from '../Tag';
import Sinon from 'sinon';

describe('Tag', () => {
  testStandardProps(<Tag />);
  it('Should output a Tag', () => {
    const instance = getDOMNode(<Tag />);
    assert.equal(instance.className, 'rs-tag rs-tag-md rs-tag-default');
  });

  it('Should call onClose callback', () => {
    const onClose = Sinon.spy();
    const instance = getDOMNode(
      <Tag closable onClose={onClose}>
        tag
      </Tag>
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-tag-icon-close') as HTMLElement);

    expect(onClose).to.have.been.calledOnce;
  });
});
