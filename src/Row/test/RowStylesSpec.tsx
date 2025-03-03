import React from 'react';
import Row from '../index';
import { render, screen } from '@testing-library/react';
import '../../Grid/styles/index.less';
import '../styles/index.less';

describe('Row styles', () => {
  it('Should render the correct styles', () => {
    render(<Row>Row</Row>);
    expect(screen.getByText('Row')).to.have.style('margin', '0px -6px');
  });
});
