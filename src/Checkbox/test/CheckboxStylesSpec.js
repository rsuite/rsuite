import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '../index';
import { createTestContainer, getDOMNode, toRGB, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Checkbox styles', () => {
  itChrome('Should render the correct border', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Checkbox ref={instanceRef} />, createTestContainer());
    const innerDom = getDOMNode(instanceRef.current).querySelector('.rs-checkbox-inner');
    assert.equal(
      window.getComputedStyle(innerDom, '::before').border,
      `1px solid ${toRGB('#d9d9d9')}`
    );
  });
});
