import React from 'react';
import ReactDOM from 'react-dom';
import TagGroup from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

describe('TagGroup styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<TagGroup ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'margin'), '-10px 0px 0px -10px', 'TagGroup margin');
  });
});
