import React from 'react';
import { render } from '@testing-library/react';
import Nav from '../index';
import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Nav styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<Nav ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'position'), 'relative', 'Nav position');
  });
});
