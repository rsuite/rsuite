import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../index';
import { createTestContainer, getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Sidebar styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Sidebar ref={instanceRef} className="rs-sidebar-collapse" />,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    assert.equal(
      getStyle(dom, 'transition'),
      'flex 0.2s ease-in 0s, width 0.2s ease-in 0s',
      'Sidebar collapse transition'
    );
  });
});
