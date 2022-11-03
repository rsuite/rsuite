import React from 'react';
import { render } from '@testing-library/react';
import Content from '../index';
import { getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Content styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Content ref={instanceRef}>Title</Content>);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'flex'), '1 1 auto');
  });
});
