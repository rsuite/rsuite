import React from 'react';

import { testStandardProps } from '@test/utils';
import Footer from '../Footer';
import { render } from '@testing-library/react';

describe('Footer', () => {
  testStandardProps(<Footer />);

  it('Should render a Footer', () => {
    const title = 'Test';
    const { container } = render(<Footer>{title}</Footer>);
    expect(container.firstChild).to.have.class('rs-footer');
    expect(container.firstChild).to.have.text(title);
  });
});
