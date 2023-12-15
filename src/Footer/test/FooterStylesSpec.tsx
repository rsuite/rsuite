import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../index';
import { itChrome } from '@test/utils';

import '../styles/index.less';

describe('Footer styles', () => {
  itChrome('Should render the correct styles', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).to.have.style('flex', '0 0 auto');
  });
});
