import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Content from '../Content';

describe('Content', () => {
  testStandardProps(<Content />);

  it('Should render a Content', () => {
    const title = 'Test';
    const { container } = render(<Content>{title}</Content>);

    expect(container.firstChild).to.have.class('rs-content');
    expect(container.firstChild).to.have.text(title);
  });
});
