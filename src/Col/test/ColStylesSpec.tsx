import React from 'react';
import { render, screen } from '@testing-library/react';
import Col from '../index';
import { itChrome } from '@test/utils';
import '../../Grid/styles/index.less';
import '../../Col/styles/index.less';

describe('Col styles', () => {
  itChrome('Should render the correct styles', () => {
    render(<Col md={1}>Title</Col>);
    expect(screen.getByRole('gridcell')).to.have.style('padding', '0px 5px');
  });
});
