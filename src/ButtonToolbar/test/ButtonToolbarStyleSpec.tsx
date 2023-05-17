import React from 'react';
import { render } from '@testing-library/react';
import ButtonToolbar from '../ButtonToolbar';

import '../styles/index.less';

describe('ButtonToolbar styles', () => {
  it('Should render the correct vertical align', () => {
    const { container } = render(<ButtonToolbar />);

    expect(container.firstChild).to.have.style('line-height', '0px');
  });
});
