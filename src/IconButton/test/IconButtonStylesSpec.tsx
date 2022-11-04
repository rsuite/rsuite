import React from 'react';
import { render } from '@testing-library/react';
import IconButton from '../index';
import { getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index.less';

describe('IconButton styles', () => {
  it('Should render the correct width and height', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    render(<IconButton ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
  });

  it('Should render the correct border-raidus', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    render(<IconButton circle ref={instanceRef} />);
    inChrome && assert.equal(getStyle(getDOMNode(instanceRef.current), 'borderRadius'), '50%');
  });
});
