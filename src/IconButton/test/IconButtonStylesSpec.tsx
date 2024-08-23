import React from 'react';
import { render, screen } from '@testing-library/react';
import IconButton from '../index';
import { getStyle, inChrome } from '@test/utils';

import '../styles/index.less';

describe('IconButton styles', () => {
  it('Should render the correct width and height', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    render(<IconButton ref={instanceRef} />);
    const iconButton = screen.getByRole('button');

    expect(getStyle(iconButton as Element, 'width')).to.equal(
      getStyle(iconButton as Element, 'height')
    );
  });

  it('Should render the correct border-radius', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    render(<IconButton circle ref={instanceRef} />);
    const iconButton = screen.getByRole('button');

    inChrome && expect(getStyle(iconButton as Element, 'borderRadius')).to.equal('50%');
  });
});
