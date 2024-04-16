import React from 'react';
import { render, screen } from '@testing-library/react';
import FormControlLabel from '../index';
import '../styles/index.less';

describe('FormControlLabel styles', () => {
  it('Should render the correct styles', () => {
    render(<FormControlLabel>Title</FormControlLabel>);

    expect(screen.getByText('Title')).to.have.style('margin-bottom', '4px');
  });
});
