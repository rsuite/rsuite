import React from 'react';
import ReactDOM from 'react-dom';
import Divider from '../index';
import { createTestContainer, getStyle, getDOMNode, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Divider styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Divider ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#e5e5ea'), 'Divider background-color');
    assert.equal(getStyle(dom, 'height'), '1px', 'Divider height');
    inChrome && assert.equal(getStyle(dom, 'margin'), '24px 0px', 'Divider margin');
  });
});
