import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '../index';
import { getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';

describe('Navbar styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<NavBar ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#f7f7fa'), 'NavBar background-color');
  });
});
