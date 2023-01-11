import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Sidebar styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Sidebar ref={instanceRef} className="rs-sidebar-collapse" />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(
      getStyle(dom, 'transition'),
      'flex 0.15s ease-in 0s, width 0.15s ease-in 0s',
      'Sidebar collapse transition'
    );
  });
});
