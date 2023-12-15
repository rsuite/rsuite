import React from 'react';
import { render, screen } from '@testing-library/react';
import Row from '../index';
import { itChrome } from '@test/utils';

import '../styles/index.less';

describe('Row styles', () => {
  itChrome('Should render the correct styles', () => {
    render(<Row />);

    expect(screen.getByRole('row')).to.have.style('margin', '0px -5px');
  });
});
