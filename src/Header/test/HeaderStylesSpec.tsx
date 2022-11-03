import React from 'react';
import { render } from '@testing-library/react';
import Header from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Header styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Header ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'flex'), '0 0 auto');
  });
});
