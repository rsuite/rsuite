import React from 'react';
import Toggle from '../';
import { render } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Toggle styles', () => {
  it('Should render the correct background color', () => {
    const { container } = render(<Toggle />);

    expect(container.querySelector('.rs-toggle-track')).to.have.style(
      'background-color',
      toRGB('#b6b7b8')
    );
  });

  it('Should render the correct display style', () => {
    const { container } = render(<Toggle />);

    expect(container.firstChild).to.have.style('display', 'inline-flex');
  });
});
