import React from 'react';
import ReactDOM from 'react-dom';
import Sidenav from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Sidenav styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Sidenav ref={instanceRef} expanded={false} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'width'), '56px', 'Sidenav width');
  });
});
