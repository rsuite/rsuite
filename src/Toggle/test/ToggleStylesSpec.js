import React from 'react';
import { getDOMNode, getStyle, toRGB } from '@test/testUtils';
import Toggle from '../index';

import '../styles/index.less';

describe('Toggle styles', () => {
  it('Should render the correct styles', () => {
    const dom = getDOMNode(<Toggle />);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#d9d9d9'), 'Toggle background-color');
  });
});
