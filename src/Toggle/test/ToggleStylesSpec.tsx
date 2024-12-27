import React from 'react';
import { render } from '@testing-library/react';
import { toRGB } from '@test/utils';
import Toggle from '../index';
import '../styles/index.less';

describe('Toggle styles', () => {
  it('Should render the correct background color', () => {
    const { container } = render(<Toggle />);

    expect(container.querySelector('.rs-toggle-presentation')).to.have.style(
      'background-color',
      toRGB('#b6b7b8')
    );
  });

  it('Should be inline-block', () => {
    const { container } = render(<Toggle />);

    expect(container.firstChild).to.have.style('display', 'inline-block');
  });
});
