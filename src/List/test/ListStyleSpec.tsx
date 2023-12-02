import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../index';

import '../styles/index.less';

describe('List styles', () => {
  it('Should render correct toggle styles', () => {
    render(<List data-testid="list" />);

    expect(screen.getByTestId('list')).to.have.style('position', 'relative');
  });
});
