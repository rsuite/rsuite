import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../index';
import { createTestContainer, getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Footer styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Footer ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'flex'), '0 0 auto');
  });
});
