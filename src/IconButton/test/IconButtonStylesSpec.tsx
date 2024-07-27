import React from 'react';
import { render } from '@testing-library/react';
import IconButton from '../index';
import { getStyle, inChrome } from '@test/utils';

import '../styles/index.less';

describe('IconButton styles', () => {
  it('Should render the correct width and height', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    render(<IconButton ref={instanceRef} />);
    const { container } = render(<IconButton ref={instanceRef} />);
    const dom = container.firstChild as HTMLElement;
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
  });

  it('Should render the correct border-radius', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    const { container } = render(<IconButton circle ref={instanceRef} />);
    inChrome && assert.equal(getStyle(container.firstChild as Element, 'borderRadius'), '50%');
  });
});
