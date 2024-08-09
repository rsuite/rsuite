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
    expect(getStyle(dom, 'width')).to.equal(getStyle(dom, 'height'));
  });

  it('Should render the correct border-radius', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    const { container } = render(<IconButton circle ref={instanceRef} />);
    inChrome && expect(getStyle(container.firstChild as Element, 'borderRadius')).to.equal('50%');
  });
});
