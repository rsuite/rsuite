import React from 'react';
import { render } from '@testing-library/react';
import Sidenav from '../index';
import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Sidenav styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<Sidenav ref={instanceRef} expanded={false} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'width'), '56px', 'Sidenav width');
  });
});
