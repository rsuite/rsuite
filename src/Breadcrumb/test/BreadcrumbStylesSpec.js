import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumb from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Breadcrumb styles', () => {
  itChrome('Should render correct padding', () => {
    const instanceRef = React.createRef();

    ReactDOM.render(<Breadcrumb ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(instanceRef.current, 'padding'), '8px 15px');
  });
});
