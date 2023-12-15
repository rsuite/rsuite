import React from 'react';
import { render } from '@testing-library/react';
import Flexbox from '../index';
import { inChrome } from '@test/utils';

import '../styles/index.less';

describe('Flexbox styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<Flexbox />);
    expect(container.firstChild).to.have.style('display', 'flex');
    inChrome && expect(container.firstChild).to.have.style('flex-flow', 'row wrap');
  });

  it('Should render the correct aligned', () => {
    const { container } = render(<Flexbox align="top" />);
    expect(container.firstChild).to.have.style('align-items', 'flex-start');
  });
});
