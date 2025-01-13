import React from 'react';
import Breadcrumb from '../index';
import { render } from '@testing-library/react';
import '../styles/index.less';

describe('Breadcrumb styles', () => {
  it('Should render correct padding', () => {
    const { container } = render(<Breadcrumb />);

    expect(container.firstChild).to.have.style('padding', '0px');
  });
});
