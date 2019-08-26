import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../index';
import { createTestContainer, getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Icon styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Icon icon="star" ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'font-family'), 'rsuite-icon-font', 'Icon font-family');
  });
});
