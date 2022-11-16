import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import TagGroup from '../TagGroup';

describe('TagGroup', () => {
  testStandardProps(<TagGroup />);

  it('Should output a TagGroup', () => {
    const instance = getDOMNode(<TagGroup />);
    assert.equal(instance.className, 'rs-tag-group');
  });
});
