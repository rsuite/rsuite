import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Icon styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Icon icon="star" ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'font-family'), 'rsuite-icon-font', 'Icon font-family');
  });
});
