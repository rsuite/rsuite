import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Footer styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Footer ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'flex'), '0 0 auto');
  });
});
