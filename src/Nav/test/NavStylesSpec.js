import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../index';
import { createTestContainer, getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Nav styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Nav ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const ulDom = dom.querySelector('ul');
    assert.equal(getStyle(dom, 'position'), 'relative', 'Nav position');
    assert.equal(getStyle(ulDom, 'listStyleType'), 'none', 'Nav ul  list-style-type');
    inChrome && assert.equal(getStyle(ulDom, 'margin'), '0px', 'Nav ul  margin');
    inChrome && assert.equal(getStyle(ulDom, 'padding'), '0px', 'Nav ul  padding');
  });
});
