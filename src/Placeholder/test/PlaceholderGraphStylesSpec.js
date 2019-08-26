import React from 'react';
import ReactDOM from 'react-dom';
import PlaceholderGraph from '../PlaceholderGraph';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('PlaceholderGraph styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<PlaceholderGraph ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'inline-block', 'PlaceholderGraph display');
    assert.equal(
      getStyle(dom, 'backgroundColor'),
      toRGB('#f2f2f5'),
      'PlacePlaceholderGraphholder background-color'
    );
  });
});
