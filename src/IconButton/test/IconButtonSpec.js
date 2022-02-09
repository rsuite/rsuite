import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import User from '@rsuite/icons/legacy/User';
import IconButton from '../IconButton';

describe('IconButton', () => {
  testStandardProps(<IconButton />);

  it('Should output a button', () => {
    const instance = getDOMNode(<IconButton />);
    assert.include(instance.className, 'rs-btn-icon');
    assert.equal(instance.nodeName, 'BUTTON');
  });

  it('Should output a icon', () => {
    const instance = getDOMNode(<IconButton icon={<User />} />);
    assert.ok(instance.querySelector('.rs-icon'));
  });
});
