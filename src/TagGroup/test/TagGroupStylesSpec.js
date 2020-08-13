import React from 'react';
import ReactDOM from 'react-dom';
import TagGroup from '../index';
import { createTestContainer, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

describe('TagGroup styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();

    ReactDOM.render(<TagGroup ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(instanceRef.current, 'margin'), '-10px 0px 0px -10px', 'TagGroup margin');
  });
});
